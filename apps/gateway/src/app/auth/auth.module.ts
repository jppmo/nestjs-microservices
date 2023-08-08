import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'auth',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(__dirname, '../../../proto/auth.proto'),
        },
      },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      // signOptions: { expiresIn: '60s'},
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
