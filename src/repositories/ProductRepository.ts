import { EntityRepository, Repository } from "typeorm";

import { Product } from "../models";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}
