const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "volume",
    aliases: ["v"],
    description: "Change Bot Volume",
    async execute(client, message, args) {
        const player = message.client.Music.get(message.guild.id);
        var args = parseInt(args)

        if (player.state == 'CONNECTED' && player.voiceChannel != message.member.voice.channel.id) {return message.reply("You are not in the same VC as I am!")}
        if (player && player.queue.current && player.textChannel == message.channel.id) {
            const embed = new MessageEmbed()
                .setDescription(`Volume has been configured to ${args}`)
                .setFooter(`Requester : ${message.author.username}`, message.author.avatarURL());
            player.setVolume(args)
        } else {

        }
    }
}