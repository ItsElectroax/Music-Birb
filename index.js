const {Presence, Client, GatewayIntentBits, Partials, AllowedMentionsTypes, Collection, EmbedBuilder } = require('discord.js');
const { version } = require("./package.json");

const {DisTube} = require('distube');
const {SpotifyPlugin} = require('@distube/spotify');
require('@discordjs/voice');

const {loadEvents} = require('./Handlers/eventHandler');
const {loadCommands} = require('./Handlers/commandHandler');

const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)],

    allowedMentions: {
        parse: [
            AllowedMentionsTypes.Everyone, AllowedMentionsTypes.User, AllowedMentionsTypes.Role
        ]
    }
});

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: false,
    emitAddSongWhenCreatingQueue: false,
    searchSongs: 10,
    leaveOnStop: true,
    leaveOnEmpty: true,
    emptyCooldown: 0,
    customFilters: {},
    nsfw: false,
    plugins: [new SpotifyPlugin()],
});

module.exports = client

client.commands = new Collection();
client.config = require('./config.json')

client.on('guildCreate', guild => {
    console.log(`Joined succesfully in ${guild.name} (${guild.id})`);
  
    const channel = guild.systemChannel; // Get the default channel of the server
    if (!channel) return; // If there is no default channel, return 
  
    const embed = new EmbedBuilder()
            .setColor('#AD1457')
            .setTitle('Hello, I\'m the new Music birb, an ultimate Discord bot!')
            .setDescription("Hark, behold! It is with great delight that I, a mere servant, have been summoned by the most exalted and venerable presence...")
            .addFields({ name: "<a:ringbell:1084257163855286302> Who am I?", value: "```Thank you for adding me to your server. My purpose is moderation and your assistance in every way, to enhance your experience and experience of your members! I am ready for action! Here are a few things you should check out first...```"})
            .addFields(
                { name: '<a:info:1084253538462474424> Info', value: 'The default command prefix is `/`. Use </help:1114543164666171474> to see all available commands.' },
                { name: '<a:staff:1084226375373832352> Support Server', value: 'Join the MultiCord Support server for help and updates: [UNDER CONSTRUCTION]' },
                { name: '<a:commands:1084226369925419018> Creator Support', value: 'Support the creator <@1106132150035685407> on Patreon:\nhttps://www.patreon.com/electroax'},
            )
            .setFooter({text: `Build: v${version}, Powered by MultiCord`})
            .setTimestamp();

            channel.send({ embeds: [embed] });
    }
);

client.login(client.config.token).then(() => {
    loadEvents(client);
    loadCommands(client);
})
