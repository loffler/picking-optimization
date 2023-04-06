import { Module } from '@nestjs/common';
import { ProductPositionModule } from './product-position/product-position.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ProductPositionModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
