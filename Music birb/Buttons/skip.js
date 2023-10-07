const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji } = require("discord.js");
const client = require("../index");
const {ffmpeg} = require('ffmpeg-static')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skipbutton")
        .setDescription("Skip the current song."),

        async execute(interaction, client){
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
                await queue.skip(voiceChannel);
                embed.setColor("Blue").setDescription(":fast_forward: The song has been skipped.");
                await interaction.reply({ embeds: [embed], ephemeral: true });
                setTimeout(()=> {
                    interaction.deleteReply();
                }, 1500) 
            } catch (err) {
                err;

                embed.setColor("Red").setTitle("Uh, oh!").setDescription("`🔴 | Something went wrong... Try again later.`");

                return interaction.reply({ embeds: [embed], ephemeral: true });

            }
        }
}