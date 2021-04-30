import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import methdOverride from 'method-override';
import bodyParser from 'body-parser';
import helmet from 'helmet';

//routes
import categoriesRoutes from './routes/categoriesRoutes';
import authenticationRoutes from './routes/authenticationRoutes';
import filmsRoutes from './routes/filmsRoutes';

//middleware
//middelware
import RecaptchaMiddelware from './middleware/recaptchaV3Midddleware';

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(methdOverride());
        this.app.use(helmet());
        this.app.disable('x-powered-by');
    }

    routes(): void {
        this.app.use('/api/categories', RecaptchaMiddelware, categoriesRoutes);
        this.app.use('/api/authentication', RecaptchaMiddelware, authenticationRoutes);
        this.app.use('/api/films', RecaptchaMiddelware, filmsRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ', this.app.get('port'))
        });
    }
}

const server = new Server();
server.start();