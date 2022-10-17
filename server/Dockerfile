FROM jonasal/nginx-certbot:latest

ENV CERTBOT_EMAIL=bas.broekhuizen@gmail.com
ENV STAGING=0

COPY ./config/* /etc/nginx/user_conf.d/
COPY ./.htpasswd /etc/nginx/.htpasswd
 