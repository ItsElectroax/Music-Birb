const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { author, version: botVersion } = require('../../package-lock.json');
const djsVersion = require('discord.js').version;
const { PermissionsBitField } = require('discord.js');
const { DiscordAPIError } = require('discord.js');

function formatTime(seconds) {
  const year = Math.floor(seconds / 31536000);
  seconds -= year * 31536000;
  const month = Math.floor(seconds / 2592000);
  seconds -= month * 2592000;
  const day = Math.floor(seconds / 86400);
  seconds -= day * 86400;
  const hour = Math.floor(seconds / 3600);
  seconds -= hour * 3600;
  const minute = Math.floor(seconds / 60);
  seconds -= minute * 60;

  const yearDisplay = year > 0 ? year + (year == 1 ? " year " : " years ") : "";
  const monthDisplay = month > 0 ? month + (month == 1 ? " month " : " months ") : "";
  const dayDisplay = day > 0 ? day + (day == 1 ? " day " : " days ") : "";
  const hourDisplay = hour > 0 ? hour + (hour == 1 ? " hour " : " hours ") : "";
  const minuteDisplay = minute > 0 ? minute + (minute == 1 ? " minute " : " minutes ") : "";
  const secondDisplay = seconds > 0 ? seconds + (seconds == 1 ? " second" : " seconds") : "";

  return `${yearDisplay}${monthDisplay}${dayDisplay}${hourDisplay}${minuteDisplay}${secondDisplay}`;
}

module.exports = {
    data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Displays information about the bot.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  execute(interaction) {
      const {
          client,
          user,
          member
      } = interaction;
      const allowedUsername = author;

      // Check if user is an administrator

          let color = "";
          if (interaction.client.user.presence.status === "online") {
              color = "#1F8B4C";
              status1 = "online <:online:1084230486949380167>";
          } else if (interaction.client.user.presence.status === "idle") {
              color = "#F1C40F";
              status1 = "idle <:idle:1084230484768342056>";
          } else if (interaction.client.user.presence.status === "dnd") {
              color = "#FF0000";
              status1 = "under maintenance <:dnd:1084230482838958161>";
          } else if (interaction.client.user.presence.status === "invisible") {
              color = "#2C3E50";
              status1 = "offline <:invisible:1084230480494342254>";
          }

          const infoEmbed = new EmbedBuilder()
              .setColor(color)
              .setTitle("<a:loading:1084226374002294895>   Multi's status...")
              .setDescription(`Multi is ${status1}`)
              .addFields({
                  name: "Developer",
                  value: `<@${author}>`
              }, {
                  name: "Discord.js version",
                  value: djsVersion,
                  inline: true
              }, {
                  name: "Bot version",
                  value: botVersion,
                  inline: true
              }, {
                  name: "Uptime",
                  value: formatTime(Math.floor(process.uptime()))
              }, {
                  name: "Ping",
                  value: `${client.ws.ping} ms`,
                  inline: true
              }, {
                  name: "Server Count",
                  value: `${client.guilds.cache.size}`,
                  inline: true
              });

          interaction.reply({
              embeds: [infoEmbed]
          });
          const channel = interaction.channel.id
          console.log(channel)
            setInterval(() => {
                if (interaction.client.user.presence.status === "online") {
                    color = "#1F8B4C";
                    status1 = "online <:online:1084230486949380167>";
                } else if (interaction.client.user.presence.status === "idle") {
                    color = "#F1C40F";
                    status1 = "idle <:idle:1084230484768342056>";
                } else if (interaction.client.user.presence.status === "dnd") {
                    color = "#FF0000";
                    status1 = "under maintenance <:dnd:1084230482838958161>";
                } else if (interaction.client.user.presence.status === "invisible") {
                    color = "#2C3E50";
                    status1 = "offline <:invisible:1084230480494342254>";
                }
                infoEmbed
                    .setColor(color)
                    .setTitle("<a:loading:1084226374002294895>   Multi's status...")
                    .setDescription(`Multi is ${status1}`)
                    .spliceFields(0, 1, {
                        name: "Developer",
                        value: author
                    })
                    .spliceFields(1, 2, {
                        name: "Discord.js version",
                        value: djsVersion,
                        inline: true
                    })
                    .spliceFields(2, 3, {
                        name: "Bot version",
                        value: botVersion,
                        inline: true
                    })
                    .spliceFields(3, 4, {
                        name: "Uptime",
                        value: formatTime(Math.floor(process.uptime()))
                    })
                    .spliceFields(4, 5, {
                        name: "Ping",
                        value: `${client.ws.ping} ms`,
                        inline: true
                    })
                    .spliceFields(5, 6, {
                        name: "Server Count",
                        value: `${client.guilds.cache.size}`,
                        inline: true
                    })
  
                if (interaction.replied) {
                    interaction.editReply({
                        embeds: [infoEmbed]
                    });
                }
            }, 600000)
      }
  }
