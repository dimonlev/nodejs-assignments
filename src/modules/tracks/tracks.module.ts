import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksResolver } from './tracks.resolver';
import { HttpModule } from '@nestjs/axios';
import { GenresModule } from '../genres/genres.module';
import { BandsModule } from '../bands/bands.module';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    GenresModule,
    BandsModule,
    ArtistsModule,
    forwardRef(() => AlbumsModule),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [TracksResolver, TracksService],
  exports: [TracksService],
})
export class TracksModule {}
