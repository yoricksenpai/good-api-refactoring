// users/user.routes.ts
import { Router } from 'express';
import { Container } from 'typedi';
import { UserController } from './user.controller';
import  {validateCreateUserMiddleware} from './middlewares/user.middleware'


const router = Router();
const userController = Container.get(UserController);

router.get('/all', (req, res, next) => userController.getUsers(req, res, next));
router.get('/:id', (req, res, next) => userController.getUserById(req, res, next));
router.post('/', validateCreateUserMiddleware,  (req, res, next)  => userController.createUser(req, res, next));

export default router;