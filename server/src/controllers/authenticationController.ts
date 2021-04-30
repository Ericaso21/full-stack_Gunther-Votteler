import { Request, Response } from 'express';
import pool from '../database';
var config = require('../config');
import jsonwebtoken from 'jsonwebtoken';

class AuthenticationController {

    //resgister user 
    public async registerUser(req: Request, res: Response) {
        delete req.body.token;
        let exist = await pool.query('SELECT * FROM users WHERE email = ?', [req.body.email]);
        if (Object.entries(exist).length === 0) {
            let insert = await pool.query('INSERT INTO users SET ?', [req.body]);
            if (insert) {
                res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                res.status(200).json({ status: true, message: 'Datos guardados correctamente.' });
            } else {
                res.status(500).json({ status: false, message: 'Error del servidor' });
            }
        } else {
            res.status(404).json({ status: false, message: 'El usuario ya existe comunicarse con el administrador.' })
        }
    }

    //login user 
    public async authentication(req: Request, res: Response) {
        delete req.body.token;
        let JWT_SECRET = config.SECRETKEYJSWEBTOKEN;
        if (req.body.email == '' || req.body.password_user == '') {
            res.status(404).json({ status: false, message: 'Todos los campos son obligatorios.' });
        } else {
            let user = await pool.query('SELECT fk_role_id, first_name, second_name, surname, second_surname FROM users WHERE email = ?', [req.body.email]);
            if (Object.entries(user).length === 0) {
                res.status(404).json({ status: false, message: 'Email o contraseña incorrectos.' })
            } else {
                let user_pass = await pool.query('SELECT fk_role_id, first_name, second_name, surname, second_surname FROM users WHERE password_user = ?', [req.body.password_user]);
                if (Object.entries(user_pass).length === 0) {
                    res.status(404).json({ status: false, message: 'Email o contraseña incorrectos.' })
                } else {
                    let token = jsonwebtoken.sign(req.body.email, JWT_SECRET);
                    res.status(200).json({
                        singend_user: user[0],
                        token: token
                    })
                }
            }
        }
    }

}

export const authenticationController = new AuthenticationController();