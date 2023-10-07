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
            {name: 'Bug fixes', value: '- `/player` has been fixed!'},
            {name: 'What\s new?', value: '- `/search` command added to music!'},
            {name: 'Upcoming updates', value: '- Moderation tools Coming Soon™!\n- `/rewind` and `/fast-forward` commands coming to music!'}
        )
        .setFooter({text: '06/10/2023'})
        interaction.reply({embeds: [embed]})
    }
}
