import type { AsTyped } from "as-typed";

import { createValidator } from "../../helpers/schema-validator";

const episodeListSchema = {
  items: { $ref: "#/definitions/Episode" },
  type: "array",
  definitions: {
    Episode: {
      required: [
        "_links",
        "airdate",
        "airstamp",
        "airtime",
        "id",
        "image",
        "name",
        "number",
        "runtime",
        "season",
        "summary",
        "url",
      ],
      properties: {
        _links: {
          required: ["self"],
          properties: {
            self: { required: ["href"], properties: { href: { format: "uri", type: "string" } }, type: "object" },
          },
          type: "object",
        },
        airdate: { format: "date", type: "string" },
        airstamp: { format: "date-time", type: "string" },
        airtime: { pattern: "^(?:[0-1]?[0-9]|2[0-3]):[0-5][0-9]$", type: "string" },
        id: { type: "integer" },
        image: {
          required: ["medium", "original"],
          properties: { medium: { format: "uri", type: "string" }, original: { format: "uri", type: "string" } },
          type: "object",
        },
        name: { type: "string" },
        number: { type: "number" },
        runtime: { type: "number" },
        season: { type: "number" },
        summary: { type: "string" },
        url: { format: "uri", type: "string" },
      },
      type: "object",
    },
  },
} as const;

export type EpisodeList = AsTyped<typeof episodeListSchema>;

export const validateEpisodeList = createValidator(episodeListSchema);
