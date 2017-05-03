FROM nginx:1.11.9-alpine

# for htpasswd command
RUN apk add --no-cache --update \
      apache2-utils

ENV SERVER_NAME cltfevents.bluenetreflections.com
ENV PORT 80
ENV WORKER_PROCESSES auto

COPY files/run.sh /
COPY files/nginx.conf.tmpl /

ENTRYPOINT ["/run.sh"]
