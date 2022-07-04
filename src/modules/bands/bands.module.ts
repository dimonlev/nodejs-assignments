import { Module } from '@nestjs/common';
import { BandsService } from './bands.service';
import { BandsResolver } from './bands.resolver';
import { HttpModule } from '@nestjs/axios';
import { Axios } from 'axios';
import { GenresService } from '../genres/genres.service';
import { GenresModule } from '../genres/genres.module';

@Module({
  imports: [
    GenresModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [BandsResolver, BandsService, Axios],
  exports: [BandsService],
})
export class BandsModule {}
