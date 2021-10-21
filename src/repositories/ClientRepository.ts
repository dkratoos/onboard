import { EntityRepository, Repository } from "typeorm";

import { Client } from "../models";

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {}
