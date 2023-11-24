const panel = "/" as const;

const auth = "/auth" as const;

const tasks = {
  id: (id: string) => `/task/${id}`,
} as const;

const guilds = {
  id: (id: string) => `/guild/${id}`,
} as const;

const library = (query?: string, page?: number, provider?: string) => {
  const searchParams: string[] = [];

  query && searchParams.push(`query=${query}`);
  page && searchParams.push(`page=${page}`);
  provider && searchParams.push(`provider=${provider}`);

  return `/library${searchParams.length ? `?${searchParams.join("&")}` : ""}`;
};

const routes = { guilds, tasks, auth, panel, library };

export { routes };
