import { Module } from '@nestjs/common';
import { PickingController } from './picking.controller';
import { NearestPickingService } from './nearest-picking.service';
import { ProductPositionModule } from '../product-position/product-position.module';

@Module({
  imports: [ProductPositionModule],
  controllers: [PickingController],
  providers: [NearestPickingService],
})
export class PickingModule {}
