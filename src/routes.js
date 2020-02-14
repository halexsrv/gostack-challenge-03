import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveriesController from './app/controllers/DeliveriesController';
import DeliveryController from './app/controllers/DeliveryController';
import FileController from './app/controllers/FileController';
import SignatureController from './app/controllers/SignatureController';

import ReceivedController from './app/controllers/ReceivedController';
import DeliveredController from './app/controllers/DeliveredController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.get('/deliveryman/:id/deliveries', DeliveriesController.index);

routes.post('/received', ReceivedController.store);
routes.post('/delivered', DeliveredController.store);

routes.use(authMiddleware);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.destroy);

routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.destroy);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/signatures', upload.single('file'), SignatureController.store);

routes.get('/delivery', DeliveryController.index);
routes.post('/delivery', DeliveryController.store);
routes.put('/delivery/:id', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.destroy);

export default routes;
