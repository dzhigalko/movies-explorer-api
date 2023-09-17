FROM nginx

COPY . /etc/nginx/templates/
COPY --from=builder /app/build /usr/share/nginx/html
