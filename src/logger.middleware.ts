import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
//import { Logger } from "nestjs-pino";
const opentelemetry = require('@opentelemetry/api');

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const tracer = opentelemetry.trace.getTracer("sample_app");
    const mainSpan = tracer.startSpan('middleware example span');
    // TODO find out how to use the pino log
    console.log(`Middleware req with trace_id: ${mainSpan.spanContext.traceId}`)
    next();
    mainSpan.end()
  }
}
