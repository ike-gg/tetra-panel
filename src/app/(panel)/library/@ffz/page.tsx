import { Emote } from "~/components/emotes/Emote";
import * as Alert from "~/components/ui/alert";
import { TypographyH2 } from "~/components/ui/typography";
import { queryFFZ } from "~/lib/emotes/query";

interface PageProps {
  searchParams: {
    query: string;
    page: string;
    provider: string;
  };
}

export default async function EmoteLibrarySeventvPage({
  searchParams: { query, page, provider },
}: PageProps) {
  const isActiveProvider = provider === "ffz";
  if (!isActiveProvider && provider) return null;

  const emotesPerPage = isActiveProvider ? 60 : 20;
  const currentPage = Math.floor(Number(page));

  try {
    const emotes = await queryFFZ(query, {
      limit: emotesPerPage,
      page: currentPage,
    });

    return (
      <div>
        <TypographyH2>FFZ Emotes</TypographyH2>
        {emotes.length === 0 && (
          <Alert.Alert>
            <Alert.AlertTitle>Not found.</Alert.AlertTitle>
            <Alert.AlertDescription>
              Emotes not found with provided query <code>{query}</code>.
            </Alert.AlertDescription>
          </Alert.Alert>
        )}
        <div className="flex flex-wrap gap-3">
          {emotes.map((emote) => (
            <Emote details={emote} key={emote.reference + emote.origin} />
          ))}
        </div>
      </div>
    );
  } catch (e) {
    return (
      <Alert.Alert variant={"destructive"}>
        <Alert.AlertTitle>Failed fetching FFZ emotes.</Alert.AlertTitle>
        <Alert.AlertDescription>
          {e instanceof Error ? e.message : String(e)}
        </Alert.AlertDescription>
      </Alert.Alert>
    );
  }
}
