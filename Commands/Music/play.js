const { EmbedBuilder, SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { getVoiceConnection } = require('@discordjs/voice');
const playerCommand = require('./player');
const client = require("../../index");
const { closeSync } = require("fs");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play a song.")
        .addStringOption(option =>
            option.setName("query")
                .setDescription("Provide the name or url of the song (YT or Spotify).")
                .setRequired(true)
        ),
        async execute(interaction, client){
            const { options, member, guild, channel, guildId } = interaction;

            const query = options.getString("query");
            const voiceChannel = member.voice.channel;
            const connection = getVoiceConnection(guildId);

            const embed = new EmbedBuilder();

            if (!voiceChannel){
                embed.setColor("Red").setTitle("Uh, oh!").setDescription("You must be in a voice channel to execute music commands.");
                return interaction.reply({ embeds: [embed], ephemeral: true });
            };
      
            if (!voiceChannel == guild.members.me.voice.channelId) {
                embed.setColor("red").setTitle("Uh, oh!").setDescription(`The music has already been reproduced in <#${guild.member.me.voice.channelId}>`);
                return interaction.reply({ embeds: [embed], ephemeral: true});
            };

            try {
                client.distube.play(voiceChannel, query, { textChannel: channel, member: member });

                interaction.reply({ content: ":notes: Song fetched!", ephemeral: true });

                } catch (err) {
                    console.log(err);

                    embed.setColor("Red").setTitle("Uh, oh!").setDescription("`🔴 | Something went wrong... Try again later.`");

                    return interaction.reply({ embeds: [embed], ephemeral: true });

            }
        }
}