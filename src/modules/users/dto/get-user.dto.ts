import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetUserDto {
  @ApiPropertyOptional()
  id: number;
}
