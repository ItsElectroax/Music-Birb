/**const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("music-beta")
        .setDescription("Complete music system. (BROKEN, sorry)")
        .addSubcommand(subcommand =>
            subcommand.setName("play")
                .setDescription("Play a song.")
                .addStringOption(option =>
                    option.setName("query")
                        .setDescription("Provide the name or url of the song.")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("volume")
                .setDescription("Adjust the song volume.")
                .addIntegerOption(option =>
                    option.setName("percentage")
                        .setDescription("Input the number (10 = 10%).")
                        .setRequired(true)
                        .setMinValue(0)
                        .setMaxValue(100)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("settings")
                .setDescription("Adjust the settings.")
                .addStringOption(option =>
                    option.setName("options")
                        .setDescription("Select an option.")
                        .setRequired(true)
                        .addChoices(
                            { name: "queue", value: "queue" },
                            { name: "skip", value: "skip" },
                            { name: "pause", value: "pause" },
                            { name: "resume", value: "resume" },
                            { name: "stop", value: "stop" },
                        )
                )
        ),
        async execute(interaction, client){
            const { options, member, guild, channel } = interaction;

            const subcommand = options.getSubcommand();
            const query = options.getString("query");
            const volume = options.getInteger("percentage");
            const option = options.getString("options");
            const voiceChannel = member.voice.channel;

            const embed = new EmbedBuilder();

            if (!voiceChannel){
                embed.setColor("Red").setTitle("Uh, oh!").setDescription("You must be in a voice channel to execute music commands.");
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }
      
            if (!member.voice.channelId == guild.members.me.voice.channelId) {
                embed.setColor("red").setTitle("Uh, oh!").setDescription(`The music has already been reproduced in <#${guild.member.me.voice.channelId}>`);
                return interaction.reply({ embeds: [embed], ephemeral: true});
            }

            try {
                client.distube.setMaxListeners(50);
                switch (subcommand){
                    case "play":
                        client.distube.play(voiceChannel, query, { textChannel: channel, member: member });
                        const status = queue =>
                        `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;
                        client.distube
                        .on('playSong', (queue, song) => {
                            embed.setColor("Green").setTitle("Playing")
                            .addFields(
                                { name: 'Title', value: `[${song.name}](${song.url})`, inline: true },
                                { name: 'Author', value: `${song.uploader.name}`, inline: true },
                                { name: ' ', value: ' ' },
                                { name: 'Requested by', value: `${song.user}`, inline: true },
                                { name: 'Duration', value: `\`${song.formattedDuration}\``, inline: true },
                                { name: 'Status', value: `${status(queue)}` }
                            )
                            .setThumbnail(song.thumbnail)
                            .setFooter({ text: 'Powered by: DisTube', iconURL: 'https://i.pinimg.com/564x/1e/16/d2/1e16d2b2aa467ee7325a4ecc8e8b8d6a.jpg' });

                            const resumeButton = new ButtonBuilder()
                                .setCustomId('resume')
                                .setLabel('▶')
                                .setStyle(ButtonStyle.Primary);

                            const pauseButton = new ButtonBuilder()
                                .setCustomId('pause')
                                .setLabel('⏸')
                                .setStyle(ButtonStyle.Primary);

                            const stopButton = new ButtonBuilder()
                                .setCustomId('stop')
                                .setLabel('⏹')
                                .setStyle(ButtonStyle.Danger);

                            const skipButton = new ButtonBuilder()
                                .setCustomId('skip')
                                .setLabel('⏭')
                                .setStyle(ButtonStyle.Secondary);
                            const row = new ActionRowBuilder()
                                .addComponents(pauseButton, resumeButton, stopButton, skipButton);
                            return interaction.reply({ embeds: [embed], components: [row] });});
                            break;
                            
                            
                    case "volume":
                        client.distube.setVolume(voiceChannel, volume);
                        return interaction.reply({ content: `🔊 Volume has been set to ${volume}%` });
                    case "settings":
                        const queue = await client.distube.getQueue(voiceChannel);
                        
                        if(!queue){
                            embed.setColor("Red").setTitle("Uh, oh!").setDescription("There is no active queue.");
                            return interaction.reply({ embeds: [embed], ephemeral: true });
                        }

                        switch(option){
                            case "skip":
                                await queue.skip(voiceChannel);
                                embed.setColor("Blue").setDescription("⏩ The song has been skipped.");
                                return interaction.reply({ embeds: [embed] });
                            case "stop":
                                await queue.stop(voiceChannel);
                                embed.setColor("Red").setDescription("⏹ The queue has been stopped.");
                                return interaction.reply({ embeds: [embed] });
                            case "pause":
                                await queue.pause(voiceChannel);
                                embed.setColor("Orange").setDescription("⏸ The song has been paused.");
                                return interaction.reply({ embeds: [embed] });
                            case "resume":
                                await queue.resume(voiceChannel);
                                embed.setColor("Green").setDescription("▶ The song has been resumed.");
                                return interaction.reply({ embeds: [embed] });
                            case "queue":
                                embed.setColor("Purple").setTitle("The queue").setDescription(`${queue.songs.map(
                                    (song, id) => `\n **${id+1}.** [${song.name}](${song.url}) -\`${song.formattedDuration}\``
                                )}`)
                                return interaction.reply({ embeds: [embed] });
                        }
                    }
            } catch (err) {
                console.log(err);

                embed.setColor("Red").setTitle("Uh, oh!").setDescription("`🔴 | Something went wrong... Try again later.`");

                return interaction.reply({ embeds: [embed], ephemeral: true });

            }
        }
};

module.exports.buttonInteractionListener = async (interaction, client) => {
    if (!interaction.isButton()) return;

    const voiceChannel = interaction.member.voice.channel;
    const queue = client.distube.getQueue(voiceChannel);

    if (!queue) return;

    switch (interaction.customId) {
        case 'pause':
          if (interaction.member.user.id === queue.songs[0].user.id) {
            await queue.pause();
            interaction.update({ components: [getResumeButton(), getStopButton(), getSkipButton()].map(component => component.toJSON()) });
          } else {
            interaction.reply({ content: "⛔ You are not the user who requested the song.", ephemeral: true });
          }
          break;
        case 'resume':
          if (interaction.member.user.id === queue.songs[0].user.id) {
            await queue.resume();
            interaction.update({ components: [getPauseButton(), getStopButton(), getSkipButton()].map(component => component.toJSON()) });
          } else {
            interaction.reply({ content: "⛔ You are not the user who requested the song.", ephemeral: true });
          }
          break;
        case 'stop':
          if (interaction.member.user.id === queue.songs[0].user.id) {
            await queue.stop();
            interaction.reply({ content: '⏹ The queue has been stopped.', ephemeral: true });
          } else {
            interaction.reply({ content: "⛔ You are not the user who requested the song.", ephemeral: true });
          }
          break;
        case 'skip':
          if (interaction.member.user.id === queue.songs[0].user.id) {
            await queue.skip();
            interaction.reply({ content: '⏩ The song has been skipped.', ephemeral: true });
          } else {
            interaction.reply({ content: "⛔ You are not the user who requested the song.", ephemeral: true });
          }
          break;
      }
      
};

// Utility functions for button creation
function getPauseButton() {
    return new ButtonBuilder()
        .setCustomId('pause')
        .setLabel('⏸')
        .setStyle(ButtonStyle.Primary);
}

function getResumeButton() {
    return new ButtonBuilder()
        .setCustomId('resume')
        .setLabel('▶')
        .setStyle(ButtonStyle.Primary);
}

function getStopButton() {
    return new ButtonBuilder()
        .setCustomId('stop')
        .setLabel('⏹')
        .setStyle(ButtonStyle.Danger);
}

function getSkipButton() {
    return new ButtonBuilder()
        .setCustomId('skip')
        .setLabel('⏭')
        .setStyle(ButtonStyle.Secondary);
}**/