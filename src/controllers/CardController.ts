import { Request, Response, NextFunction } from 'express';
import Card , { ICard } from '../models/Card';
import { handleError } from '../errors/handleError';

export async function retrieve(req: Request, res: Response, next: NextFunction) {
  try {
    const cards: ICard[] = await Card.find();

    if (cards.length === 0) {
      return handleError(res, 400, 'Card is not exist.');
    }

    res.json(cards);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const card: ICard = new Card(req.body);

    await card.save();

    res.status(201).json(card);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id }: { id: string } = req.params;

    const card: ICard = await Card.findOne({ _id: id });

    if (!card) {
      return handleError(res, 400, 'Card is not exist.');
    }

    card.set(req.body);

    await card.save();

    res.json(card);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: cardId }: { id: string } = req.params;

    await Card.deleteOne({ _id: cardId });

    res.json({ deleted: true });
  } catch (err) {
    next(err);
  }
}
