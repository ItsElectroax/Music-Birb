const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const {version} = require('../../package.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('new-update')
    .setDescription('See what is new in the Multi\'s service!'),
    async execute(interaction){
        const embed = new EmbedBuilder()
        .setColor('Gold')
        .setTitle(`(NEW) Update log v${version}`)
        .setDescription('Check out what is new in this update of Multi!')
        .addFields(
            {name: 'Bug fixes', value: '- The bot will no longer leave the current VC to join the other one (This was supposed to be an initial feature, but it never worked)'},
            {name: 'What\s new?', value: '- NONE'},
            {name: 'Upcoming updates', value: '- `/rewind` and `/fast-forward` commands coming to music!'}
        )
        .setFooter({text: '16/10/2023'})
        interaction.reply({embeds: [embed]})
    }
}
