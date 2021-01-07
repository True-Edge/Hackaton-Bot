const { Client, MessageEmbed, Collection } = require('discord.js');
const { Manager } = require('erela.js');
require('dotenv').config();

const client = new Client();
client.Music = new Manager({
    nodes: [{
        host: "localhost",
        port: 7000,
        password: "LavalinkJS",
        identifier: "default_node",     
    }],
    send(id, payload) {
        const guild = client.guilds.cache.get(id)
        if (guild) guild.shard.send(payload)
    },
})
    .on("nodeConnect", node => console.log(`Established connection to ${node.options.identifier}`))
    .on("nodeError", (node, error) => console.log(`Unable to establish connection to ${node.options.identifier}. [${error.message}]`))
    .on("trackStart", (player, track) => {
        const embed = new MessageEmbed();
        embed.setDescription(`Now Playing : [${track.title}](${track.uri})\nRequester : ${track.requester}`);
        client.channels.cache
            .get(player.textChannel)
            .send(embed);       
    })
    .on("queueEnd", (player) => {
        const embed = new MessageEmbed()
            .setDescription("Queue has ended.");
        client.channels.cache
            .get(player.textChannel)
            .send(embed);
        
        setTimeout(() => {
                if (player.queue.length != 0) { return; }
                else { 
                    embed.setDescription("Looks like I'm am inactive for 5 min. Disconnecting to save bandwidth.");
                    var msg = client.channels.cache.get(player.textChannel)
                    msg.send(embed)
                    player.destroy();
                }
        }, 300000);
    })


const fs = require('fs');
client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log("Ready!")
    client.Music.init(client.user.id)
});

client.on('raw', (d) => {client.Music.updateVoiceState(d)})
client.on('message', async (message) => {
    const prefix = '$';
    const args = message.content.slice(prefix.length).trim().split(" ");
    const commandName = args.shift().toLowerCase()

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName)
    try {
        command.execute(client, message, args);
    } catch (e) {
        console.log(e);
        message.reply("There was an error while executing that command!");
    }
});

client.login(process.env.TOKEN)