import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerModule } from "nestjs-pino";
import { Logger } from '@nestjs/common';



const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const opentelemetry = require('@opentelemetry/api');

const provider = new NodeTracerProvider();



async function bootstrap() {

  provider.register();

  registerInstrumentations({
    tracerProvider: provider
  });

  const tracer = opentelemetry.trace.getTracer("sample_app");

  const app = await NestFactory.create(AppModule);
  //app.useLogger();

  let exporter = new JaegerExporter({
    logger: LoggerModule,
    serviceName: "sample_app",
    host: process.env.JAEGER_HOST || "localhost"
  });

  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

 
  await app.listen(3000);
}

bootstrap();
