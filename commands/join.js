const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "join",
    description: "Join to the VC you want! (This overwrites binded text and voice channel)",
    botPermission: ["CONNECT", "SPEAK"],
    async execute(client, message, args) {
        let player = message.client.Music.get(message.guild.id);
        const channel = message.member.voice.channel;
        const embed = new MessageEmbed()
            .setDescription(`Joined ${channel.name}`);

        if (!player) {
            player = await client.Music.create({
                guild: message.guild.id,
                voiceChannel: message.member.voice.channel.id,
                textChannel: message.channel.id,
                selfDeafen: true,
                selfMute: false,
            })

            if (player.state != 'CONNECTED') player.connect();
            message.channel.send(embed)
        } else if(player) {
            player.destroy();

            player = await client.Music.create({
                guild: message.guild.id,
                voiceChannel: message.member.voice.channel.id,
                textChannel: message.channel.id,
                selfDeafen: true,
                selfMute: false,
            })
            
            
            if (player.state != 'CONNECTED') player.connect(message.member.voice.channel);
            message.channel.send(embed)
        }


    
        }
}
