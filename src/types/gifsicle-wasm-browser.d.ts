interface RunOptions {
  input: {
    file: string | File | Blob | ArrayBuffer;
    name: string;
  }[];
  command: string[];
}

declare module "gifsicle-wasm-browser" {
  export function run(options: RunOptions): Promise<File[]>;
}
