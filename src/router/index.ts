import { Router } from 'express';

import adsTypeRoutes from '../features/adsType/routes';
import appSettingsRoutes from '../features/appSettings/routes';
import contactUsRoutes from '../features/contactUs/routes';
import generalSettingsRoutes from '../features/generalSettings/routes';
import highlightRoutes from '../features/highlights/routes';
import liveMatchRoutes from '../features/liveMatch/routes';
import newsRoutes from '../features/news/routes';
import selectedLeaguesRoutes from '../features/selectedLeagues/routes';
import notificationsRoutes from '../features/notifications/routes';
import streamingSourcesRoutes from '../features/stream/routes';
import userRoutes from '../features/user/routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/app-settings', appSettingsRoutes);
router.use('/live-match', liveMatchRoutes);
router.use('/streaming-sources', streamingSourcesRoutes);
router.use('/ads-type', adsTypeRoutes);
router.use('/contact-us', contactUsRoutes);
router.use('/general-settings', generalSettingsRoutes);
router.use('/highlights', highlightRoutes);
router.use('/news', newsRoutes);
router.use('/selected-leagues', selectedLeaguesRoutes);
router.use('/notifications', notificationsRoutes);

export default router;
