FROM node:18 AS builder

COPY . /etc/nginx/templates/
COPY --from=builder /app/build /usr/share/nginx/html
