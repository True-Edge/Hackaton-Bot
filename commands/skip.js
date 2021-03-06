const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skip",
    description: "skip music",
    async execute(client, message, args) {
        const player = message.client.Music.get(message.guild.id);
        const embed = new MessageEmbed();
        if (player.state == 'CONNECTED' && player.voiceChannel != message.member.voice.channel.id) {return message.reply("You are not in the same VC as I am!")}
        if ((parseInt(player.queue) + parseInt(player.queue.current)) != 0 && player && player.textChannel == message.channel.id) {
            var title = player.queue.current;
            embed.setFooter(`Skipped by ${message.author.username}.`, message.author.avatarURL())
            embed.setDescription(`[${title.title}](${title.uri}) was skipped on request.`)
            await message.reply(embed)
            player.stop();
        } else {
            message.reply("Queue is empty or player not detected/incorrect text channel")
        }
    }
}