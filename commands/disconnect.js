const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'disconnect',
    description: "Disconnect on requset.",
    aliases: ['dc'],
    async execute(client, message, args) {
        const player = message.client.Music.get(message.guild.id);
        const embed = new MessageEmbed()
            .setDescription("Bot disconnected on request")
            .setFooter(`Requester : ${message.author.username}`, message.author.avatarURL())
        
        if (player && player.textChannel == message.channel.id) {
            message.channel.send(embed)
            clearTimeout(QueueEndTimeout);
            player.destroy();
        } else {
            embed.setDescription("Unable to disconnect as Player is not detected in any VC of this guild or is not in the binded text channel!")
            message.channel.send(embed)
        }
    }
}