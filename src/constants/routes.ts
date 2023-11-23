const panel = "/" as const;

const auth = "/auth" as const;

const tasks = {
  id: (id: string) => `/task/${id}`,
} as const;

const guilds = {
  id: (id: string) => `/guild/${id}`,
} as const;

const routes = { guilds, tasks, auth, panel };

export { routes };
