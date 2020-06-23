FROM nginxinc/nginx-unprivileged

COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/ /var/www

USER 1001

EXPOSE 8000
