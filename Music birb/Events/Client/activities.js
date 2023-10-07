const {version} = require('../../package-lock.json')
let currentIntervalId; // Declare a variable to store the interval ID

function changeActivity(client) {
    console.log('Changing bot activity...');
    const { ActivityType } = require('discord.js');
    let currentIndex = 0;
    const activities = [
        { type: ActivityType.Playing, message: ' • ❓┆Use /help command' },
        { type: ActivityType.Playing, message: ` • 💻┆${client.guilds.cache.size} servers` },
        { type: ActivityType.Playing, message: ' • 🎫 ┆ discord.gg/7zDQyyuhMB' },
        { type: ActivityType.Playing, message: ` • ⚙ ┆ I am ${client.user.presence.status}!` },
        { type: ActivityType.Playing, message: ` • 🔖┆ version ${version}`}
    ];
    currentIntervalId = setInterval(() => {
        const { type, message } = activities[currentIndex];
        client.user.setActivity(message, { type });

        currentIndex++;
        if (currentIndex === activities.length) {
            currentIndex = 0;
        }
    }, 10000); // 10 seconds interval

    return currentIntervalId; // Return the interval ID
}

function clearActivityInterval() {
    if (currentIntervalId) {
        clearInterval(currentIntervalId);
        currentIntervalId = null;
    }
}

module.exports = { changeActivity, clearActivityInterval };

