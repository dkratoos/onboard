import { use } from "@cubos/inject";
import axios from "axios";
import axiosRetry from "axios-retry";

import { Config } from "../Config";
import type { EpisodeList } from "./schema";
import { validateEpisodeList } from "./schema";

export class TvMaze {
  // istanbul ignore next
  static defaultClient() {
    return axios.create({
      baseURL: use(Config).tvmazeUrl,
    });
  }

  constructor(/* istanbul ignore next */ private readonly client = TvMaze.defaultClient()) {
    axiosRetry(this.client, { retries: 3 });
  }

  async getEpisodes(showId: number) {
    try {
      const { data } = await this.client.get<EpisodeList>(`/shows/${showId}/episodes`);

      validateEpisodeList(data);
      return data;
    } catch {
      throw new Error("Erro ao consultar episódios no TVmaze");
    }
  }
}
