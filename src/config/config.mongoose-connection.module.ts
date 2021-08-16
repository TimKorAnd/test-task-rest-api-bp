import { Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

/* export const ConfigMongooseConnectionModule = MongooseModule.forRoot(
  process.env.MONGODB_CONNECTION_STRING.toString(),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
); */

/* export const ConfigMongooseConnectionModule = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('MONGODB_CONNECTION_STRING'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }),
  inject: [ConfigService],
}); */

@Injectable()
class MongooseConfigService implements MongooseOptionsFactory {
  constructor (public readonly configService: ConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.configService.get<string>('MONGODB_CONNECTION_STRING'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    };
  }
}

export const ConfigMongooseConnectionModule = MongooseModule.forRootAsync({
  useClass: MongooseConfigService,
});

