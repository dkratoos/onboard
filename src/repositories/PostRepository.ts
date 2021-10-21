import { EntityRepository, Repository } from "typeorm";

import { Post } from "../models";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {}
