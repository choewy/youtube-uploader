# Node Chapter 1

## Demo

- http://146.56.187.171

## API Docs

- [/app/README.md](https://github.com/choewy/node-chapter-1/blob/master/app/README.md)

## Development

- Server : Node.js - express, mongoose
- Client : React.js

## Environment

### Server(`/app/.env`)

```env
NODE_PORT=${EXPRESS_SERVER_PORT}

MONGO_URI=mongodb://${USER}:{PASSWORD}@{HOST}:{PORT}/{DEFAULT_DB}
MONGO_DB_NAME=${MONGO_DATABASE_NAME}

TOKEN_SECRET=${JWT_ACCESS_TOKEN_SECRET_KEY}
COOKIE_TOKEN_KEY=${COOKIE_TOKEN_KEY}
COOKIE_TOKEN_EXP_KEY=${COOKIE_TOKEN_EXPIRED_KEY}
```

### Client(`/react/.env`)

```env
BUILD_PATH='../app/view'
```

## Local Run

```
$ git clone https://github.com/choewy/node-chapter-1.git
```

위의 내용을 참고하여 `/app/.env`과 `/client/.env`을 작성하세요.

> ※ 단, `/app/.env`의 MONGO_URI의 IP주소는 Docker network에서 동작하는 MongoDB 컨테이너의 IP를 입력해야 합니다.

```
$ docker-compose up -d
```


