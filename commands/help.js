const { MessageEmbed } = require("discord.js");
const botprefix = require(`../JSON/prefix.json`).prefix

module.exports = {
    name: "help",
    description: "List all of the command or info about a specific comamnd.",
    usage: "[comamnd name]",
    async execute(client, message, args) {
        const data = [];
        const { commands } = message.client;
        const embed = new MessageEmbed()
            .setFooter(`Requester : ${message.author.username}`, message.author.avatarURL());

        if (!args.length) {
            data.push(`Here's a list of my command:\n`);
            data.push(`\`${commands.map(command => command.name).join('\n')}\``);
            data.push(`\nYou can send \`${botprefix}help [command name]\` to get specific info of a comamnd!`)
            embed.setDescription(data);
            message.channel.send(embed)
        } else if (args.length) {
            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
            if (!command) {
                return embed.setDescription("That's not a valid command!");
            }

            data.push(`Name: ${command.name}`);
            if (command.aliases) data.push(`Aliases: ${command.aliases.join(', ')}`);
            if (command.description) data.push(`Description: ${command.description}`);
            if (command.usage) data.push(`Usage: ${botprefix}${command.name} ${command.usage}`);
            embed.setDescription(data)
            message.channel.send(embed)
        }
    }
}