const client = require("../../index.js");
const { EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js");

const getTimeDiff = (song) => {
  const songDurationParts = song.formattedDuration.split(':');
  
  let songHours = 0;
  let songMinutes = parseInt(songDurationParts[0]);
  let songSeconds = parseInt(songDurationParts[1]);
  
  if (songDurationParts.length === 3) {
    songHours = parseInt(songDurationParts[0]);
    songMinutes = parseInt(songDurationParts[1]);
    songSeconds = parseInt(songDurationParts[2]);
  }
  
  const currentTime = new Date();
  const currentTimeHours = currentTime.getHours();
  const currentTimeMinutes = currentTime.getMinutes();

  let hoursDiff = currentTimeHours + songHours;
  let minutesDiff = currentTimeMinutes + songMinutes;

  // Adjust hours and minutes if necessary
  if (minutesDiff >= 60) {
    hoursDiff++;
    minutesDiff -= 60;
  }
  if (hoursDiff >= 24) {
    hoursDiff -= 24;
  }

  // Add leading zero for single-digit numbers
  const formattedHours = hoursDiff.toString().padStart(2, '0');
  const formattedMinutes = minutesDiff.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
};  

const status = (queue) =>
`Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;

client.distube.on('playSong', (queue, song) =>
        queue.textChannel.send({
            embeds: [
            new EmbedBuilder()
                .setColor("Green")
                .setTitle(":headphones:・Playing")
                .addFields(
                    { name: 'Title', value: `[${song.name}](${song.url})`, inline: true },
                    { name: 'Author', value: `[${song.uploader.name}](${song.uploader.url})`, inline: true },
                    { name: ' ', value: ' ' },
                    { name: 'Requested by', value: `${song.user}`, inline: true },
                    { name: 'Duration', value: `\`${song.formattedDuration} (${getTimeDiff(song)})\``, inline: true },
                    { name: 'Status', value: `${status(queue)}` },
                    { name: 'Info', value: `Views: \`${song.views}\` :eye: | Likes: \`${song.likes}\` :thumbsup:` },
                )
                .setThumbnail(song.thumbnail)
            ], flags: [ 4096 ],

            components: [
                new ActionRowBuilder()
                    .addComponents(
                    new ButtonBuilder()
                        .setCustomId('rewind')
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('⏪'),
            
                    new ButtonBuilder()
                        .setCustomId('pause')
                        .setStyle(ButtonStyle.Success)
                        .setEmoji('⏸️'),
                    
                    new ButtonBuilder()
                        .setCustomId('skip')
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('⏩'),
            
                    new ButtonBuilder()
                        .setCustomId('stop')
                        .setStyle(ButtonStyle.Danger)
                        .setEmoji('⏹️'),
            
                    new ButtonBuilder()
                        .setCustomId('loopSong')
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('🔂'),

                    )
            ]
        }),
    )
    .on('addSong', (queue, song) =>
        queue.textChannel.send(
            {
                embeds: [new EmbedBuilder().setColor("Green")
                    .setDescription(`🎶・Added [${song.name}](${song.url}) - \`${song.formattedDuration}\` to the queue by ${song.user}`)], flags: [ 4096 ]
            }
        )
    )
    .on('addList', (queue, playlist) =>
        queue.textChannel.send(
            {
                embeds: [new EmbedBuilder().setColor("Green")
                    .setDescription(`🎶・Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)], flags: [ 4096 ]
            }
        )
    )
    .on('error', (channel, e) => {
        if (channel) channel.send(`⛔ | An error encountered: ${e.toString().slice(0, 1974)}`)
        else console.error(e)
    })
    .on('searchNoResult', (message, query) =>
        message.channel.send(
            {
                embeds: [new EmbedBuilder().setColor("Red")
                    .setDescription('`⛔ | No result found for \`${query}\`!`')], flags: [ 4096 ]
            })
    )
    .on('finish', queue => queue.textChannel.send({
        embeds: [new EmbedBuilder().setColor("Green")
            .setDescription('🏁 Queue finished!')], flags: [ 4096 ]
    }));
