import { use } from "@cubos/inject";

import { api } from "../generated/api";
import { TvMaze } from "../services/tvmaze";

api.fn.getEpisodes = async (_ctx, { showId }) => {
  return (await use(TvMaze).getEpisodes(showId)).map(episode => ({
    id: episode.id,
    name: episode.name,
    season: episode.season,
  }));
};
