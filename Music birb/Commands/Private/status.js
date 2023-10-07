const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { author } = require('../../package-lock.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('status')
    .setDescription("Changes the bot's status.")
    .addStringOption(option =>
      option
        .setName('status')
        .setDescription('The new status to set.')
        .setRequired(true)
        .addChoices(
            {name: 'Online', value: 'online'},
            {name: 'Idle', value: 'idle'},
            {name: 'Under maintenance', value: 'under maintenance'},
            {name: 'Offline', value: 'Offline'},
        )
    ),
    async execute(interaction) {
        const { client, user } = interaction;
        const allowedUsername = author;

        // Check if the user executing the command is the specific username you want to allow
        if (user.id !== allowedUsername) {
            const error = new EmbedBuilder()
            .setTitle('Uh, oh!')
            .setColor('#E74C3C')
            .setDescription('You are not authorised to use this command!')
          return interaction.reply({ embeds: [error], ephemeral: true });
        }

        const status = interaction.options.getString('status');

        if (status === 'online') {
            color = "#1F8B4C";
            client.user.setStatus("online");
        } else if (status === 'idle') {
            color = "#F1C40F";
            client.user.setStatus("idle");
        } else if (status === 'under maintenance') {
            client.user.setStatus('dnd');
            color = "#FF0000";
        } else if (status === 'offline') {
            client.user.setStatus('invisible');
            color = "#2C3E50"
        }

        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle('Status Change')
            .setDescription(`Multi's status has been set to "${status}".`);

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};