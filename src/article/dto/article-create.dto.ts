import { MinLength } from 'class-validator';

export class ArticleCreateDto {
  @MinLength(3, {
    message: 'Le titre doit contenir au moins 3 caractères',
  })
  title: string;
  
  // BPO - 05/14/2024 - Modifiez les points d'existants pour pouvoir créer un article avec les 2 nouveaux attributs
  @MinLength(15, {
    message: 'Le contenu doit contenir au moins 15 caractères',
  })
  content: string;

  @MinLength(3, {
    message: 'L\'auteur doit contenir au moins 5 caractères',
  })
  author: string;
}
