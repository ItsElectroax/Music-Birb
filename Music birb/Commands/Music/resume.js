const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji } = require("discord.js");
const client = require("../../index");
const {ffmpeg} = require('ffmpeg-static')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resumes the queue."),

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
                await queue.resume(voiceChannel);
                embed.setColor("Green").setDescription(":arrow_forward: The song has been resumed.");
                interaction.reply({ embeds: [embed] });
                setTimeout(()=> {
                    interaction.deleteReply();
                }, 5000)
                } catch (err) {
                    console.log(err);

                    embed.setColor("Red").setTitle("Uh, oh!").setDescription("`🔴 | Something went wrong... Try again later.`");

                    return interaction.reply({ embeds: [embed], ephemeral: true });

                }
        }
}