const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "loop",
    description: "Loop track",
    async execute(client, message, args) {
        const player = message.client.Music.get(message.guild.id)
        const embed = new MessageEmbed()
            .setFooter(`Requester : ${message.author.username}`, message.author.avatarURL());

        if (player.state == 'CONNECTED' && player.voiceChannel != message.member.voice.channel.id) {return message.reply("You are not in the same VC as I am!")}
        if (player && player.queue.current && player.textChannel == message.channel.id && !player.trackRepeat) {
            embed.setDescription(`Enabled Track Loop`)
            message.channel.send(embed)
            player.setTrackRepeat(true)

        } else if (player && player.queue.current && player.textChannel == message.channel.id && player.trackRepeat) {
            embed.setDescription(`Disabled Track Loop`)
            message.channel.send(embed)
            player.setTrackRepeat(false)
        } else {
            embed.setDescription("Cannot set track repeat as:\n-Not playing\n-Not the binded channel")
            message.channel.send(embed)
        }
    }
}