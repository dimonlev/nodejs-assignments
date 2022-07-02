import { Module } from '@nestjs/common';
import { BandsService } from './bands.service';
import { BandsResolver } from './bands.resolver';
import { HttpModule } from '@nestjs/axios';
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
  providers: [BandsResolver, BandsService, Axios],
  exports: [BandsModule, BandsService],
})
export class BandsModule {}
