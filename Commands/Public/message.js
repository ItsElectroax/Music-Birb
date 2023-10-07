const {SlashCommandBuilder} = require('discord.js')

module.exports = {
data: new SlashCommandBuilder()
  .setName('send-message')
  .setDescription('Sends a message to a specific channel.')
  .addChannelOption(option =>
    option
      .setName('channel')
      .setDescription('Channel to send a message to.')
      .setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName('message')
      .setDescription('The message to be sent.')
      .setRequired(true)
  ),

    execute(interaction) {
        const channel = interaction.options.getChannel("channel");
        const message = interaction.options.getString("message");

        channel.send(message);
        interaction.reply({ content: "Message sent!", ephemeral: true });
    }
}