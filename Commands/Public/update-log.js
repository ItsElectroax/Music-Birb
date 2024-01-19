const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('update-log')
    .setDescription('See the history of the Multi\'s updates!'),
    async execute(interaction){
        const v10 = new EmbedBuilder()
        .setColor('Gold')
        .setTitle(`(NEW) Update log v1.13.00`)
        .setDescription('Check out what is new in this update of Multi!')
        .addFields(
            {name: 'Bug fixes', value: '- NONE'},
            {name: 'What\s new?', value: '- `/player`command merged with the "Playing" embed!'},
            {name: 'Upcoming updates', value: '- `/rewind`, `/fast-forward`, `/seek` and `/playlist` commands coming to music!'}
        )
        .setFooter({text: '17/01/2024'})
        const v9 = new EmbedBuilder()
        .setColor('Gold')
        .setTitle(`Update log v1.12.00`)
        .setDescription('Check out what is new in this update of Multi!')
        .addFields(
            {name: 'Bug fixes', value: '- NONE'},
            {name: 'What\s new?', value: '- `/shuffle` command added to music!'},
            {name: 'Upcoming updates', value: '- `/rewind`, `/fast-forward`, `/seek` and `/playlist` commands coming to music!'}
        )
        .setFooter({text: '13/01/2024'})
        const v8 = new EmbedBuilder()
        .setColor('Gold')
        .setTitle(`Update log v1.11.01`)
        .setDescription('Check out what is new in this update of Multi!')
        .addFields(
            {name: 'Bug fixes', value: '- The bot will no longer leave the current VC to join the other one (This was supposed to be an initial feature, but it never worked)'},
            {name: 'What\s new?', value: '- NONE'},
            {name: 'Upcoming updates', value: '- `/rewind` and `/fast-forward` commands coming to music!'}
        )
        .setFooter({text: '16/10/2023'})
        const v7 = new EmbedBuilder()
        .setColor('Gold')
        .setTitle(`Update log v1.11.00`)
        .setDescription('Check out what is new in this update of Multi!')
        .addFields(
            {name: 'Bug fixes', value: '- `/player` has been fixed!'},
            {name: 'What\s new?', value: '- `/search` command added to music!'},
            {name: 'Upcoming updates', value: '- `/rewind` and `/fast-forward` commands coming to music!'}
        )
        .setFooter({text: '06/10/2023'})
        const v6 = new EmbedBuilder()
        .setColor('Gold')
        .setTitle(`Update log v1.10.11`)
        .setDescription('Check out what is new in this update of Multi!')
        .addFields(
            {name: 'Bug fixes', value: '- NONE'},
            {name: 'What\s new?', value: '- Slight music command convenience changes... nothing crazy.'},
            {name: 'Upcoming updates', value: '- `/player` will get fixed\n- `/rewind` and `/fast-forward` commands coming to music!'}
        )
        .setFooter({text: '29/09/2023'})
        const v4 = new EmbedBuilder()
        .setColor('Gold')
        .setTitle(`Update log v1.10.00`)
        .setDescription('Check out what is new in this update of Multi!')
        .addFields(
            {name: 'Bug fixes', value: '- `/player` command partially fixed, expect more updates!'},
            {name: 'What\s new?', value: '- `/autoplay` command added to music!\n- Dynamic loop and pause/resume controls added to `/player`!'},
            {name: 'Upcoming updates', value: '-NONE'}
        )
        .setFooter({text: '10/08/2023'})
        const v3 = new EmbedBuilder()
        .setColor('Gold')
        .setTitle(`Update log v1.9.00`)
        .setDescription('Check out what is new in this update of Multi!')
        .addFields(
            {name: 'Bug fixes', value: '- NONE'},
            {name: 'What\s new?', value: '- Buttons added to music (BETA)!'},
            {name: 'Upcoming updates', value: '- NONE'}
        )
        .setFooter({text: '08/08/2023'})
        const v2 = new EmbedBuilder()
            .setColor('Gold')
            .setTitle('Update log v1.8.00')
            .setDescription('Check out what is new in this update of Multi!')
            .addFields(
                {name: 'Bug fixes', value: '- Live updates from `/info` command has been optimized.'},
                {name: 'What\s new?', value: '- `/previous` command added to music!\n- `/update-log` command has been divided into two parts: `/update-log` and `/new-update`'},
                {name: 'Upcoming updates', value: '- Buttons coming to music (beta)!'}
            )
            .setFooter({text: '08/08/2023'})
        const v1 = new EmbedBuilder()
            .setColor('Gold')
            .setTitle(`Update log v1.7.30`)
            .setDescription('Check out what is new in this update of Multi!')
            .addFields(
                {name: 'Bug fixes', value: '- Bot does not crash on `/skip` if there are no songs left in the queue anymore.'},
                {name: 'What\'s new?', value: '- Update log is here!\n- Help menu finaly added!\n- All commands are now fully updated to SlashCommandBuilder()'},
                {name: 'Upcoming updates', value: '- Buttons coming to music (beta)!'}
            )
            .setFooter({text: '07/08/2023'})
        interaction.reply({embeds: [v9, v8, v7, v6, v4, v3, v2, v1], ephemeral: true})
    }
}
