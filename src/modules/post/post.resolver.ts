import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { PostModel } from "./models/post.model";
import { PostRepository } from "./post.repository";
import { searchPostDto } from "./dtos/search.dto";
import { Post } from "../../shared/interfaces/post.interface";

@Resolver()
export class PostResolver {
  constructor(private postRepository: PostRepository) {}

  @Query((returns) => [PostModel])
  async all(
    @Args("page", { nullable: false }) page: number,
    @Args("limit", { nullable: false }) limit: number,
    @Args() args: searchPostDto
  ) {
    const query = {
      title: {
        contains: args.title,
      },
      content: {
        contains: args.content,
      },
    };
    return this.postRepository.findPublic(page, limit, query);
  }
  @Query((returns) => PostModel)
  async byId(
    @Args("postId", { nullable: false, type: () => Int }) postId: number
  ) {
    const post: Post = await this.postRepository.findById(postId);
    //todo: check auth & user role for access private post
    return post;
  }
}
