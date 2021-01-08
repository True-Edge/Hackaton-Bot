const { MessageEmbed } = require("discord.js");
const { Player } = require("erela.js");

module.exports = {
    name: 'disconnect',
    description: "Disconnect on requset.",
    async execute(client, message, args) {
        const player = message.client.Music.get(message.guild.id);
        const embed = new MessageEmbed()
            .setDescription("Bot disconnected on request")
            .setFooter(`Requester : ${message.author.username}`, message.author.avatarURL())
        
        if (player) {
            message.channel.send(embed)
            clearTimeout(QueueEndTimeout);
            player.destroy();
        } else {
            embed.setDescription("Unable to disconnect as Player is not detected in any VC of this guild!")
            message.channel.send(embed)
        }
    }
}