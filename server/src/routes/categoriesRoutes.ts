import { Router } from 'express';

//import controller
import { categoriesController } from '../controllers/categoriesController';

class CategoriesRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/list', categoriesController.list);
        this.router.get('/getOne/:id', categoriesController.getOne);
        this.router.post('/create', categoriesController.create);
        this.router.put('/update/:id', categoriesController.update);
        this.router.delete('/delete/:id', categoriesController.delete);
    }

}

const categoriesRoutes = new CategoriesRoutes();
export default categoriesRoutes.router;