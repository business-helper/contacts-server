import { Config } from "../types";

const config: Config = {
  port: Number(process.env.PORT) || 3100,
};

export default config;
