import { Module } from '@nestjs/common';
import { ProductPositionService } from './product-position.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        headers: {
          'X-Api-Key': configService.get('BOXPI_API_KEY'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ProductPositionService],
  exports: [ProductPositionService],
})
export class ProductPositionModule {}
