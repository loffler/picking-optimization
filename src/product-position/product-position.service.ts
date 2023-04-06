import { ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map, tap } from 'rxjs';
import { ProductPosition } from '../common/types';

@Injectable()
export class ProductPositionService {
  constructor(private readonly httpService: HttpService) {}

  getProductPositions(productId: string): Promise<ProductPosition[]> {
    return firstValueFrom(
      this.httpService
        .get<ProductPosition[]>(
          `https://dev.aux.boxpi.com/case-study/products/${productId}/positions`,
        )
        .pipe(map((res) => res.data))
        .pipe(
          catchError((err, caught) => {
            throw new ForbiddenException(
              'Failed to retrieve data from warehouse API.',
            );
          }),
        ),
    );
  }
}
