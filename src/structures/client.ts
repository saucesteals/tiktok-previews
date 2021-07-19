import { Colors, TiktokMatch } from "../utils/tiktok";
import { Client, ClientOptions, Message, MessageEmbed } from "discord.js";
import TiktokManager from "./tiktok";
import consola from "consola";
import { InvitePermissions } from "../utils/etc";

export default class TiktokClient extends Client {
  public manager: TiktokManager = new TiktokManager();

  constructor(options: ClientOptions) {
    super(options);

    this.on("messageCreate", this.$onMessage.bind(this));
  }

  public getInviteUrl(): string {
    return `https://discord.com/oauth2/authorize?client_id=${
      this.user?.id
    }&scope=bot&permissions=${InvitePermissions.toString()}`;
  }

  private $onMessage(message: Message): void {
    if (message.author.bot || !message.guild) return;

    const tiktokUrl = TiktokMatch.baseDomain.exec(message.content)?.shift();

    if (tiktokUrl) {
      this.processTiktokRequest(message, tiktokUrl);
      return;
    }

    if (message.mentions.users.has(this.user!.id)) {
      const embed = new MessageEmbed()
        .setColor(Colors.Pink)
        .setDescription(`[Invite Me!](${this.getInviteUrl()})`);
      message.reply({ embeds: [embed] });
      return;
    }

    return;
  }

  private async processTiktokRequest(
    message: Message,
    url: string
  ): Promise<void> {
    consola.info(
      `[${message.guild?.name}] [${message.author.tag}] Processing tiktok request for ${url}`
    );

    message.channel.sendTyping();
    try {
      const video = await this.manager.getVideoStream(url);

      await message.reply({
        files: [{ attachment: video, name: message.author.username + ".mp4" }],
      });

      consola.success(
        `[${message.guild?.name}] [${message.author.tag}] Processed tiktok request for ${url}`
      );
    } catch (err) {
      console.error(err);
      message.reply("Something went wrong! ```" + err.message + "```");
    }
  }
}
