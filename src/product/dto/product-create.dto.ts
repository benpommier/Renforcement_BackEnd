import { IsNumber, IsString, MinLength } from 'class-validator';

export class ProductCreateDto {
  @IsString()
  titre: string;
  
  @IsNumber()
  prix: number;
  
  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  couleur: string;


}
