#!/usr/bin/env sh
set -eu

envsubst '${API_PROXY}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

exec "$@"