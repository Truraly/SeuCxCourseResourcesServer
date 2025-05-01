import { Configuration, App, Logger } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { ILogger } from '@midwayjs/logger';
import * as staticFile from '@midwayjs/static-file';
import * as axios from '@midwayjs/axios';
import * as Validate from '@midwayjs/validate';
import * as swagger from '@midwayjs/swagger';
import * as jwt from '@midwayjs/jwt';
import { JwtMiddleware } from './middleware/jwt.middleware';
@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    staticFile,
    swagger,

    axios,

    jwt,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;
  @Logger()
  logger: ILogger;
  private startTime: number = Date.now();
  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware, JwtMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
    this.logger.info('[ Prisma ] Prisma Client Connected');
    this.logger.info('[ Prisma ] Prisma Client Injected');
    this.logger.info('[ 启动耗时 ] %d ms', Date.now() - this.startTime);
  }
}
