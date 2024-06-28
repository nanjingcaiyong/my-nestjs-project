import { IsInt, IsString, MaxLength, Min } from 'class-validator';

export class User {
  @IsString()
  @MaxLength(10)
  name: string;

  @IsInt()
  @Min(1)
  age: number;
}
