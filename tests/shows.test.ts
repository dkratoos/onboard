import { readFileSync } from "fs";
import { join } from "path";

import { registerService } from "@cubos/inject";
import type { Context } from "@sdkgen/node-runtime";
import { apiTestWrapper } from "@sdkgen/node-runtime";
import Axios from "axios";
import MockAdapter from "axios-mock-adapter";

import "../src/controllers";
import { api } from "../src/generated/api";
import { TvMaze } from "../src/services/tvmaze";

const { fn } = apiTestWrapper(api);

function registerTvMazeMock() {
  const client = Axios.create();

  registerService("singleton", TvMaze, client);

  const mock = new MockAdapter(client);

  mock
    .onGet("/shows/0/episodes")
    .reply(404, JSON.parse(readFileSync(join(__dirname, "__mock__", "shows", "0.json"), "utf8")));

  mock
    .onGet("/shows/1/episodes")
    .reply(200, JSON.parse(readFileSync(join(__dirname, "__mock__", "shows", "1.json"), "utf8")));

  mock
    .onGet("/shows/2/episodes")
    .reply(200, JSON.parse(readFileSync(join(__dirname, "__mock__", "shows", "2.json"), "utf8")));
}

describe("Shows", () => {
  const ctx = {} as Context;

  test("should return 404 if show doesn't exist", async () => {
    registerTvMazeMock();

    await expect(fn.getEpisodes(ctx, { showId: 0 })).rejects.toThrowError("Erro ao consultar episódios no TVmaze");
  });

  test.each([
    [1, 39],
    [2, 103],
  ])("should return all episodes of the show %d", async (showId: number, length: number) => {
    registerTvMazeMock();

    const episodes = await fn.getEpisodes(ctx, { showId });

    expect(episodes).toHaveLength(length);
  });
});
