import { AssertionError } from "assert";
import NetType from "net";
import consola from "consola";

export const assert = <T>(value: T, errorMessage: string): NonNullable<T> => {
  if (value) return value as NonNullable<T>;
  throw new AssertionError({ message: errorMessage });
};

export const createDummyServer = (port: string) => {
  const Net: typeof NetType = require("net");
  new Net.Server()
    .on("connection", (socket) => {
      socket.end(
        "HTTP/1.0 301 Moved Permanently\r\nLocation: https://github.com/saucesteals/tiktok-previews\r\n\r\n"
      );
      consola.info(`Redirected on dummy server`);
    })
    .listen(port, () => {
      consola.info(`Listening to dummy server on port ${port}`);
    });
};
