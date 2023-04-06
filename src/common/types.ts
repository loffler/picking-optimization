export type Coordinates = {
  x: number;
  y: number;
  z: number;
};

export type PositionId = string;
export type ProductId = string;

export type PickingPath = {
  pickingPath: ProductPosition[];
  totalDistance: number;
};

export class ProductPosition {
  positionId: PositionId;
  x: number;
  y: number;
  z: number;
  productId: ProductId;
  quantity: number;
}
