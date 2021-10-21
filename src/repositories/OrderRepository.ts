import { EntityRepository, Repository } from "typeorm";

import { Order } from "../models";

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {}
