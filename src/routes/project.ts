import express, { Router } from 'express';
import projectController from '../controllers/project';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isUsersProject } from '../middlewares/isAuthorized';
import { projectCreateUpdateValidator } from '../validators/projectCreateUpdate.validator';
import { mongooseObjectIdValidator } from '../validators/mongooseObjectId.validator';

const router: Router = express.Router();

router.post('/', projectCreateUpdateValidator, isAuthenticated, projectController.postProject);

router.put('/', projectCreateUpdateValidator, isAuthenticated, isUsersProject, projectController.putProject);

router.get('/:id', isAuthenticated, projectController.getProject);

router.get('/', isAuthenticated, projectController.getProjects);

router.delete('/:id', isAuthenticated, isUsersProject, projectController.deleteProject);

export default router;