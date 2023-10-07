const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji } = require("discord.js");
const client = require("../../index");
const {ffmpeg} = require('ffmpeg-static')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Displays the song queue."),

        async execute(interaction){
            const { member, guild } = interaction;

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
                const queue = await client.distube.getQueue(voiceChannel);
                        
                if(!queue){
                    embed.setColor("Red").setTitle("Uh, oh!").setDescription("There is no active queue.");
                    return interaction.reply({ embeds: [embed], ephemeral: true });
                }
                embed.setColor("Purple").setTitle("The queue").setDescription(`${queue.songs.map((song, id) => `\n **${id+1}.** [${song.name}](${song.url}) -\`${song.formattedDuration}\``)}`)
                return interaction.reply({ embeds: [embed] });
            } catch (err) {
                console.log(err);

                embed.setColor("Red").setTitle("Uh, oh!").setDescription("`🔴 | Something went wrong... Try again later.`");

                return interaction.reply({ embeds: [embed], ephemeral: true });

            }
        }
}