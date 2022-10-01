import { Resolver, Query, Args } from '@nestjs/graphql';
import { ReviewService } from './review.service';

@Resolver()
export class ReviewResolver {
  constructor(private reviewService: ReviewService) {}

  //GraphQL Query
  @Query()
  getReviews(@Args() request) {
    return this.reviewService.getReviews(request);
  }
}
