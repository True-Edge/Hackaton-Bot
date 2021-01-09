const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'loopqueue',
    aliases: ['lq'],
    description: 'Loop the queue',
    async execute(client, message, args) {
        const player = message.client.Music.get(message.guild.id);
        const embed = new MessageEmbed()
            .setFooter(`Requester : ${message.author.username}`, message.author.avatarURL());

        if (player && player.queue.current && player.textChannel == message.channel.id && !player.queueRepeat) {
            embed.setDescription("Enabled Queue Repeat!")
            player.setQueueRepeat(true)
            message.channel.send(embed)
        } else if(player && player.queue.current && player.textChannel == message.channel.id && player.queueRepeat) {
            embed.setDescription("Disabled Queue Repeat!")
            player.setQueueRepeat(false)
            message.channel.send(embed)
        } else {
            embed.description("Failed to set queue repeat! error could be:\n-Player is not in this guild VC\n-Not the binded text channel")
            message.channel.send(embed)
        }
    }
}