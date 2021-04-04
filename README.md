# Quick.kral
Discord botlar için güçlü ekonomi çerçevesi.

[![NPM](https://nodei.co/npm/quick.kral.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/quick.kral/)

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FINEX07%2Fquick.kral.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FINEX07%2Fquick.kral?ref=badge_shield)


### Kurulum

```sh
$ npm i quick.kral -s

// Add one of the following adapters [required]

$ npm i @quick.kral/sqlite

$ npm i @quick.kral/mongo

$ npm i @quick.kral/mysql 
```

# Adaptör Kullanımı

- **[SQLite](https://npmjs.com/package/@quick.kral/sqlite)**
- **[MongoDB](https://npmjs.com/package/@quick.kral/mongo)**
- **[MySQL](https://npmjs.com/package/@quick.kral/mysql)**

# Özellikleri
- Global Economy
- Per-guild Economy
- Built-in cooldown
- Flexible
- Randomizer
- Configurable
- Storage Adapters 
- & much more...

# Başlarken

```js
const { EconomyManager } = require("quick.kral");
const kral = new EconomyManager({
    adapter: '', // => sqlite, mongo or mysql
    adapterOptions: {} // => Options
});
```

# Misal

```js
const Discord = require("discord.js");
const client = new Discord.Client();
const { EconomyManager } = require("quick.kral")
const kral = new EconomyManager({
    adapter: 'sqlite'
});

client.on("ready", () => console.log('Hazır!'));

client.on("message", async (message) => {
    if (!message.guild || message.author.bot) return;

    if (message.content === "günlük") {
        let add = await kral.daily(message.author.id, false, 500);
        if (add.cooldown) return message.reply(`Zaten günlük ödülünüzü aldınız! **Şu Kadar Zaman Sonra ${add.time.days} dün, ${add.time.hours} saat, ${add.time.minutes} dakika & ${add.time.seconds} saniye Tekrar Deneyin!**`);
        return message.reply(`İşte ${add.amount} 💸 günlük krediniz aldınız! Ve Toplamda Bu Kadar Paranız: ${add.money} 💸 Mevcut!`);
    }

    if (message.content === "cüzdan") {
        let money = await kral.fetchMoney(message.author.id);
        return message.channel.send(`${message.author} kişide şu kadar ${money} 💸 var!`);
    }

    if (message.content === "sıralama") {
        let lb = await kral.leaderboard(false, 10);
        const embed = new Discord.MessageEmbed()
        .setAuthor("Liderlik tablosu!")
        .setColor("BLURPLE");
        lb.forEach(u => {
            embed.addField(`${u.position}. ${client.users.cache.get(u.user).tag}`, `${u.money} 💸`);
        });
        return message.channel.send(embed);
    }
});

client.login("XXXXXXXXXXXXXX");
```

# Linkler

- **[Discord](https://discord.gg/AnUXS6z5tY)**
- **[Dokümanlar](https://kral.js.org)**

## © Kral Studio ❄️ - 2021