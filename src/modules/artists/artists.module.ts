import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsResolver } from './artists.resolver';
import { HttpModule } from '@nestjs/axios';
import { Axios } from 'axios';
import { BandsModule } from '../bands/bands.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    forwardRef(() => BandsModule),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [ArtistsResolver, ArtistsService, Axios],
  exports: [ArtistsService],
})
export class ArtistsModule {}
