const { MessageEmbed, TextChannel } = require("discord.js");

module.exports = {
    name:'remove',
    description:'Remove specific track on queue',
    async execute(client, message, args) {
        const player = message.client.Music.get(message.guild.id);
        var args = parseInt(args) - 1
        const queue = player.queue[args]

        const msg = client.channels.cache.get(player.textChannel);

        if (player.state == 'CONNECTED' && player.voiceChannel != message.member.voice.channel.id) {return message.reply("You are not in the same VC as I am!")}
        if (queue != null && player && player.textChannel == message.channel.id) {
            const embed = new MessageEmbed()
                .setDescription(`Track [${queue.title}](${queue.uri}) has been removed on request`)
                .setFooter(`Requester : ${message.author.username}`, message.author.avatarURL());

            msg.send(embed)
            await player.queue.remove(args-1)
        } else {
            const embed = new MessageEmbed()
                .setDescription("Out of index or channel does not match with binded channel!")
                .setFooter(`Requester : ${message.author.username}`, message.author.avatarURL());
            message.channel.send(embed)
        }
    }
}