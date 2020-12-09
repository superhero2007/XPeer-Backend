import { Router } from 'express';
import { create, remove, update, retrieve } from '../controllers/CardController';

const cardRouter = Router();

cardRouter.get('/', retrieve);
cardRouter.post('/', create);
cardRouter.put('/:id', update);
cardRouter.delete('/:id', remove);

export default cardRouter;
