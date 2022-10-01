import { Module } from '@nestjs/common';
import { ReviewModule } from './review/review.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig | any>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
    }),
    ReviewModule,
  ],
})
export class AppModule {}
