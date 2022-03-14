import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
    @ApiProperty()
    @IsNotEmpty()
    description: string;
  
    @ApiProperty()
    @IsNotEmpty()
    deadline: Date;
}

export default CreateTodoDto;

