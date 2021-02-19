```shell
#Alpine Linux with a glibc-2.21
FROM centos:latest
MAINTAINER kitty@eiduo.com

RUN mkdir -p /mongodb/mongodb1
RUN mkdir -p /mongodb/mongodb2
RUN mkdir -p /mongodb/mongodb3

ADD  mongodb1 /mongodb/mongodb1
ADD  mongodb2 /mongodb/mongodb2
ADD  mongodb3 /mongodb/mongodb3

EXPOSE 27017
EXPOSE 27018
EXPOSE 27019

RUN chmod +x /mongodb/mongodb1/bin/*
RUN chmod +x /mongodb/mongodb2/bin/*
RUN chmod +x /mongodb/mongodb3/bin/*

WORKDIR /mongodb
```