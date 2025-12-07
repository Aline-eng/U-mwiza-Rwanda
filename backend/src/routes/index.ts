import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import communityRoutes from './communityRoutes';
import familyRoutes from './familyRoutes';
import childRoutes from './childRoutes';
import healthRoutes from './healthRoutes';
import educationRoutes from './educationRoutes';
import transactionRoutes from './transactionRoutes';
import budgetRoutes from './budgetRoutes';
import actionPlanRoutes from './actionPlanRoutes';
import letterRoutes from './letterRoutes';
import eventRoutes from './eventRoutes';
import taskRoutes from './taskRoutes';
import notificationRoutes from './notificationRoutes';
import dashboardRoutes from './dashboardRoutes';
import publicRoutes from './publicRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/communities', communityRoutes);
router.use('/families', familyRoutes);
router.use('/children', childRoutes);
router.use('/health-records', healthRoutes);
router.use('/education-records', educationRoutes);
router.use('/transactions', transactionRoutes);
router.use('/budgets', budgetRoutes);
router.use('/action-plans', actionPlanRoutes);
router.use('/letters', letterRoutes);
router.use('/events', eventRoutes);
router.use('/tasks', taskRoutes);
router.use('/notifications', notificationRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/public', publicRoutes);

export default router;
