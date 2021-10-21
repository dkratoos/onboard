import { Check, Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from "typeorm";
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

  @OneToOne(() => Client)
  client!: Client;

  @OneToMany(() => Product, product => product.name)
  products!: Product[];
}
