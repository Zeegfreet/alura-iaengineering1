import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'Ada Lovelace' })
  name: string;

  @ApiProperty({ example: 'ada@example.com' })
  email: string;
}

export class UserEnvelope {
  @ApiProperty({ type: UserDto })
  data: UserDto;
}
