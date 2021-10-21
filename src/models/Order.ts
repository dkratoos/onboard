import { Check, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "../models";
import { Product } from "../models";

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  number!: number;

  @Column()
  client!: Client;

  @Column()
  products!: Product[];
}
