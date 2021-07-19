
<img src="https://socialify.git.ci/saucesteals/tiktok-previews/image?description=1&font=Inter&forks=1&language=1&owner=1&pattern=Plus&stargazers=1&theme=Dark" alt="tiktok-previews" width="1040" height="320"  />

<p style="font-size:40px;margin:0" align="center"><b>Welcome to Tiktok Previews 👋</b></p>
<p style="font-size:20px" align="center">Automatically send in-app videos of tiktoks sent in any chat!<p>

## **⚙️ Installation**

### **Public Bot**

* [Invite our publicly hosted bot](https://discord.com/oauth2/authorize?client_id=866304561017913354&scope=bot&permissions=379968)


### **Heroku**

<a target="_blank" href="https://heroku.com/deploy?template=https://github.com/saucesteals/tiktok-previews">
    <img alt="Deploy" src="https://www.herokucdn.com/deploy/button.svg">
</a>

* Click the [Deploy to Heroku](https://heroku.com/deploy?template=https://github.com/saucesteals/tiktok-previews) button above
* Enter your discord bot's token as prompted
* Create your app and enjoy :)

### **Manual**
Tiktok Previews requires [Node.js](https://nodejs.org/) to run.

Install the dependencies.
```sh
yarn install
```

Create and configure an `.env` file from the following template:
```sh
# Your discord bot's token
DISCORD_BOT_TOKEN=
```

Start it!
```sh
# Start in development
yarn dev

# OR

# Watch in development
yarn watch

# OR 

# Start in production
yarn build
yarn start
```


## **🕹️ Usage**

1. Make sure the bot has the following permissions in the channels you want it to work in:
      - View Channel
      - Send Messages
      - Embed Links
      - Attach Files
      - Read Message History
 
2. Send a link to any tiktok

## **🤝 Contributing**

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## **📝 License**

Distributed under the MIT License. See `LICENSE` for more information.