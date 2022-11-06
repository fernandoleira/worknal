FROM golang:1.16-alpine

WORKDIR /app

COPY ./ ./

RUN go mod download

RUN go build -o /pocketbase

EXPOSE 8090

ENTRYPOINT ["./pocketbase"]

CMD ["serve"]