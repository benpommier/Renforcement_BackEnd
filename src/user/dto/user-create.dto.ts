import { MinLength } from 'class-validator';

export class UserCreateDto {
  @MinLength(15, {
    message: 'Le contenu doit contenir au moins 2 caractères',
  })
  firstName: string;

  @MinLength(15, {
    message: 'Le contenu doit contenir au moins 2 caractères',
  })
  lastName: string;

  @MinLength(3, {
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  })
  password: string;

  age: number;
}
