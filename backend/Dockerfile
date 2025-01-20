FROM denoland/deno:2.1.6

WORKDIR /backend

USER deno

# COPY deps.ts .
# RUN deno install --entrypoint deps.ts

COPY . .
RUN deno cache main.ts

CMD ["run", "--allow-net", "main.ts"]
