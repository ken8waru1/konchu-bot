const _ = require('lodash');
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

const { fetchRandomArmorSet, fetchRandomWeapon, fetchRandomCharm, fetchRandomMonster } = require('./requests');

client.on('message', async msg => {
  if (msg.content === '/roulette') {
    //to be revisted and refactored to have concurrent requests
    const randomArmorSet = await fetchRandomArmorSet();
    const randomWeapon = await fetchRandomWeapon();
    const randomMonster = await fetchRandomMonster();
    const randomCharm = await fetchRandomCharm();
    
    msg.reply(`pray to the gacha \n \n 
    **Head**: ${randomArmorSet.head.name} (rarity: ${randomArmorSet.head.rarity}) \n 
    **Chest**: ${randomArmorSet.chest} (rarity: ${randomArmorSet.chest.rarity}) \n 
    **Arms**: ${randomArmorSet.gloves} (rarity: ${randomArmorSet.gloves.rarity}) \n 
    **Waist**: ${randomArmorSet.waist} (rarity: ${randomArmorSet.waist.rarity}) \n 
    **Legs**: ${randomArmorSet.legs} (rarity: ${randomArmorSet.legs.rarity})  
    `);
  }
});

client.login(process.env.BOT_TOKEN);