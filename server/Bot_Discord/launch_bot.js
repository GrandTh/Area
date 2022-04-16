const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { token, guild } = require('./config.json');

function launch_bot() {
    client.once('ready', () => {
        client.user.setPresence({
            activities: [{
              name: "rien.",
              type: "PLAYING"
            }],
            status: "online"
        })
        }
    );

    client.login(token);
};

function send_to_specific(name_of_serv, message) {
    const channel = client.channels.cache.find(channel => channel.name === name_of_serv)
    channel.send(message)
}

// function create_channel(name_of_channel) {
//     guild.channels.create(name_of_channel, {
//         type: 'text',
//         reason: 'Needed a cool new channel',
//     })
//     .then((channel) => {
//         const categoryID = guild;
//         channel.setParent(categoryID)
//     })
// }

module.exports = {
    launch_bot,
    send_to_specific,
}
