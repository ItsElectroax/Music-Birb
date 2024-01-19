const client = require('../../index');
const { EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const {author} = require("../../package.json");
const ms = require("ms-prettify").default;
const previousbuttonCommand = require('../../Buttons/previous');
const pausebuttonCommand = require('../../Buttons/pause');
const resumebuttonCommand = require('../../Buttons/resume');
const skipbuttonCommand = require('../../Buttons/skip');
const stopbuttonCommand = require('../../Buttons/stop');
const loopqueueCommand = require('../../Buttons/repeat_queue');
const loopsongCommand = require('../../Buttons/repeat_song');
const loopoffCommand = require('../../Buttons/repeat_off');

const votedMembers = new Set();

client.on('interactionCreate', async (buttonInteraction) => {
    if (buttonInteraction.isButton()){


        const button1 = new ButtonBuilder()
        .setCustomId('rewind')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('⏪');

    const button2 = new ButtonBuilder()
        .setCustomId('pause')
        .setStyle(ButtonStyle.Success)
        .setEmoji('⏸️');

    const button3 = new ButtonBuilder()
        .setCustomId('resume')
        .setStyle(ButtonStyle.Success)
        .setEmoji('▶️');

    const button4 = new ButtonBuilder()
        .setCustomId('skip')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('⏩');

    const button5 = new ButtonBuilder()
        .setCustomId('stop')
        .setStyle(ButtonStyle.Danger)
        .setEmoji('⏹️');

    const button6 = new ButtonBuilder()
        .setCustomId('loopSong')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('🔂');
    
    const button7 = new ButtonBuilder()	
        .setCustomId('loopQueue')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('🔁');
        
    const button8 = new ButtonBuilder()
        .setCustomId('loopOff')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('🚫');



        const message = buttonInteraction.message;
        const row = buttonInteraction.message.components[0];
        let k = 0;
        let perc_up = 0
        let new_up = 0
        let new_down = 0
        function up_down(diff){
            let ud_emoji = "";
            if (diff > 0){
                for (let i = 0; i < diff && i<10; i++){
                    ud_emoji = ud_emoji + "<:sharp_green_square:1197154647031435294>"
                }
                for (let j = 0; j < 10-diff && j<10; j++){
                    ud_emoji = ud_emoji + "<:sharp_white_square:1197155001290735638>"
                }
            } else if (diff < 0){
                diff = -diff;
                for (let i = 0; i<diff && i<10; i++){
                    ud_emoji = ud_emoji + "<:sharp_red_square:1197155257776615444>"
                }
                for (let j = 0; j < 10-diff && j<10; j++){
                    ud_emoji = ud_emoji + "<:sharp_white_square:1197155001290735638>"
                }
            } else if (diff === 0){
                ud_emoji = ud_emoji + "<:sharp_white_square:1197155001290735638>" + "<:sharp_white_square:1197155001290735638>" + "<:sharp_white_square:1197155001290735638>" + "<:sharp_white_square:1197155001290735638>" + "<:sharp_white_square:1197155001290735638>" + "<:sharp_white_square:1197155001290735638>" + "<:sharp_white_square:1197155001290735638>" + "<:sharp_white_square:1197155001290735638>" + "<:sharp_white_square:1197155001290735638>" + "<:sharp_white_square:1197155001290735638>"
            }
            return ud_emoji;
        }
    
        function percent(new_up, new_down){
            let emoji = "";
            for (let i = 0; i < new_up && i<10; i++){
                emoji = emoji + "<:sharp_green_square:1197154647031435294>"
            }
            for (let j = 0; j < new_down && j<10; j++){
                emoji = emoji + "<:sharp_red_square:1197155257776615444>"
            }
            if (new_up === 0 && new_down === 0){
                emoji = emoji + "<:sharp_white_square:1197155001290735638>" + "<:sharp_white_square:1197155001290735638>" + "<:sharp_white_square:1197155001290735638>" + "<:sharp_white_square:1197155001290735638>" + "<:sharp_white_square:1197155001290735638>" + "<:sharp_white_square:1197155001290735638>" + "<:sharp_white_square:1197155001290735638>" + "<:sharp_white_square:1197155001290735638>" + "<:sharp_white_square:1197155001290735638>" + "<:sharp_white_square:1197155001290735638>"
            }
            return emoji;
        };
    if (buttonInteraction.customId === 'up') {
        const description = buttonInteraction.message.embeds[0].data.description;
        let up_progress = parseInt(buttonInteraction.message.embeds[0].data.fields[2].value);
        let down_progress = parseInt(buttonInteraction.message.embeds[0].data.fields[3].value);
        let timeout_embed = new EmbedBuilder()

        if (votedMembers.has(`${buttonInteraction.user.id}-${message.id}`) /*&& buttonInteraction.user.id !== author*/) return buttonInteraction.reply({embeds: [timeout_embed.setColor("#E74C3C").setTitle("Uh, oh!").setDescription(`Looks like you've already voted!`)], ephemeral: true});

        up_progress ++;

        if (up_progress + down_progress !== 0) k = 10/(up_progress+down_progress), perc_up = Math.round(up_progress/(up_progress+down_progress)*100), new_up = Math.round(k*up_progress), new_down = 10-new_up;
        else k = 0, perc_up = 0, new_up = 0, new_down = 0;
        let diff = up_progress-down_progress;
        
        message.edit({embeds: [embed = new EmbedBuilder()
            .setTitle("Cast your vote!")
            .setColor("DarkOrange")
            .setDescription(description)
            .addFields(
                {
                name: "Up/down Progress:",
                value: `${up_down(diff)} ${diff}`
                },
                {
                name: "Percentage Progress:",
                value: `${percent(new_up, new_down)} ${perc_up}%`
                },
                {
                    name: "Upvotes:",
                    value: `${up_progress}`,
                    inline: true,
                },
                {
                    name: "Downvotes:",
                    value: `${down_progress}`,
                    inline: true
                },
            )]})

        await buttonInteraction.reply({content: "Thank you for your contribution.", ephemeral: true});
        votedMembers.add(`${buttonInteraction.user.id}-${message.id}`);
    } else if (buttonInteraction.customId === 'down') {
        const description = buttonInteraction.message.embeds[0].data.description;
        const up_progress = parseInt(buttonInteraction.message.embeds[0].data.fields[2].value);
        const down_progress = parseInt(buttonInteraction.message.embeds[0].data.fields[3].value);
        let timeout_embed = new EmbedBuilder()

        if (votedMembers.has(`${buttonInteraction.user.id}-${message.id}`) /*&& buttonInteraction.user.id !== author*/) return buttonInteraction.reply({embeds: [timeout_embed.setColor("#E74C3C").setTitle("Uh, oh!").setDescription(`Looks like you've already voted!`)], ephemeral: true});

        down_progress ++;

        if (up_progress + down_progress !== 0) k = 10/(up_progress+down_progress), perc_up = Math.round(up_progress/(up_progress+down_progress)*100), new_up = Math.round(k*up_progress), new_down = 10-new_up;
        else k = 0, perc_up = 0, new_up = 0, new_down = 0;
        let diff = up_progress-down_progress;

        message.edit({embeds: [embed = new EmbedBuilder()
            .setTitle("Cast your vote!")
            .setColor("DarkOrange")
            .setDescription(description)
            .addFields(
                {
                name: "Up/down Progress:",
                value: `${up_down(diff)} ${diff}`
                },
                {
                name: "Percentage Progress:",
                value: `${percent(new_up, new_down)} ${perc_up}%`
                },
                {
                    name: "Upvotes:",
                    value: `${up_progress}`,
                    inline: true,
                },
                {
                    name: "Downvotes:",
                    value: `${down_progress}`,
                    inline: true
                },
            )]})

        await buttonInteraction.reply({content: "Thank you for your contribution.", ephemeral: true});
        votedMembers.add(`${buttonInteraction.user.id}-${message.id}`);
    } else if (buttonInteraction.customId === 'rewind') {
        await previousbuttonCommand.execute(buttonInteraction, buttonInteraction.client);
    } else if (buttonInteraction.customId === 'pause') {
        await pausebuttonCommand.execute(buttonInteraction, buttonInteraction.client);
        row.components.splice(1, 1, button3);
        await message.edit({ components: [row] });
    } else if (buttonInteraction.customId === 'resume') {
        await resumebuttonCommand.execute(buttonInteraction, buttonInteraction.client);
        row.components.splice(1, 1, button2);
        await message.edit({ components: [row] });
    } else if (buttonInteraction.customId === 'skip') {
        await skipbuttonCommand.execute(buttonInteraction, buttonInteraction.client);
    } else if (buttonInteraction.customId === 'stop') {
        await stopbuttonCommand.execute(buttonInteraction, buttonInteraction.client);
    } else if (buttonInteraction.customId === 'loopSong') {
        await loopsongCommand.execute(buttonInteraction, buttonInteraction.client);
        row.components.splice(4, 1, button7);
        await message.edit({ components: [row] });
    } else if (buttonInteraction.customId === 'loopQueue') {
        await loopqueueCommand.execute(buttonInteraction, buttonInteraction.client);
        row.components.splice(4, 1, button8);
        await message.edit({ components: [row] });
    } else if (buttonInteraction.customId === 'loopOff') {
        await loopoffCommand.execute(buttonInteraction, buttonInteraction.client);
        row.components.splice(4, 1, button6);
        await message.edit({ components: [row] });
    }

}
})