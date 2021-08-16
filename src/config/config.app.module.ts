import { ConfigModule } from '@nestjs/config';

export const ConfigAppModule = ConfigModule.forRoot({
  envFilePath: `.env.local`, 
  isGlobal: true,
});