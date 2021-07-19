import { AssertionError } from "assert";
import NetType, { AddressInfo } from "net";
import consola from "consola";

export const assert = <T>(value: T, errorMessage: string): NonNullable<T> => {
  if (value) return value as NonNullable<T>;
  throw new AssertionError({ message: errorMessage });
};

export const createDummyServer = (port: string) => {
  const Net: typeof NetType = require("net");
  const server = new Net.Server();
  server
    .listen(port, () => {
      consola.info(`Listening to dummy server on port ${port}`);
    })
    .on("connection", (socket) => {
      socket.end(
        "HTTP/1.1 301 Moved Permanently\nLocation:https://github.com/saucesteals/tiktok-previews"
      );

      consola.info(
        `Redirected ${
          (socket.address() as AddressInfo).address
        } on dummy server`
      );
    });
};
