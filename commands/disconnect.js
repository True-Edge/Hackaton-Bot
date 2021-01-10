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
        
        if (player.state == 'CONNECTED' && player.voiceChannel != message.member.voice.channel.id) {return message.reply("You are not in the same VC as I am!")}
        if (player && player.textChannel == message.channel.id) {
            message.channel.send(embed)
            if (client.QueueEndTimeout) {
                clearTimeout(QueueEndTimeout);
                player.destroy();
            } else {
                player.destroy();
            }
        } else {
            embed.setDescription("Unable to disconnect as Player is not detected in any VC of this guild or is not in the binded text channel!")
            message.channel.send(embed)
        }
    }
}