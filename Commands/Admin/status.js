const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('status')
    .setDescription("Changes the bot's status.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option =>
      option
        .setName('status')
        .setDescription('The new status to set.')
        .setRequired(true)
        .addChoices(
            {name: 'Online', value: 'online'},
            {name: 'Idle', value: 'idle'},
            {name: 'Under maintenance', value: 'under maintenance'},
            {name: 'Offline', value: 'offline'},
        )
    ),
    async execute(interaction) {
        const { client, user } = interaction;
        const status = interaction.options.getString('status');

        let color = ''

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
