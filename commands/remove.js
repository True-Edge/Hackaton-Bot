const { MessageEmbed, TextChannel } = require("discord.js");

module.exports = {
    name:'remove',
    description:'Remove specific track on queue',
    async execute(client, message, args) {
        const player = message.client.Music.get(message.guild.id);
        var args = parseInt(args) - 1
        const queue = player.queue[args]

        const msg = client.channels.cache.get(player.textChannel);

        if (player && message.member.voice.channel.id != player.voiceChannel) {return message.reply("You're not in the same VC!")};
        if (queue != null && player && player.textChannel == message.channel.id) {
            const embed = new MessageEmbed()
                .setDescription(`Track [${queue.title}](${queue.uri}) has been removed on request`)
                .setFooter(`Requester : ${message.author.username}`, message.author.avatarURL());

            msg.send(embed)
            await player.queue.remove(args-1)
        } else {
            const embed = new MessageEmbed()
                .setDescription("Out of index or channel does not match with blinded channel!")
                .setFooter(`Requester : ${message.author.username}`, message.author.avatarURL());
            message.channel.send(embed)
        }
    }
}