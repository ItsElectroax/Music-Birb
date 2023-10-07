const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
data: new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Displays bot\'s response time'),
  async execute(interaction) {
    const sentEmbed = await interaction.deferReply({
      ephemeral: true,
      embeds: [
        new EmbedBuilder()
          .setColor('#2C2F33')
          .setTitle('Ping?')
          .setDescription('<a:loading:1084226374002294895> Checking bot\'s response time...')
      ]
    });

    const timeDiff = interaction.createdTimestamp - Date.now();

    const editEmbed = new EmbedBuilder()
      .setColor('#2C2F33')
      .setTitle('Pong!')
      .setDescription(`Bot's response time: ${timeDiff}ms (API Latency: ${Math.round(interaction.client.ws.ping)}ms)`);

    await interaction.editReply({
      ephemeral: true,
      embeds: [editEmbed]
    });
  },
};