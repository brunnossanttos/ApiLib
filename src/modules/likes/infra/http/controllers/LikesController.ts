import { CountLikesService } from '@modules/likes/services/CountLikeService';
import { HandleLikesService } from '@modules/likes/services/HandleLikesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

class LikesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { book_id } = request.params;
    const user_id = request.user.id;

    const handleLikesService = container.resolve(HandleLikesService);
    const like = await handleLikesService.execute({ book_id, user_id });
    return response.json(instanceToInstance(like));
  }

  public async countLikes(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { book_id } = request.params;
    const countLikesService = container.resolve(CountLikesService);
    const qtdLikes = await countLikesService.execute(book_id);
    return response.json(qtdLikes);
  }
}
export { LikesController };
