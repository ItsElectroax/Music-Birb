const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const {client} = require("../../index");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Display loop options.")
    .addStringOption(option => 
        option.setName("options").setDescription("Loop options: off, song, queue.")
        .addChoices(
            { name: "off", value: "off" },
            { name: "song", value: "song" },
            { name: "queue", value: "queue" },
        ).setRequired(true)
    ),

    async execute(interaction, client){
        const { member, options, guild, channel } = interaction;
        const option = options.getString("options");
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
            const distube = require('../../index')
            const queue = await client.distube.getQueue(voiceChannel);
                    
            if(!queue){
                embed.setColor("Red").setTitle("Uh, oh!").setDescription("There is no active queue.");
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }
            
            let mode = null;
            let loomoji = null;

            switch (option){
                case "off":
                    mode = 0;
                    loomoji = ":x:";
                    break;
                case "song":
                    mode = 1;
                    loomoji = ":repeat_one:";
                    break;
                case "queue":
                    mode = 2;
                    loomoji = ":repeat:";
                    break;
            }

            mode = await queue.setRepeatMode(mode);

            mode = mode ? (mode === 2? "Loop queue" : "Loop song") : "Off";

            embed.setColor("DarkAqua").setDescription(`${loomoji} Set loop mode to \`${mode}\`.`)
            let reply = null;
            interaction.reply({ embeds: [embed] }), reply = await interaction.fetchReply();
            setTimeout(()=> {
                client.channels.fetch(channel.id).then(channel => {
                    channel.messages.delete(reply);
                });
            }, 5000) 
        } catch (err) {
            console.log(err);

            embed.setColor("Red").setTitle("Uh, oh!").setDescription("`🔴 | Something went wrong... Try again later.`");

            return interaction.reply({ embeds: [embed], ephemeral: true });

        }
    }
}