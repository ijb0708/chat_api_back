FROM node:slim

WORKDIR /usr/src/app

# 설치
COPY package*.json .
RUN npm install 

# 앱소스 추가
COPY . .

EXPOSE 80
ENTRYPOINT [ "npm", "start" ]