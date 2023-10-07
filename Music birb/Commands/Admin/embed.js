const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('send-embed')
    .setDescription('Sends an embed to a specific channel.')
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('Channel to send an embed to.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('color')
        .setDescription('The embed color.')
        .setRequired(true)
        .addChoices(
            { name: 'Red', value: 'red' },
            { name: 'Orange', value: 'orange' },
            { name: 'Yellow', value: 'yellow' },
            { name: 'Green', value: 'green' },
            { name: 'Blue', value: 'blue' },
            { name: 'Purple', value: 'purple' },
            { name: 'Brown', value: 'brown' },
            { name: 'Black', value: 'black' },
            { name: 'White', value: 'white' },
        )
    )
    .addStringOption(option =>
      option
        .setName('title')
        .setDescription('The embed title.')
    )
    .addStringOption(option =>
      option
        .setName('title-url')
        .setDescription('The embed title URL.')
    )
    .addStringOption(option =>
      option
        .setName('description')
        .setDescription('The embed description.')
    )
    .addStringOption(option =>
      option
        .setName('author-name')
        .setDescription('The author name.')
    )
    .addStringOption(option =>
      option
        .setName('author-icon')
        .setDescription('The author icon (URL).')
    )
    .addStringOption(option =>
      option
        .setName('author-url')
        .setDescription('The author URL.')
    )
    .addStringOption(option =>
      option
        .setName('thumbnail')
        .setDescription('The embed thumbnail (URL).')
    )
    .addStringOption(option =>
      option
        .setName('footer-text')
        .setDescription('The embed footer text.')
    )
    .addStringOption(option =>
      option
        .setName('footer-icon')
        .setDescription('The embed footer icon (URL).')
    )
    .addStringOption(option =>
      option
        .setName('image')
        .setDescription('The embed image (URL).')
    )
    .addBooleanOption(option =>
      option
        .setName('timestamp')
        .setDescription('See the timestamp?')
    )
    .addStringOption(option =>
      option
        .setName('field1')
        .setDescription('Add the first field')
    )
    .addStringOption(option =>
      option
        .setName('field2')
        .setDescription('Add the second field')
    )
    .addStringOption(option =>
      option
        .setName('field3')
        .setDescription('Add the third field')
    )
    .addStringOption(option =>
      option
        .setName('field4')
        .setDescription('Add the fourth field')
    )
    .addStringOption(option =>
      option
        .setName('field5')
        .setDescription('Add the fifth field')
    )
    .addStringOption(option =>
      option
        .setName('field6')
        .setDescription('Add the sixth field')
    )
    .addStringOption(option =>
      option
        .setName('field7')
        .setDescription('Add the seventh field')
    ),

    execute(interaction) {
        const channel = interaction.options.getChannel("channel");
        const title = interaction.options.getString("title");
        const title_url = interaction.options.getString("title-url");
        const description = interaction.options.getString("description");
        const author_name = interaction.options.getString("author-name");
        const author_icon = interaction.options.getString("author-icon");
        const author_url = interaction.options.getString("author-url");
        const thumbnail = interaction.options.getString("thumbnail");
        const footer_text = interaction.options.getString("footer-text");
        const footer_icon = interaction.options.getString("footer-icon");
        const image = interaction.options.getString("image");
        const timestamp = interaction.options.getBoolean("timestamp");
        const field1 = interaction.options.getString("field1");
        const field2 = interaction.options.getString("field2");
        const field3 = interaction.options.getString("field3");
        const field4 = interaction.options.getString("field4");
        const field5 = interaction.options.getString("field5");
        const field6 = interaction.options.getString("field6");
        const field7 = interaction.options.getString("field7");
        let color = interaction.options.getString("color");
        if (color == 'red'){
          color = 'Red'
        } else if (color == 'orange'){
          color = 'Orange'
        } else if (color == 'yellow'){
          color = 'Yellow'
        } else if (color == 'green'){
          color = 'Green'
        } else if (color == 'blue'){
          color = 'Blue'
        } else if (color == 'purple'){
          color = 'Purple'
        } else if (color == 'brown'){
          color = 'Brown'
        } else if (color == 'black'){
          color = 'Black'
        } else if (color == 'white'){
          color = 'White'
        };

        let embed = new EmbedBuilder()

        if (timestamp === true) {
              embed
                .setTitle(title)
                .setURL(title_url)
                .setDescription(description)
                .setColor(color)
                .setAuthor({name: author_name, iconURL: author_icon, url: author_url})
                .setThumbnail(thumbnail)
                .setFooter({text: footer_text, iconURL: footer_icon})
                .setImage(image)
                .setTimestamp()
        } else {
            embed
                .setTitle(title)
                .setURL(title_url)
                .setDescription(description)
                .setColor(color)
                .setAuthor({name: author_name, icon: author_icon, url: author_url})
                .setThumbnail(thumbnail)
                .setFooter({text: footer_text, iconURL: footer_icon})
                .setImage(image)
        }
        channel.send({embeds: [embed]});

        interaction.reply({ content: "Embed sent!", ephemeral: true });
    }
}