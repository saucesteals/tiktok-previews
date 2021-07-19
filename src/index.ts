require("dotenv").config();
import { Intents } from "discord.js";
import TiktokClient from "./structures/client";
import { assert, createDummyServer } from "./utils/etc";
import consola from "consola";

if (process.env.PORT) {
  createDummyServer(process.env.PORT);
}

const client = new TiktokClient({
  intents:
    Object.values(Intents.FLAGS).reduce((acc, p) => acc | p, 0) &
    ~(Intents.FLAGS.GUILD_MEMBERS | Intents.FLAGS.GUILD_PRESENCES),
});

client.on("ready", () => {
  consola.info("Ready as", client.user?.username);

  client.user!.setActivity({
    type: "WATCHING",
    name: "your tiktoks",
  });
});

client.login(
  assert(process.env.DISCORD_BOT_TOKEN, "No DISCORD_BOT_TOKEN found in the env")
);
