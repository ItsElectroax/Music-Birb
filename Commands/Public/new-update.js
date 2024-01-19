const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const {version, name} = require('../../package.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('new-update')
    .setDescription(`See what is new in the ${name}\'s service!`),
    async execute(interaction){
        const embed = new EmbedBuilder()
        .setColor('Gold')
        .setTitle(`(NEW) Update log v${version}`)
        .setDescription(`Check out what is new in this update of ${name}!`)
        .addFields(
            {name: 'Bug fixes', value: '- NONE'},
            {name: 'What\s new?', value: '- `/player`command merged with the "Playing" embed!'},
            {name: 'Upcoming updates', value: '- Moderation tools Coming Soon™!\n- `/rewind`, `/fast-forward`, `/seek` and `/playlist` commands coming to music!'}
        )
        .setFooter({text: '17/01/2024'})
        interaction.reply({embeds: [embed]})
    }
}
