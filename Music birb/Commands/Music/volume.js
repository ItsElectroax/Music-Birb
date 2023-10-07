const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji } = require("discord.js");
const client = require("../../index");
const {ffmpeg} = require('ffmpeg-static')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("volume")
        .setDescription("Adjust the song volume.")
        .addIntegerOption(option =>
            option.setName("percentage")
                .setDescription("Input the number (10 = 10%).")
                .setRequired(true)
                .setMinValue(0)
                .setMaxValue(200)
        ),

        async execute(interaction, client){
            const { options, member, guild } = interaction;
            
            const volume = options.getInteger("percentage");
            const voiceChannel = member.voice.channel;

            const embed = new EmbedBuilder();

            if (!voiceChannel){
                embed.setColor("Red").setTitle("Uh, oh!").setDescription("You must be in a voice channel to execute music commands.");
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }
      
            if (!member.voice.channelId == guild.members.me.voice.channelId) {
                embed.setColor("Red").setTitle("Uh, oh!").setDescription(`The music has already been reproduced in <#${guild.member.me.voice.channelId}>`);
                return interaction.reply({ embeds: [embed], ephemeral: true});
            };

            try {
                client.distube.setVolume(voiceChannel, volume);
                embed.setColor("White").setDescription(`:loudspeaker: Volume has been set to ${volume}%`)
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