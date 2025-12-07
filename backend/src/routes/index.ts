import { Router } from 'express';
import authRoutes from './authRoutes';

const router = Router();

router.use('/auth', authRoutes);

// TODO: Add other routes as they are implemented
// router.use('/users', userRoutes);
// router.use('/communities', communityRoutes);
// router.use('/families', familyRoutes);
// router.use('/children', childRoutes);
// router.use('/health-records', healthRoutes);
// router.use('/education-records', educationRoutes);
// router.use('/transactions', transactionRoutes);
// router.use('/budgets', budgetRoutes);
// router.use('/action-plans', actionPlanRoutes);
// router.use('/letters', letterRoutes);
// router.use('/events', eventRoutes);
// router.use('/tasks', taskRoutes);
// router.use('/notifications', notificationRoutes);
// router.use('/dashboard', dashboardRoutes);
// router.use('/public', publicRoutes);

export default router;
