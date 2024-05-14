export class ArticleUpdateDto {
  title: string;
  // BPO - 05/14/2024 - Modifiez les points d'existants pour pouvoir modifier un article avec les 2 nouveaux attributs
  content: string;
  author: string;
}
