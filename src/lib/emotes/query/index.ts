import { querySevenTV } from "./seventv";
import { queryBTTV } from "./bttv";
import { queryFFZ } from "./ffz";

export interface QueryOptions {
  page?: number;
  offset?: number;
  limit?: number;
}

export { querySevenTV, queryBTTV, queryFFZ };
