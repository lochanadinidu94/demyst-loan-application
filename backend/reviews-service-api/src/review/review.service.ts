import { Injectable } from '@nestjs/common';
import { getReviews } from '../data/readFile';

@Injectable()
export class ReviewService {
  async getReviews(request: any) {
    let filteredReviews = await getReviews();
    if (request) {
      filteredReviews = filteredReviews.filter((element) =>
        element.body.toLowerCase().includes(request.text.toLowerCase()),
      );
      return filteredReviews;
    } else {
      return await getReviews();
    }
  }
}
