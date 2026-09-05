import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FamiliesModule } from './families/families.module';
import { DevicesModule } from './devices/devices.module';
import { PairingsModule } from './pairings/pairings.module';
import { PoliciesModule } from './policies/policies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get('DB_USER', 'parental'),
        password: config.get('DB_PASSWORD', 'parental_secret'),
        database: config.get('DB_NAME', 'parental_control'),
        autoLoadEntities: true,
        synchronize: config.get('NODE_ENV') !== 'production',
        logging: config.get('NODE_ENV') === 'development',
      }),
    }),
    AuthModule,
    UsersModule,
    FamiliesModule,
    DevicesModule,
    PairingsModule,
    PoliciesModule,
  ],
})
export class AppModule {}
