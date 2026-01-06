# Hybrid NestJS Project - Docker + Lambda

Proyecto simple de NestJS que demuestra cómo usar **@codegenie/serverless-express** para ejecutar la misma aplicación en:

- **Docker** (contenedor tradicional)
- **AWS Lambda** (serverless con API Gateway)

## 🚀 Uso

### Docker

```bash
# Build
docker build -t hybrid-nest-project .

# Run
docker run -p 3000:3000 hybrid-nest-project

# Test
curl http://localhost:3000/api/v1
```

### AWS Lambda

#### Opción 1: Local con Serverless Offline

```bash
# Compilar el proyecto
npm run build

# Iniciar serverless offline (emula API Gateway)
npx serverless offline

# En otra terminal, probar:
curl http://localhost:3000/dev/api/v1
```

#### Opción 2: Desplegar a AWS

```bash
# Compilar
npm run build

# Desplegar
npx serverless deploy --stage prod

# Probar (usa la URL que te devuelve el deploy)
curl https://tu-api-gateway-url/prod/api/v1
```

## 📁 Estructura

- `src/main.ts` - Entry point para Docker/local
- `src/lambda.ts` - Handler para AWS Lambda (usa @codegenie/serverless-express)
- `src/setup.ts` - Configuración compartida
- `serverless.yml` - Configuración de Serverless Framework
- `Dockerfile` - Imagen Docker

## 🔑 Cómo Funciona

**@codegenie/serverless-express** envuelve la aplicación Express/NestJS para que funcione en Lambda:

```typescript
// lambda.ts
const expressApp = express();
const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
await nestApp.init();

cachedServer = serverlessExpress({ app: expressApp });
```

El servidor se cachea entre invocaciones para mejorar el rendimiento (warm starts).

## 📝 License

UNLICENSED
