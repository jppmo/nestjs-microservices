import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { join, resolve } from 'path';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    AuthModule, 
    PaymentModule,
    RenderModule.forRootAsync(Next({ 
      dev: true,
      dir: resolve(__dirname, '../../../apps/gateway/frontend'),
     }), { viewsDir: '' }),
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
