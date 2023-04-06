import { Body, Controller, Get, Post } from '@nestjs/common';
import { NearestPickingService } from './nearest-picking.service';
import { OrderDto } from './dto/order.dto';

@Controller('picking')
export class PickingController {
  constructor(private readonly pickingService: NearestPickingService) {}

  @Post('optimize')
  async getOrderPickingPath(@Body() orderDto: OrderDto) {
    return await this.pickingService.getPickingPath(orderDto);
  }
}
