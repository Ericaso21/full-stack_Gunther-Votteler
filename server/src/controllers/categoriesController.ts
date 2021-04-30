import { Request, Response } from 'express';
import pool from '../database';

class CategoriesController {

    // list categories database
    public async list(req: Request, res: Response) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        let cateogories = await pool.query('SELECT * FROM categories');
        res.status(200).json(cateogories);
    }
    //getOne category database
    public async getOne(req: Request, res: Response) {
        const { id } = req.params;
        let category = await pool.query('SELECT * FROM categories WHERE category_id = ?', [id]);
        if (Object.entries(category).length === 0) {
            res.status(404).json({ status: false, message: 'Categoria no encontrado.' })
        } else {
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            return res.status(200).json(category[0]);
        }
    }

    //create category database
    public async create(req: Request, res: Response) {
        delete req.body.token;
        let exist = await pool.query('SELECT * FROM categories WHERE category_name = ?', [req.body.category_name]);
        if (Object.entries(exist).length === 0) {
            let insert = await pool.query('INSERT INTO categories SET ?', [req.body]);
            if (insert) {
                res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                res.status(200).json({ status: true, message: 'Datos guardados correctamente.' });
            } else {
                res.status(500).json({ status: false, message: 'Error del servidor' });
            }
        } else {
            res.status(404).json({ status: false, message: 'La categoria ya existe.' })
        }
    }

    //update category database
    public async update(req: Request, res: Response) {
        delete req.body.token;
        const { id } = req.params;
        let exist = await pool.query('SELECT * FROM categories WHERE category_name = ? AND category_id != ?', [req.body.category_name, id]);
        if (Object.entries(exist).length === 0) {
            let update = await pool.query('UPDATE categories SET ? WHERE category_id = ?', [req.body, id]);
            if (update) {
                res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                res.status(200).json({ status: true, message: 'Datos actualizados correctamente.' });
            } else {
                res.status(500).json({ status: false, message: 'Error del servidor' });
            }
        } else {
            res.status(404).json({ status: false, message: 'La categoria ya existe.' })
        }
    }

    //delete categories database
    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        let delete_category = await pool.query('DELETE FROM categories WHERE category_id = ?', [id]);
        if (delete_category) {
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.status(200).json({ status: true, message: 'Se ha eliminado correctamente.' });
        } else {
            res.status(500).json({ status: false, message: 'Error del servidor' });
        }
    }
}

export const categoriesController = new CategoriesController();