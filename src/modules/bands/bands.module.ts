import { Module } from '@nestjs/common';
import { BandsService } from './bands.service';
import { BandsResolver } from './bands.resolver';
import { HttpModule } from '@nestjs/axios';
import { Axios } from 'axios';
import { GenresModule } from '../genres/genres.module';
import { ArtistsModule } from '../artists/artists.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    GenresModule,
    forwardRef(() => ArtistsModule),
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
