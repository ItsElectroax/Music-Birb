const {
    EmbedBuilder,
    SlashCommandBuilder,
    PermissionFlagsBits,
    VoiceChannel,
    GuildEmoji,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("Shuffles the queue."),

    async execute(interaction, client) {
        const { member, guild } = interaction;

        const voiceChannel = member.voice.channel;
        const option = interaction.options.getBoolean("options");

        const embed = new EmbedBuilder();

        if (!voiceChannel) {
            embed
                .setColor("Red")
                .setTitle("Uh, oh!")
                .setDescription(
                    "You must be in a voice channel to execute music commands."
                );
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (!member.voice.channelId == guild.members.me.voice.channelId) {
            embed
                .setColor("red")
                .setTitle("Uh, oh!")
                .setDescription(
                    `The music has already been reproduced in <#${guild.member.me.voice.channelId}>`
                );
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        try {
            const queue = await client.distube.getQueue(voiceChannel);

            if (!queue) {
                embed
                    .setColor("Red")
                    .setTitle("Uh, oh!")
                    .setDescription("There is no active queue.");
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }
            queue.shuffle();

            embed
                .setColor("Blue")
                .setDescription(
                    `:twisted_rightwards_arrows: The queue has been shuffled.`
                );
            await interaction.reply({ embeds: [embed] });

            setTimeout(() => {
                if (interaction){
                    interaction.deleteReply();
                }
            }, 5000);
        } catch (err) {
            err;

            embed
                .setColor("Red")
                .setTitle("Uh, oh!")
                .setDescription("`🔴 | Something went wrong... Try again later.`");

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};
