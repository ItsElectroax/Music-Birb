const { EmbedBuilder, ComponentType, SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder() 
  .setName('help')
  .setDescription('Display all the commands.'),
  async execute(interaction){
    const emojis = {
      admin: '🛠',
      music: '🎧',
      public: '🌐',
      test: '🧪',
      private: '🔐',
    };
    
    const directories = [
      ...new Set(interaction.client.commands.map((cmd) => cmd.folder)),
    ];

    const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

    const categories = directories.map((dir) => {const getCommands = interaction.client.commands.filter((cmd) => cmd.folder === dir).map((cmd) => {
      return {
        name: cmd.data.name,
        description: cmd.data.description || "There is no description for this command",
      };
    });

    return {
      directory: formatString(dir),
      commands: getCommands,
    };
    });

    const embed = new EmbedBuilder()
      .setDescription("Please choose a category in the dropdown menu.");

      const components = (state) => [
        new ActionRowBuilder().addComponents(new SelectMenuBuilder().setCustomId("help-menu").setPlaceholder("Please select the cathegory").setDisabled(state).addOptions(categories.map((cmd) => {return {label: cmd.directory, value: cmd.directory.toLowerCase(), description: `Commands from ${cmd.directory} category.`, emoji: emojis[cmd.directory.toLowerCase() || null],}})))
      ];

      const initialMessage = await interaction.reply({embeds: [embed], components: components(false), ephemeral: true})

      const filter = (interaction) => interaction.user.id === interaction.member.id;

      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        componentType: ComponentType.selectMenu
      });

      collector.on("collect", (interaction) => {
        const [directory] = interaction.values;
        const category = categories.find((x) => x.directory.toLowerCase() === directory);

        const categoryEmbed = new EmbedBuilder()
          .setTitle(`${formatString(directory)} commands.`)
          .setDescription(`The list of all command categories under ${directory}.`)
          .addFields(category.commands.map((cmd) => {return{name: `\`/${cmd.name}\``, value: cmd.description, inline: true}}));
        interaction.update({embeds: [categoryEmbed], ephemeral: true});
      });
      collector.on('end', () => {
        initialMessage.edit({ components: components(true)})
      })
  },
};