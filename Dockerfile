# Usando uma imagem base do Alpine Linux por ser leve
FROM alpine:latest

# Atualiza os pacotes e instala o SQLite
RUN apk update && apk add sqlite

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Comando padrão ao iniciar o contêiner
CMD ["tail", "-f", "/dev/null"]
