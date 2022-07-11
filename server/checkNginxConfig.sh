#!/bin/bash

# Based on https://dev.to/simdrouin/validate-your-nginx-configuration-files-easily-with-docker-4ihi

nginxVersion=1.23.0  # Could also be passed as an argument using $2

result=$(docker run --rm -t -a stdout --name my-nginx -v /$PWD/config/:/etc/nginx/conf.d/:ro nginx:$nginxVersion nginx -t)

# nginx -t first checks configuration for correct syntax and then tries to open files referred in configuration.
# certificates errors are ignored because they are not locally available 
successful=$(echo $result | grep "successful\|cannot load certificate" | wc -l)

if [ $successful = 0 ]; then
    echo NGINX CONFIG CONTAINS ERRORS!
    echo "$result"
    exit 1
else
    echo NGINX CONFIG OK!
fi