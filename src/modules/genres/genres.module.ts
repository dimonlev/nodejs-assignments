import { Module } from '@nestjs/common';
import { GenresResolver } from './genres.resolver';
import { HttpModule } from '@nestjs/axios';
import { GenresService } from './genres.service';
import { Axios } from 'axios';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [GenresResolver, GenresService, Axios],
  exports: [GenresService],
})
export class GenresModule {}
