FROM mhart/alpine-node:latest

# Set the work directory
RUN mkdir -p /var/convargo
WORKDIR /var/convargo

RUN apk update && \
    yarn global add nodemon

CMD nodemon --inspect /var/convargo
