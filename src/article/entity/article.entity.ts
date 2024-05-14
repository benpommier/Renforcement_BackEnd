import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;
  
  // Ajoutez dans la table article deux nouvelles propriétés : content et author. Ce sont des chaines de caractères
  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true })
  author: string;
}
