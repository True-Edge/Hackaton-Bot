const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "join",
    description: "Join to the VC you want! (This overwrites blinded text and voice channel)",
    async execute(client, message, args) {
        const player = message.client.Music.get(message.guild.id);
        const channel = message.member.voice;
        const embed = new MessageEmbed()
            .setDescription(`Joined ${channel.name}`);

        if (!channel) {return message.reply("You must be in a voice channel to do this!")}
        else if(player) {
            player.setVoiceChannel(channel.id)
            player.setTextChannel(message.channel.id)
            player.connect();
        }

    
        }
}
