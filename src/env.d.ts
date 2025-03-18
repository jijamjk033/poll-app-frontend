// Define the type of the environment variables.
declare interface Env {
  readonly NODE_ENV: string;
  readonly NG_APP_SERVER_PORT: string;
  readonly NG_APP_GOOGLE_CLIENT_ID: string;
  readonly NG_APP_USER_API_URL: string;
  [key: string]: any;
}

declare interface ImportMeta {
  readonly env: Env;
}


declare const _NGX_ENV_: Env;

declare namespace NodeJS {
  export interface ProcessEnv extends Env {}
}
