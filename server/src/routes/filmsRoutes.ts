import { Router } from 'express';

//import controller
import { filmsController } from '../controllers/filmsController';

class FilmsRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/list', filmsController.list);
        this.router.post('/create', filmsController.create);
        this.router.get('/getCategory/:id', filmsController.getCategory);
    }

}

const filmsRoutes = new FilmsRoutes();
export default filmsRoutes.router;