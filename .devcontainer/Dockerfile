FROM node:22-slim

ENV NODE_ENV=development
ENV WORKSPACE_DIR=/workspace

RUN apt-get update && apt-get install -y \
    git \
    curl \
    tree \
    vim \
    wget \
    htop \
    net-tools \
    procps \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR ${WORKSPACE_DIR}

RUN npm install -g npm@latest && \
    npm install -g @nestjs/cli typescript

RUN mkdir -p ${WORKSPACE_DIR}/sistema-integrado-gestao-backend/node_modules && \
    chown -R node:node /workspace && \
    chown -R node:node ${WORKSPACE_DIR}/sistema-integrado-gestao-backend/node_modules


RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.2.1/zsh-in-docker.sh)" -- \
    -t robbyrussell \
    -p git \
    -p npm
	
USER node

EXPOSE 3000

SHELL ["/bin/zsh", "-c"]
CMD ["zsh"]