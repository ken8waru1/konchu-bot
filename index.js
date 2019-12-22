const _ = require("lodash");
const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();

const huntingRequests = require("./requests");

client.on("message", async msg => {
  if (msg.content === "/roulette") {
    const promises = [];
    const randomHunt = {
      randomArmorSet: null,
      randomWeapon: null,
      randomCharm: null,
      randomMonster: null
    };

    for (let request of Object.values(huntingRequests)) {
      promises.push(request());
    }

    await Promise.all(promises)
      .then(randomFeatures => {
        Object.keys(randomHunt).forEach((key, idx) => {
          randomHunt[key] = randomFeatures[idx];
        });
      })
      .catch(err => console.log(err));

    const {
      randomArmorSet,
      randomWeapon,
      randomCharm,
      randomMonster
    } = randomHunt;
    let message = "";

    //formatting with template literals causes weird things when the message hits discord, so doing it this way for now, but there has to be a better way so will revisit
    message += `**Head**: ${randomArmorSet.head.name} (rarity: ${randomArmorSet.head.rarity}) \n`;
    message += `**Chest**: ${randomArmorSet.chest.name} (rarity: ${randomArmorSet.chest.rarity}) \n`;
    message += `**Arms**: ${randomArmorSet.gloves.name} (rarity: ${randomArmorSet.gloves.rarity}) \n`;
    message += `**Waist**: ${randomArmorSet.waist.name} (rarity: ${randomArmorSet.waist.rarity}) \n`;
    message += `**Legs**: ${randomArmorSet.legs.name} (rarity: ${randomArmorSet.legs.rarity}) \n`;
    message += `**Weapon**: ${randomWeapon.name} (rarity: ${randomWeapon.rarity}) \n`;
    message += `**Charm**: ${randomCharm.name} (rarity: ${
      _.sample(randomCharm.ranks).rarity
    }) \n`;
    message += `**Target**: ${randomMonster.name}`;

    msg.reply(`pray to the gacha\n\n${message}`);
  }
});

client.login(process.env.BOT_TOKEN);
