FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]

# setup default command to run the container

# posts/Dockerfile

# $ docker build -t dsiri12/posts:0.0.1 .
# $ docker push dsiri12/posts:0.0.1

# docker run -p 4000:4000 -d dsiri12/posts:0.0.1
# in chrome: http://localhost:4000/posts