const {client} = require('discord.js');
const { readSync } = require('fs');
const { changeActivity } = require('./activities');

module.exports = {
    name: "ready",
    once: true,
    execute(client){
        console.log(`${client.user.username} is now online!`);
        changeActivity(client);
    }
}