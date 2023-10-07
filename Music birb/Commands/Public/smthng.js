/**const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { author, version } = require('../../package-lock.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('smthng')
    .setDescription('smthng'),
    
    async execute(interaction) {
        const {message} = interaction
        const tooltipEmbed = new EmbedBuilder()
  .setColor("#4287f5")
  .setTitle("**ToolTip Example**")
  .setDescription(
    `Hover for tooltip: [(i)](https://./ "Hey look! Its a tooltip!")`
  );

interaction.reply({embeds: [tooltipEmbed]});
    }
}**/