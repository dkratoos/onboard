import { registerScopedValue, registerValue, setupScope, use } from "@cubos/inject";
import { SdkgenHttpServer } from "@sdkgen/node-runtime";
import { createConnection, getConnectionOptions } from "typeorm";

import "./controllers";
import "./services";

import { api, Fatal } from "./generated/api";
import { trFactory } from "./helpers/translate";
import { Sentry } from "./services/Sentry";

process.env.TZ = "UTC";

api.use(async (ctx, next) =>
  setupScope(async () => {
    registerScopedValue("request", ctx.request);
    registerScopedValue("tr", trFactory(ctx.request.deviceInfo.language ?? "pt"));
    return next();
  }),
);

api.use(async (_ctx, next) => {
  const reply = await next();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (reply.error && (!reply.error.type || reply.error.type === "Fatal")) {
    use(Sentry).captureException(reply.error);
    console.error(reply.error);
    reply.error = new Fatal(use.tr`Erro interno`);
  }

  return reply;
});

getConnectionOptions()
  .then(async options =>
    createConnection({
      ...options,
      migrationsRun: true,
    }),
  )
  .then(async connection => {
    registerValue("connection", connection);
    registerValue("entityManager", connection.createEntityManager());

    const server = new SdkgenHttpServer(api, {});

    return server.listen(parseInt(process.env.PORT ?? "8000", 10));
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
