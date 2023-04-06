import { Coordinates, ProductId } from '../../common/types';

export class OrderDto {
  startingPosition: Coordinates;
  productIds: ProductId[];
}
