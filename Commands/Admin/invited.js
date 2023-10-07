const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { author, version } = require('../../package-lock.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('invited')
    .setDescription('Repeat the bot\'s on invite message.'),
    
    async execute(interaction) {
        const { client, user } = interaction;
        // Check if the user executing the command is the specific username you want to allow
        const allowedUsername = author;
        if (user.id !== allowedUsername) {
            const error = new EmbedBuilder()
            .setTitle('Uh, oh!')
            .setColor('#E74C3C')
            .setDescription('You are not authorised to use this command!')
          return interaction.reply({ embeds: [error], ephemeral: true });
        }
        const embed = new EmbedBuilder()
        .setColor('#AD1457')
        .setTitle('Hello, I am Multi, an ultimate Discord bot!')
        .setDescription("Hark, behold! It is with great delight that I, a mere servant, have been summoned by the most exalted and venerable presence...")
        .addFields({ name: "<a:ringbell:1084257163855286302> Who am I?", value: "```Thank you for adding me to your server. My purpose is moderation and your assistance in every way, to enhance your experience and experience of your members! I am ready for action! Here are a few things you should check out first...```"})
        .addFields(
            { name: '<a:info:1084253538462474424> Info', value: 'The default command prefix is `/`. Use </help:1114543164666171474> to see all available commands.' },
            { name: '<a:staff:1084226375373832352> Support Server', value: 'Join the MultiCord Support server for help and updates: https://discord.gg/eCab35Dc' },
            { name: '<a:commands:1084226369925419018> Creator Support', value: 'Support the creator <@1106132150035685407> on Patreon:\nhttps://www.patreon.com/electroax'},
        )
        .setFooter({text: `Build: v${version}, Powered by MultiCord`})
        .setTimestamp();

        interaction.reply({ embeds: [embed] });
    },
};