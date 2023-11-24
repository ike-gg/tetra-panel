export const stvEmoteSourceParser = (sourceUrl: string, animated: boolean) => {
  const sizes = ["1x", "2x", "3x", "4x"];
  const fullUrl = sourceUrl.replace("//", "https://");
  const urls = sizes.map((size) => {
    const url = `${fullUrl}/${size}.`;
    return animated ? `${url}gif` : `${url}webp`;
  });
  return {
    "1x": urls[0],
    "2x": urls[1],
    "3x": urls[2],
    "4x": urls[3],
  };
};

export const bttvTransformSourceUrl = (emoteId: string, animated: boolean) => {
  const bttvCdn = "https://cdn.betterttv.net/emote";
  const sizes = ["1x", "2x", "3x"];
  const baseUrl = `${bttvCdn}/${emoteId}`;

  const sizesUrl = sizes.map((size) => {
    const extension = animated ? "gif" : "png";
    return `${baseUrl}/${size}.${extension}`;
  });

  return {
    "1x": sizesUrl[0],
    "2x": sizesUrl[1],
    "3x": sizesUrl[2],
  };
};
