/**const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji } = require("discord.js");
const client = require("../../index");
const {ffmpeg} = require('ffmpeg-static')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("music")
        .setDescription("Complete music system.")
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
                switch (subcommand){
                    case "play":
                        client.distube.play(voiceChannel, query, { textChannel: channel, member: member, ffmpegArgs: [
                            '-reconnect', '1',
                            '-reconnect_streamed', '1',
                            '-reconnect_delay_max', '5',
                            '-i', 'input',
                            '-codec:v', 'libx264',
                            '-profile:v', 'main',
                            '-preset', 'slow',
                            '-b:v', '96k', // Video bitrate: 96kbps
                            '-vf', 'scale=720:trunc(ow/a/2)*2',
                            '-threads', '0',
                            '-codec:a', 'libfdk_aac',
                            '-b:a', '96k', // Audio bitrate: 96kbps
                            '-movflags', '+faststart',
                            'output'
                          ]
                        });
                        return interaction.reply({ content: "🎶 Song fetched!", ephemeral: true});
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
}**/