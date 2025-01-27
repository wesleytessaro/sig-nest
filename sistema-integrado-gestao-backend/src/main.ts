// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupSwagger } from './common/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS
  app.enableCors({
    origin: true, // Em produção, especifique os domínios permitidos
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Define o prefixo global para todas as rotas (opcional)
  app.setGlobalPrefix('api');

  // Configura o pipe de validação global
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transforma os payloads de acordo com os DTOs
      whitelist: true, // Remove propriedades não decoradas dos DTOs
      forbidNonWhitelisted: true, // Lança erro se houver propriedades não decoradas
      transformOptions: {
        enableImplicitConversion: true, // Converte tipos implicitamente
      },
    }),
  );

  // Configura o Swagger
  setupSwagger(app);

  // Define a porta do servidor
  const port = process.env.PORT || 3000;

  // Inicia o servidor
  await app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    console.log(`📚 Documentação Swagger em http://localhost:${port}/api-docs`);
  });
}

// Tratamento de erro no bootstrap
bootstrap().catch((error) => {
  console.error('Erro ao iniciar o servidor:', error);
  process.exit(1);
});
