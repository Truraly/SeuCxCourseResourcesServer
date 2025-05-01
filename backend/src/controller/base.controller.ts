import { Inject } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';
import { HttpService } from '@midwayjs/axios';

export class BaseController {
  //   @iInject()
  //   ctx: Context;

  @Inject()
  logger: ILogger;

  @Inject()
  httpService: HttpService;

  successReturn<T>(data?: T) {
    return {
      success: true,
      message: 'OK',
      data: data ?? ({} as T),
    };
  }

  errorReturn(message: string) {
    return {
      success: false,
      message,
    };
  }
}
