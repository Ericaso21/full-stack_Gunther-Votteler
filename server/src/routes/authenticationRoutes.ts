import { Router } from 'express';

//import controller
import { authenticationController } from '../controllers/authenticationController';

class AuthenticationRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/create', authenticationController.registerUser);
        this.router.post('/authentication_user', authenticationController.authentication);
    }

}

const authenticationRoutes = new AuthenticationRoutes();
export default authenticationRoutes.router;