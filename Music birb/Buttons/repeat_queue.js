const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const {client} = require("../index");
const distube = require('../index');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("loopqueue")
    .setDescription("Display loop options."),

    async execute(interaction, client){
        const { member, options, guild } = interaction;
        const voiceChannel = member.voice.channel;

        const embed = new EmbedBuilder();

        if (!voiceChannel){
            embed.setColor("Red").setTitle("Uh, oh!").setDescription("You must be in a voice channel to execute music commands.");
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
  
        if (!member.voice.channelId == guild.members.me.voice.channel) {
            embed.setColor("red").setTitle("Uh, oh!").setDescription(`The music has already been reproduced in <#${guild.member.me.voice.channelId}>`);
            return interaction.reply({ embeds: [embed], ephemeral: true});
        }
        
        try {
            const distube = require('../index')
            const queue = await client.distube.getQueue(voiceChannel);
                    
            if(!queue){
                embed.setColor("Red").setTitle("Uh, oh!").setDescription("There is no active queue.");
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }
            
            let mode = 2;

            mode = await queue.setRepeatMode(mode);

            mode = mode ? (mode === 2? "Repeat queue" : "Repeat song") : "Off";

            embed.setColor("DarkAqua").setDescription(`:repeat: Set loop mode to \`${mode}\`.`)
            await interaction.reply({ embeds: [embed], ephemeral: true});
            setTimeout(()=> {
                interaction.deleteReply();
            }, 1500) 

        } catch (err) {
            console.log(err);

            embed.setColor("Red").setTitle("Uh, oh!").setDescription("`🔴 | Something went wrong... Try again later.`");

            return interaction.reply({ embeds: [embed], ephemeral: true });

        }
    }
}