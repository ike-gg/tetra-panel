import { Emote } from "~/components/emotes/Emote";
import * as Alert from "~/components/ui/alert";
import { TypographyH2 } from "~/components/ui/typography";
import { queryBTTV } from "~/lib/emotes/query/bttv";

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
  if (provider !== "bttv" && provider) return null;

  try {
    const emotes = await queryBTTV(query, page ? Number(page) : undefined);

    return (
      <div>
        <TypographyH2>BTTV Emotes</TypographyH2>
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
        <Alert.AlertTitle>Failed fetching BTTV emotes.</Alert.AlertTitle>
        <Alert.AlertDescription>
          {e instanceof Error ? e.message : String(e)}
        </Alert.AlertDescription>
      </Alert.Alert>
    );
  }
}
