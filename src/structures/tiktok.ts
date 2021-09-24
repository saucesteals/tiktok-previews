import axios, { AxiosInstance, AxiosResponse } from "axios";
import axiosCookieJarSupport from "axios-cookiejar-support";
import consola from "consola";
import Stream from "stream";
import { CookieJar } from "tough-cookie";
import { TiktokMatch } from "../utils/tiktok";

const VIDEO_REQUEST_HEADERS = {
  "Accept-Encoding": "identity;q=1, *;q=0",
  Accept: "*/*",
  "Sec-Fetch-Site": "same-site",
  "Sec-Fetch-Mode": "no-cors",
  "Sec-Fetch-Dest": "video",
  Referer: "https://www.tiktok.com/",
};

const DEFAULT_HEADERS = {
  "Cache-Control": "max-age=0",
  "Upgrade-Insecure-Requests": "1",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.93 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  "Sec-GPC": "1",
  "Sec-Fetch-Site": "same-origin",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-User": "?1",
  "Sec-Fetch-Dest": "document",
  "Accept-Language": "en-US,en;q=0.9",
};

export default class TiktokManager {
  private http: AxiosInstance = axiosCookieJarSupport(
    axios.create({
      headers: DEFAULT_HEADERS,
      withCredentials: true,
    })
  );

  constructor() {
    this.updateCookies();

    /* eslint-disable @typescript-eslint/no-misused-promises */
    // Update cookies every 2 minutes
    setInterval(this.updateCookies.bind(this), 1000 * 60 * 2);
  }

  public async updateCookies(): Promise<void> {
    const newJar = new CookieJar();

    await this.http({
      url: "https://www.tiktok.com/",
      jar: newJar,
    });

    this.http.defaults.jar = newJar;
    consola.success("Updated cookies");
    return;
  }

  public async getVideoSourceAddr(videoUrl: string): Promise<string | null> {
    const resp: AxiosResponse<string> = await this.http({ url: videoUrl });

    const playAddrMatch = TiktokMatch.playAddr.exec(resp.data);

    return (
      playAddrMatch &&
      playAddrMatch[1].replace(/\\u0026/g, "&").replace(/\\u002F/g, "&")
    );
  }

  public async getVideoStream(videoUrl: string): Promise<Stream> {
    const playAddr = await this.getVideoSourceAddr(videoUrl);

    if (playAddr === null) {
      throw new Error("No video source found");
    }

    const resp: AxiosResponse<Stream> = await this.http({
      headers: VIDEO_REQUEST_HEADERS,
      url: playAddr,
      responseType: "stream",
    });

    return resp.data;
  }
}
