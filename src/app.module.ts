import { Module } from '@nestjs/common';
import { PickingModule } from './picking/picking.module';
import { ProductPositionModule } from './product-position/product-position.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PickingModule,
    ProductPositionModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
