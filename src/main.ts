import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CrudConfigService } from '@nestjsx/crud';


async function bootstrap() {
  CrudConfigService.load({
    query: {
      limit: 10,
      alwaysPaginate:true
    },
    
    routes: {
      updateOneBase: {
        allowParamsOverride: true,
      },
      deleteOneBase: {
        returnDeleted: true,
      },
    },
  });
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
