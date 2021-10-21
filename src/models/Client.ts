import { Check, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "clients" })
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  cpf!: string;
}
