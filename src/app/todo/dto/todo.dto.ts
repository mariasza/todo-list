import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class TodoDto {
    @ApiProperty()
    @IsNotEmpty()
    description: string;
  
    @ApiProperty()
    @IsNotEmpty()
    deadline: Date;
}

export default TodoDto;

