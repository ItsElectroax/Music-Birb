const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { DisTubeVoice, DisTubeVoiceManager } = require("distube");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play a song.")
        .addStringOption(option =>
            option.setName("query")
                .setDescription("Provide the name or url of the song (YT or Spotify).")
                .setRequired(true)
        ),
        async execute(interaction, client, message){
            const { options, member, guild, channel, guildId } = interaction;
            const embed = new EmbedBuilder();
            if(channel!==null){

            const query = options.getString("query");
            const voiceChannel = member.voice.channel;

            if (!voiceChannel){
                embed.setColor("Red").setTitle("Uh, oh!").setDescription("You must be in a voice channel to execute music commands.");
                return interaction.reply({ embeds: [embed], ephemeral: true });
            };
      
            if (voiceChannel.id !== guild.members.me.voice.channelId && guild.members.me.voice.channelId !== null) {
                embed.setColor("Red").setTitle("Uh, oh!").setDescription(`The music has already been reproduced in <#${guild.members.me.voice.channelId}>`);
                return interaction.reply({ embeds: [embed], ephemeral: true});
            };

            try {
/*                const voicemanager = new DisTubeVoiceManager(client.distube);
                const distubevoice = new DisTubeVoice(voicemanager, voiceChannel);*/

                client.distube.play(voiceChannel, query, { textChannel: channel, member: member });
/*                setTimeout(() => {
                    distubevoice.setSelfDeaf(false);
                }, 500)*/

                await interaction.reply({ content: ":notes: Song fetched!", ephemeral: true });

                } catch (err) {
                    console.log(err);

                    embed.setColor("Red").setTitle("Uh, oh!").setDescription("`🔴 | Something went wrong... Try again later.`");

                    return interaction.reply({ embeds: [embed], ephemeral: true });

            }
        }else{interaction.reply({embeds: [embed.setColor("Red").setTitle("Uh, oh!").setDescription("`🔴 | This command is not able to operate in the DMs`")], ephemeral: true});}}
};