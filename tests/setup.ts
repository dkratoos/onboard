import { randomBytes, randomInt } from "crypto";

import {
  popInjectionContext,
  pushInjectionContext,
  registerScopedValue,
  registerValue,
  setupScope,
} from "@cubos/inject";
import dotenv from "dotenv";
import faker from "faker";
import "reflect-metadata";
import type { Connection } from "typeorm";
import { createConnection, getConnectionOptions } from "typeorm";
import type { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { api } from "../src/generated/api";
import "../src/services";
import "../src/controllers";
import { trFactory } from "../src/helpers/translate";

jest.setTimeout(20000);
dotenv.config();
faker.seed(process.env.FAKER_SEED ? parseInt(process.env.FAKER_SEED, 10) : randomInt(100000));

process.env.TZ = "UTC";

const databaseName = `test_${randomBytes(8).toString("hex")}`;
let masterConn: Connection;
let connection: Connection;

api.use(async (ctx, next) =>
  setupScope(async () => {
    registerScopedValue("request", ctx.request);
    registerScopedValue("tr", trFactory(ctx.request.deviceInfo.language ?? "pt"));
    return next();
  }),
);

beforeAll(async () => {
  try {
    masterConn = await createConnection({
      ...(await getConnectionOptions()),
      logging: false,
      name: "master",
    });

    await masterConn.query(`CREATE DATABASE ${databaseName};`);

    connection = await createConnection({
      ...((await getConnectionOptions()) as PostgresConnectionOptions),
      database: databaseName,
      logging: false,
      migrationsRun: true,
    });

    registerValue("connection", connection);
    registerValue("entityManager", connection.createEntityManager());
  } catch (err) {
    process.stderr.write(`${err instanceof Error ? err.stack : JSON.stringify(err)}\n`);
    process.exit(1);
  }
}, 60000);

afterAll(async () => {
  await connection.close();
  await masterConn.query(`DROP DATABASE ${databaseName};`);
  await masterConn.close();
});

beforeEach(pushInjectionContext);
afterEach(popInjectionContext);
