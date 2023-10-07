const { PermissionFlagsBits, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
data: new SlashCommandBuilder()
  .setName('clear')
  .setDescription('Clears a specific amount of messages from a target.')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .addIntegerOption(option => option
    .setName('amount')
    .setDescription('Amount of messages to clear.')
    .setRequired(true)
    .setMinValue(1)
    .setMaxValue(99)
    
  )
  .addUserOption(option => option
    .setName('target')
    .setDescription('Select a target to clear their messages.')
    .setRequired(false)
  ),

  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');

    const { channel, member } = interaction;

    const target = interaction.options.getUser('target');
    const messages = await channel.messages.fetch({ limit: amount });
    const filtered = messages.filter(msg => !target || msg.author.id === target.id);

    channel.bulkDelete(filtered, true)
      .then(deletedMessages => {
        const res = new EmbedBuilder()
          .setColor(0x5fb041)
          .setDescription(`Successfully cleared ${deletedMessages.size} messages ${target ? `from ${target}` : 'from the channel'}.`);
        interaction.reply({ embeds: [res], ephemeral: true });
      })
      .catch(error => {
        console.error(error);
        const err = new EmbedBuilder()
          .setTitle('An error occurred')
          .setColor('#E74C3C')
          .setDescription('An error occurred while trying to clear messages. Please try again later.');
        interaction.reply({ embeds: [err], ephemeral: true });
      });
  },
};