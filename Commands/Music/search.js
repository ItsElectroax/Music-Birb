const { EmbedBuilder, SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { getVoiceConnection } = require('@discordjs/voice');


module.exports = {
    data: new SlashCommandBuilder()
        .setName("search")
        .setDescription("Search a song.")
        .addStringOption(option =>
            option.setName("query")
                .setDescription("Provide the name of the song (YT or Spotify).")
                .setRequired(true)
        ),
        async execute(interaction, client){
            const { options, member, guild, channel, guildId } = interaction;

            const query = options.getString("query");
            const voiceChannel = member.voice.channel;

            const embed = new EmbedBuilder();

            const button1 = new ButtonBuilder()
                .setCustomId('one')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('1️⃣');

            const button2 = new ButtonBuilder()
                .setCustomId('two')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('2️⃣');

            const button3 = new ButtonBuilder()
                .setCustomId('three')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('3️⃣');

            const button4 = new ButtonBuilder()
                .setCustomId('four')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('4️⃣');

            const button5 = new ButtonBuilder()
                .setCustomId('five')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('5️⃣');

            const row = new ActionRowBuilder()
            .addComponents(button1, button2, button3, button4, button5);

            if (!voiceChannel){
                embed.setColor("Red").setTitle("Uh, oh!").setDescription("You must be in a voice channel to execute music commands.");
                return interaction.reply({ embeds: [embed], ephemeral: true });
            };
      
            if (voiceChannel.id !== guild.members.me.voice.channelId) {
                embed.setColor("Red").setTitle("Uh, oh!").setDescription(`The music has already been reproduced in <#${guild.members.me.voice.channelId}>`);
                return interaction.reply({ embeds: [embed], ephemeral: true});
            };

            try {
                embed.setTitle(':mag:・Searching...').setColor('Blue');
                
                let reply = await interaction.reply({ embeds: [embed]});

                const result = await client.distube.search(query);

                embed.setColor("Aqua").setTitle(':mag:・Search results').setDescription(`Click a button corresponding to the song name...\n\n
                    **[1]**┆[${result[0].name}](${result[0].url})\n
                    **[2]**┆[${result[1].name}](${result[1].url})\n
                    **[3]**┆[${result[2].name}](${result[2].url})\n
                    **[4]**┆[${result[3].name}](${result[3].url})\n
                    **[5]**┆[${result[4].name}](${result[4].url})`)

                let num = 0
                const filter = (i) => i.user.id === interaction.user.id;

                reply = await interaction.editReply({ embeds: [embed], components: [row]});

                const collector = reply.createMessageComponentCollector({ filter });
                let a = false;

                setTimeout(() => {
                    if(a == false){
                    row.components.forEach((button) => {
                      button.setDisabled(true);
                    });
                    interaction.editReply({ components: [row] });}
                  }, 60000);
        
                try {
                    await collector.on('collect', async (buttonInteraction) => {
                        if (buttonInteraction.customId === 'one') {
                            num = 0
                            await client.distube.play(voiceChannel, result[num].url, { textChannel: channel, member: member });
                            await interaction.deleteReply()
                        } else if (buttonInteraction.customId === 'two') {
                            num = 1
                            await client.distube.play(voiceChannel, result[num].url, { textChannel: channel, member: member });
                            await interaction.deleteReply()
                        } else if (buttonInteraction.customId === 'three') {
                            num = 2
                            await client.distube.play(voiceChannel, result[num].url, { textChannel: channel, member: member });
                            await interaction.deleteReply()
                        } else if (buttonInteraction.customId === 'four') {
                            num = 3
                            await client.distube.play(voiceChannel, result[num].url, { textChannel: channel, member: member });
                            await interaction.deleteReply()
                        } else if (buttonInteraction.customId === 'five') {
                            num = 4
                            await client.distube.play(voiceChannel, result[num].url, { textChannel: channel, member: member });
                            await interaction.deleteReply()
                        }
                        a=true
                    });
                } catch (err) {
                    console.log(err);
                }

                } catch (err) {
                    console.log(err);

                    embed.setColor("Red").setTitle("Uh, oh!").setDescription("`🔴 | Something went wrong... Try again later.`");

                    return interaction.reply({ embeds: [embed], ephemeral: true });

            }
        }
}
