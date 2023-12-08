import { Emote } from "~/components/emotes/Emote";
import { TypographyH2 } from "~/components/ui/typography";
import { stvEmoteSourceParser } from "~/lib/emotes/emoteProviders";
import { type STVResponseGQL } from "~/types/7tv";

export default async function PageTrendingEmotesHomeParallel() {
  const request = await fetch("https://7tv.io/v3/gql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    next: {
      revalidate: 1200,
    },
    body: JSON.stringify({
      //filter: {case_sensitive: false, exact_match: ${exact_match}, ignore_tags: true}
      query: `{
    emotes(query: "", limit: 40, filter: {category: TOP} ) {
      count
      items {
        id
        name
        animated
        owner {
          display_name
        }
        host {
          url
        }
      }
    }
  }`,
    }),
  });

  const data = (await request.json()) as STVResponseGQL;

  return (
    <div>
      <TypographyH2>Trending emotes</TypographyH2>
      <div className="flex flex-wrap gap-2">
        {data.data.emotes?.items.map((emote) => {
          const { host, id, name, animated } = emote;
          const emoteUrls = stvEmoteSourceParser(host.url, animated);

          const emoteUrl = emoteUrls["3x"];

          if (!emoteUrl) return null;

          return (
            <Emote
              key={id}
              details={{
                animated,
                emoteName: name,
                emoteUrl: emoteUrl,
                origin: "SEVENTV",
                reference: id,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
