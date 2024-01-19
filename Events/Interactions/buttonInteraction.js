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
