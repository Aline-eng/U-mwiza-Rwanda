import { Router } from 'express';
import authRoutes from './authRoutes';
import childrenRoutes from './childrenRoutes';
import dashboardRoutes from './dashboardRoutes';
import familiesRoutes from './familiesRoutes';
import healthRoutes from './healthRoutes';
import educationRoutes from './educationRoutes';
import transactionsRoutes from './transactionsRoutes';
import budgetsRoutes from './budgetsRoutes';
import tasksRoutes from './tasksRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/children', childrenRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/families', familiesRoutes);
router.use('/health', healthRoutes);
router.use('/education', educationRoutes);
router.use('/transactions', transactionsRoutes);
router.use('/budgets', budgetsRoutes);
router.use('/tasks', tasksRoutes);

// TODO: Add other routes as they are implemented
// router.use('/users', userRoutes);
// router.use('/communities', communityRoutes);
// ✅ IMPLEMENTED:
// ✅ router.use('/children', childrenRoutes);
// ✅ router.use('/dashboard', dashboardRoutes);
// ✅ router.use('/families', familiesRoutes);
// ✅ router.use('/health', healthRoutes);
// ✅ router.use('/education', educationRoutes);

// ✅ IMPLEMENTED:
// ✅ router.use('/transactions', transactionsRoutes);
// ✅ router.use('/budgets', budgetsRoutes);
// ✅ router.use('/tasks', tasksRoutes);

// TODO: Remaining routes
// router.use('/events', eventRoutes);
// router.use('/notifications', notificationRoutes);
// router.use('/public', publicRoutes);

export default router;
