import { ApiProperty } from '@nestjs/swagger';

export class AuthTokenDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;
}

export class AuthEnvelope {
  @ApiProperty({ type: AuthTokenDto })
  data: AuthTokenDto;
}
