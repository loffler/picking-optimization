import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { ProductPositionService } from '../product-position/product-position.service';
import { PickingServiceInterface } from './interfaces/picking-service.interface';
import { Coordinates, PickingPath, ProductPosition } from '../common/types';

@Injectable()
export class NearestPickingService implements PickingServiceInterface {
  constructor(
    private readonly productPositionService: ProductPositionService,
  ) {}

  // Determine order picking path by using "nearest neighbor" algorithm.
  // 0. retrieve positions of all products that should be picked (productPositions)
  // 1. start on the position defined in request
  // 2. find the nearest product to current position and add it to picking path
  // 3. remove all positions of picked product (if any) from productPositions
  // 4. repeat from point 2. until there are no remaining product positions left.
  async getPickingPath(orderDto: OrderDto): Promise<PickingPath> {
    let productPositions: ProductPosition[] = (
      await Promise.all(
        orderDto.productIds.map(async (productId) => {
          return await this.productPositionService.getProductPositions(
            productId,
          );
        }),
      )
    ).flat();

    const pickingPath: ProductPosition[] = [];
    let totalDistance = 0;
    let currentCoordinates = orderDto.startingPosition;

    do {
      const { nearestProductPosition, distance } =
        this.findNearestProductPosition(currentCoordinates, productPositions);

      pickingPath.push(nearestProductPosition);
      totalDistance += distance;

      currentCoordinates = {
        x: nearestProductPosition.x,
        y: nearestProductPosition.y,
        z: nearestProductPosition.z,
      };
      // remove all positions of last picked product, as we don't need to consider it anymore
      productPositions = productPositions.filter(
        (position) => position.productId !== nearestProductPosition.productId,
      );
    } while (productPositions.length > 0);

    return { pickingPath, totalDistance };
  }

  // euler distance
  public getDistance(position1: Coordinates, position2: Coordinates) {
    return Math.sqrt(
      Math.pow(position1.x - position2.x, 2) +
        Math.pow(position1.y - position2.y, 2) +
        Math.pow(position1.z - position2.z, 2),
    );
  }

  // manhattan
  // getDistance(position1: Coordinates, position2: Coordinates) {
  //   return (
  //     Math.abs(position1.x - position2.x) +
  //     Math.abs(position1.y - position2.y) +
  //     Math.abs(position1.z - position2.z)
  //   );
  // }

  private findNearestProductPosition(
    currentCoordinates: Coordinates,
    availableProductPositions,
  ) {
    let minDistance = Number.POSITIVE_INFINITY;
    let nearestProductPosition: ProductPosition = null;

    for (const productPosition of availableProductPositions) {
      const distance = this.getDistance(currentCoordinates, {
        x: productPosition.x,
        y: productPosition.y,
        z: productPosition.z,
      });
      if (distance < minDistance) {
        minDistance = distance;
        nearestProductPosition = productPosition;
      }
    }

    return {
      nearestProductPosition,
      distance: minDistance,
    };
  }
}
