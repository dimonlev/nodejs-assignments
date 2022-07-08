import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsResolver } from './albums.resolver';
import { HttpModule } from '@nestjs/axios';
import { ArtistsModule } from '../artists/artists.module';
import { BandsModule } from '../bands/bands.module';
import { GenresModule } from '../genres/genres.module';
import { TracksModule } from '../tracks/tracks.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    ArtistsModule,
    BandsModule,
    GenresModule,
    forwardRef(() => TracksModule),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [AlbumsResolver, AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
