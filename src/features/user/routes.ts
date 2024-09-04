import { Router } from 'express';

import { authenticate, authorizeRoles } from '../../middlewares/authenticate';
import * as userController from './controller';
import { UserRole } from './model';

const router = Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/forgot-password', userController.forgotPassword);
// router.use(authenticate);
router.get('/refresh', userController.refreshToken);
router.post('/logout', userController.logoutUser);
router.get('/me', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);
router.post('/change-password', userController.changeUserPassword);
router.delete('/profile', userController.deleteUserProfile);

router.get(
  '/all',
  authenticate,
  authorizeRoles([UserRole.ADMIN, UserRole.MODERATOR]),
  userController.getAllUsers
);

export default router;
