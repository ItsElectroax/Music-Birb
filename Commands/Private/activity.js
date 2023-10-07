const { EmbedBuilder, ActivityType, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { author } = require('../../package-lock.json')
const { changeActivity, clearActivityInterval } = require('../../Events/Client/activities')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('activity')
        .setDescription("Changes the bot's activity.")
        .addStringOption(option =>
            option.setName('activity')
                .setDescription('The new activity to set.')
                .setRequired(true)
                .addChoices(
                    {name: 'Playing', value: 'playing'},
                    {name: 'Listening', value: 'listening'},
                    {name: 'Watching', value: 'watching'},
                    {name: 'Competing', value: 'competing'},
                    {name: 'Streaming', value: 'streaming'},
                    {name: 'Clear', value: 'clear'},
                    {name: 'Random', value: 'random'}
                )
        )
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Set the name of the activity')
        )
        .addStringOption(option =>
            option.setName('url')
                .setDescription('Set the URL of the streaming activity (YT/Twitch)')
        ),
    async execute(interaction) {
        const { client, user } = interaction;

        const activity = interaction.options.getString('activity');
        let name = interaction.options.getString('name');
        const url = interaction.options.getString('url');

        let color = '';
        clearActivityInterval(client);

        if (name === null){
            name = "empty";
        };

        if (activity === 'playing') {
            color = '#3498DB';
            client.user.setActivity({ name, type: ActivityType.Playing });
        } else if (activity === 'streaming') {
            if (!url) {
                const error = new EmbedBuilder()
                    .setTitle('Uh, oh!')
                    .setColor('#E74C3C')
                    .setDescription('URL is required for the "streaming" activity!')
                return interaction.reply({ embeds: [error], ephemeral: true });
            }
            color = '#3498DB';
            client.user.setActivity({ name, type: ActivityType.Streaming, url });
        } else if (activity === 'listening') {
            color = '#3498DB';
            client.user.setActivity({ name, type: ActivityType.Listening });
        } else if (activity === 'watching') {
            color = '#3498DB';
            client.user.setActivity({ name, type: ActivityType.Watching });
        } else if (activity === 'competing') {
            color = '#3498DB';
            client.user.setActivity({ name, type: ActivityType.Competing });
        } else if (activity === 'clear') {
            color = '#3498DB';
            client.user.setActivity('');
        } else if (activity === 'random') {
            changeActivity(client);
            color = '#3498DB';
        }

        const embed = new EmbedBuilder()
            .setColor(color)
            .setTitle('Activity Change')
            .setDescription(`Multi's status has been set to "${activity}".`);

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
