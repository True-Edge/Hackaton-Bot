const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "volume",
    aliases: ["v"],
    description: "Change Bot Volume",
    async execute(client, message, args) {
        const player = message.client.Music.get(message.guild.id);
        var args = parseInt(args)

        if (player && message.member.voice.channel.id != player.voiceChannel) {return message.reply("You're not in the same VC!")};
        if (player && player.queue.current && player.textChannel == message.channel.id) {
            const embed = new MessageEmbed()
                .setDescription(`Volume has been configured to ${args}`)
                .setFooter(`Requester : ${message.author.username}`, message.author.avaterURL());
            player.setVolume(args)
        } else {

        }
    }
}