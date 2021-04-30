import { Request, Response } from 'express';
import pool from '../database';

class FilmsController {

    // list films database
    public async list(req: Request, res: Response) {
        let films_categorie: any = [];
        let categories = await pool.query('SELECT fc.pk_fk_movie_id , c.category_name FROM films_categories fc INNER JOIN categories c ON fc.pk_fk_category_id = c.category_id ORDER BY fc.pk_fk_movie_id ASC');
        for (let i = 0; i < categories.length; i++) {
            films_categorie[i] = categories[i]
        }
        let films = await pool.query('SELECT movie_id, movie_image, movie_title, movie_description, movie_duration, movie_trailer, DATE_FORMAT(movie_premiere_date,"%d-%m-%Y") as movie_premiere_date FROM films');
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.status(200).json({ 'films': films, 'category': films_categorie });
    }

    //getCategory
    public async getCategory(req: Request, res: Response) {
        const { id } = req.params;
        let films_categorie: any = [];
        let categories = await pool.query('SELECT fc.pk_fk_movie_id , c.category_name FROM films_categories fc INNER JOIN categories c ON fc.pk_fk_category_id = c.category_id WHERE fc.pk_fk_category_id = ? ORDER BY fc.pk_fk_movie_id ASC', [id]);
        for (let i = 0; i < categories.length; i++) {
            films_categorie[i] = categories[i]
        }
        let films = await pool.query('SELECT f.movie_id, f.movie_image, f.movie_title, f.movie_description, f.movie_duration, f.movie_trailer, DATE_FORMAT(f.movie_premiere_date,"%d-%m-%Y") as movie_premiere_date FROM films f INNER JOIN films_categories fc ON f.movie_id = fc.pk_fk_movie_id WHERE fc.pk_fk_category_id = ?', [id]);
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.status(200).json({ 'films': films, 'category': films_categorie });
    }


    //create films

    public async create(req: Request, res: Response) {
        delete req.body.token;
        let exist = await pool.query('SELECT * FROM films WHERE movie_title = ?', [req.body.movie_title]);
        if (Object.entries(exist).length === 0) {
            let films = {
                movie_image: req.body.movie_image,
                movie_title: req.body.movie_title,
                movie_description: req.body.movie_description,
                movie_duration: req.body.movie_duration,
                movie_trailer: req.body.movie_trailer,
                movie_premiere_date: req.body.movie_premiere_date
            }
            let insert = await pool.query('INSERT INTO films SET ?', [films]);
            let pk_fk_id_ticket = await pool.query('SELECT last_insert_id() AS pk_fk_movie_id')
            if (insert) {
                var pk_fk_category_id = req.body.pk_fk_category_id;
                let id_movie = pk_fk_id_ticket[0]['pk_fk_movie_id']
                for (let i = 0; i < pk_fk_category_id.length; i++) {
                    let films_categories = {
                        pk_fk_movie_id: id_movie,
                        pk_fk_category_id: pk_fk_category_id[i]
                    }
                    var insert_films = await pool.query('INSERT INTO films_categories SET ?', [films_categories]);
                }
                res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                res.status(200).json({ status: true, message: 'Datos guardados correctamente.' });
            } else {

            }
        } else {
            res.status(404).json({ status: false, message: 'La pelicula ya existe' })
        }
    }

}

export const filmsController = new FilmsController();