const auth = "/auth";

const tasks = {
  id: (id: string) => `/task/${id}`,
};

const guilds = {
  id: (id: string) => `/guild/${id}`,
};

const routes = { guilds, tasks, auth };

export { routes };
