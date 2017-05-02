FROM mhart/alpine-node:7.5.0
LABEL maintainer Horace Reid <horace.reid@verizonwireless.com>
ENV HOME=/home/cltfevents
ADD package.json $HOME/
COPY . $HOME
#COPY .env $HOME/
WORKDIR $HOME
COPY ./node_modules $HOME/node_modules
EXPOSE 8080
CMD ["npm", "start", ""]