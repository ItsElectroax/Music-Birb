const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('update-log')
    .setDescription('See the history of the Multi\'s updates!'),
    async execute(interaction){
        const v7 = new EmbedBuilder()
        .setColor('Gold')
        .setTitle(`(NEW) Update log v1.8.3`)
        .setDescription('Check out what is new in this update of Multi!')
        .addFields(
            {name: 'Bug fixes', value: '- `/player` has been fixed!'},
            {name: 'What\s new?', value: '- `/search` command added to music!'},
            {name: 'Upcoming updates', value: '- `/rewind` and `/fast-forward` commands coming to music!'}
        )
        .setFooter({text: '06/10/2023'})
        const v6 = new EmbedBuilder()
        .setColor('Gold')
        .setTitle(`Update log v1.8.21`)
        .setDescription('Check out what is new in this update of Multi!')
        .addFields(
            {name: 'Bug fixes', value: '- NONE'},
            {name: 'What\s new?', value: '- Slight music command convenience changes... nothing crazy.'},
            {name: 'Upcoming updates', value: '- `/player` will get fixed\n- `/rewind` and `/fast-forward` commands coming to music!'}
        )
        .setFooter({text: '29/09/2023'})
        const v5 = new EmbedBuilder()
        .setColor('Gold')
        .setTitle(`Update log v1.8.20`)
        .setDescription('Check out what is new in this update of Multi!')
        .addFields(
            {name: 'Bug fixes', value: '- NONE'},
            {name: 'What\s new?', value: '- NONE'},
            {name: 'Upcoming updates', value: '- `/player` will get fixed\n- `/rewind` and `/fast-forward` commands coming to music!'}
        )
        .setFooter({text: '21/08/2023'})
        const v4 = new EmbedBuilder()
        .setColor('Gold')
        .setTitle(`Update log v1.8.10`)
        .setDescription('Check out what is new in this update of Multi!')
        .addFields(
            {name: 'Bug fixes', value: '- `/player` command partially fixed, expect more updates!'},
            {name: 'What\s new?', value: '- Bot has been updated to discord.js v14.12.1!\n- `/autoplay` command added to music!\n- Dynamic loop and pause/resume controls added to `/player`!'},
            {name: 'Upcoming updates', value: '- NONE'}
        )
        .setFooter({text: '10/08/2023'})
        const v3 = new EmbedBuilder()
        .setColor('Gold')
        .setTitle(`Update log v1.8.0`)
        .setDescription('Check out what is new in this update of Multi!')
        .addFields(
            {name: 'Bug fixes', value: '- NONE'},
            {name: 'What\s new?', value: '- Buttons added to music (BETA)!'},
            {name: 'Upcoming updates', value: '- NONE'}
        )
        .setFooter({text: '08/08/2023'})
        const v2 = new EmbedBuilder()
            .setColor('Gold')
            .setTitle('Update log v1.7.40')
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
        interaction.reply({embeds: [v7, v6, v5, v4, v3, v2, v1], ephemeral: true})
    }
}
