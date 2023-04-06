import { OrderDto } from '../dto/order.dto';
import { PickingPath } from '../../common/types';

export interface PickingServiceInterface {
  getPickingPath(orderDto: OrderDto): Promise<PickingPath>;
}
