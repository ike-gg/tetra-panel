import { type EmoteOrigin } from "~/types/emote";
import { getSeventvData } from "./metadata/getSeventvData";
import { getBttvData } from "./metadata/getBttvData";
import { getFfzData } from "./metadata/getFfzData";

export const getEmoteProviderData = async (
  provider: EmoteOrigin,
  reference: string,
) => {
  switch (provider) {
    case "SEVENTV":
      return await getSeventvData(reference);
    case "BTTV":
      return await getBttvData(reference);
    case "FFZ":
      return await getFfzData(reference);
    default:
      return null;
  }
};
