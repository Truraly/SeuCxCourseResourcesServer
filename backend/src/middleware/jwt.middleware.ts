// src/middleware/jwt.middleware.ts
import { IMiddleware, Inject, Middleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import * as dayjs from 'dayjs';

interface promissionInfo {
  date: string; // 2024-01-01
  auth: 'vip' | 'normal';
}
@Middleware()
export class JwtMiddleware implements IMiddleware<Context, NextFunction> {
  @Inject()
  jwtService: JwtService;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 从query中取出token字段
      const token = ctx.query.token;
      console.log('token', token);
      if (!token) {
        ctx.status = 401;
        ctx.body = { success: false, message: '无token', code: '40101' };
        return;
      }
      try {
        const userInfo = await this.jwtService.verify(token as string);
        ctx.userInfo = userInfo; // 挂到 ctx 上，后面可用
        console.log('userInfo', userInfo);
        const u_date = dayjs(
          // @ts-ignore
          (userInfo as promissionInfo).date || '2024'
        ).format('YYYY-MM-DD');
        const now = dayjs().format('YYYY-MM-DD');
        console.log('u_date', u_date, 'now', now);
        // 如果日期与当前日期不符合，也分会token国企
        if (u_date !== now) {
          console.log('token不在对应时间段');
          ctx.status = 401;
          ctx.body = {
            success: false,
            message: 'token不在对应时间段   ',
            code: '40103',
          };
          return;
        }
        await next();
      } catch (err) {
        ctx.status = 401;
        ctx.body = { success: false, message: 'token过期', code: '40102' };
      }
    };
  }

  static getName() {
    return 'jwt'; // 中间件名，用于 router 上引用
  }

  //   配置忽略鉴权的路由地址
  public match = (ctx: Context) => /\/api\/.*/.test(ctx.path);
}
