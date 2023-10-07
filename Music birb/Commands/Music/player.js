const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const previousbuttonCommand = require('../../Buttons/previous');
const pausebuttonCommand = require('../../Buttons/pause');
const resumebuttonCommand = require('../../Buttons/resume');
const skipbuttonCommand = require('../../Buttons/skip');
const stopbuttonCommand = require('../../Buttons/stop');
const loopqueueCommand = require('../../Buttons/repeat_queue');
const loopsongCommand = require('../../Buttons/repeat_song');
const loopoffCommand = require('../../Buttons/repeat_off');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('player')
        .setDescription('Music player'),

    async execute(interaction, client) {
        const {member} = interaction;
        const voiceChannel = member.voice.channel;
        const queue = await client.distube.getQueue(voiceChannel);
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Music player")
        .setDescription("Use this to control the queue.");

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

        let row = new ActionRowBuilder()

        if (!queue) {
            row
            .addComponents(button1, button2, button4, button5, button6);
        } else if (queue.paused === false) {
            row
            .addComponents(button1, button2, button4, button5, button6);
        } else {
            row
            .addComponents(button1, button3, button4, button5, button6);
        }

        const reply = await interaction.reply({ embeds: [embed], components: [row] });

        const filter = (i) => i.user.id === interaction.user.id;

        const collector = reply.createMessageComponentCollector({ filter });

        setTimeout(() => {
            row.components.forEach((button) => {
              button.setDisabled(true);
            });
            interaction.editReply({ components: [row] });
          }, 60000);

        try {
            collector.on('collect', async (buttonInteraction) => {
                if (buttonInteraction.customId === 'rewind') {
                    await previousbuttonCommand.execute(buttonInteraction, interaction.client);
                } else if (buttonInteraction.customId === 'pause') {
                    await pausebuttonCommand.execute(buttonInteraction, interaction.client);
                    row.components.splice(1, 1, button3);
                    await interaction.editReply({ components: [row] });
                } else if (buttonInteraction.customId === 'resume') {
                    await resumebuttonCommand.execute(buttonInteraction, interaction.client);
                    row.components.splice(1, 1, button2);
                    await interaction.editReply({ components: [row] });
                } else if (buttonInteraction.customId === 'skip') {
                    await skipbuttonCommand.execute(buttonInteraction, interaction.client);
                } else if (buttonInteraction.customId === 'stop') {
                    await stopbuttonCommand.execute(buttonInteraction, interaction.client);
                } else if (buttonInteraction.customId === 'loopSong') {
                    await loopsongCommand.execute(buttonInteraction, interaction.client);
                    row.components.splice(4, 1, button7);
                    await interaction.editReply({ components: [row] });
                } else if (buttonInteraction.customId === 'loopQueue') {
                    await loopqueueCommand.execute(buttonInteraction, interaction.client);
                    row.components.splice(4, 1, button8);
                    await interaction.editReply({ components: [row] });
                } else if (buttonInteraction.customId === 'loopOff') {
                    await loopoffCommand.execute(buttonInteraction, interaction.client);
                    row.components.splice(4, 1, button6);
                    await interaction.editReply({ components: [row] });
                }
            });
        } catch (err) {
            console.log(err);
        }
    },
};