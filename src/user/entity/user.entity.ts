import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//BPO - 05/15/2024 - TP - Creer un nouvel utilisateur
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  firstName: string;
  
  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar' , nullable:true})
  bornCity: string;
}