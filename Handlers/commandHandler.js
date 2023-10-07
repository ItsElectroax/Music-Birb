function loadCommands(client) {
    const ascii = require('ascii-table');
    const fs = require('fs');
    const table = new ascii().setHeading('Commands', 'Status');
  
    let commandsArray = [];
  
    const commandsFolder = fs.readdirSync('./Commands');
    for (const folder of commandsFolder) {
      const commandFiles = fs
        .readdirSync(`./Commands/${folder}`)
        .filter((file) => file.endsWith('.js'));
  
      for (const file of commandFiles) {
        const commandFile = require(`../Commands/${folder}/${file}` || `../Commands/${folder}/${folder}/${file}`);
  
        if (
          typeof commandFile.data !== 'undefined' &&
          typeof commandFile.data.name !== 'undefined'
        ) {
          const properties = {folder, ...commandFile}
          client.commands.set(commandFile.data.name, properties);
          commandsArray.push(commandFile.data);
          table.addRow(file, '🟢 Successfully loaded');
        } else if (typeof commandFile.name !== 'undefined') {
          const properties = {folder, ...commandFile}
          client.commands.set(commandFile.name, properties);
          commandsArray.push(commandFile);
          table.addRow(file, '🟢 Successfully loaded');
        } else {
          table.addRow(file, '🔴 Unable to load the command');
        }
      }
    }
  
    client.application.commands.set(commandsArray);
  
    return console.log(table.toString());
  }
  
  module.exports = { loadCommands };
  