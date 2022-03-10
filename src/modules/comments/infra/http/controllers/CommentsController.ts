import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCommentService } from '../../../services/CreateCommentsService';
import { ListCommentsService } from '../../../services/ListCommentsService';
//import { Comment } from '../../typeorm/entities/Comment';

export default class CommentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { book_id } = request.params;
    const { comment } = request.body;
    const user_id = request.user.id;

    const createCommentService = container.resolve(CreateCommentService);
    const newComment = await createCommentService.execute({
      book_id,
      user_id,
      comment,
    });

    return response.json(newComment);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { book_id } = request.params;

    const listCommentsService = container.resolve(ListCommentsService);
    const comments = await listCommentsService.execute(book_id);
    return response.json(comments);
  }
}
