import { Router } from 'express';
import authRoutes from './authRoutes';
import childrenRoutes from './childrenRoutes';
import dashboardRoutes from './dashboardRoutes';
import familiesRoutes from './familiesRoutes';
import healthRoutes from './healthRoutes';
import educationRoutes from './educationRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/children', childrenRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/families', familiesRoutes);
router.use('/health', healthRoutes);
router.use('/education', educationRoutes);

// TODO: Add other routes as they are implemented
// router.use('/users', userRoutes);
// router.use('/communities', communityRoutes);
// ✅ IMPLEMENTED:
// ✅ router.use('/children', childrenRoutes);
// ✅ router.use('/dashboard', dashboardRoutes);
// ✅ router.use('/families', familiesRoutes);
// ✅ router.use('/health', healthRoutes);
// ✅ router.use('/education', educationRoutes);

// TODO: Remaining routes
// router.use('/transactions', transactionRoutes);
// router.use('/budgets', budgetRoutes);
// router.use('/tasks', taskRoutes);
// router.use('/events', eventRoutes);
// router.use('/notifications', notificationRoutes);
// router.use('/public', publicRoutes);

export default router;
