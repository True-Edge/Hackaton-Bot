const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'play',
    aliases: ['p'],
    description: 'Play music. Usage: play <link/search term>',
    async execute (client, message, args) {
        if (!args) {message.reply("Missing Argument. Usage: `play <link/search term>`")};
        if (!message.member.voice) {message.reply("You must be in a voice channel")};

        let player;
        if (!client.Music.player) {
            player = client.Music.create({
                guild: message.guild.id,
                voiceChannel: message.member.voice.channel.id,
                textChannel: message.channel.id,
                selfDeafen: true,
                selfMute: false,
            })
        }

        if (player.state !== 'CONNECTED') {player.connect(); message.channel.send(`Joined \`${message.member.voice.channel.name}\` And Binded To \`${message.channel.name}\``)}

        if (player && player.textChannel != message.channel.id) return message.channel.send(`I'm sorry, but this command is now binded to **${client.channels.cache.get(player.textChannel).name}**`);
        if (player && message.member.voice.channel.id != player.voiceChannel) {return message.reply("You're not in the same VC!")};
        const res = await player.search(args.join(" "), message.author);

        switch (res.loadType) {
            case 'SEARCH_RESULT':
            case 'TRACK_LOADED':
                player.queue.add(res.tracks[0]);
                if (player.queue.current) {
                    const embed = new MessageEmbed()
                        .setTitle("Enqueued Track")
                        .addField("Title", `[${res.tracks[0].title}](${res.tracks[0].uri})`)
                        .addField("Artist", res.tracks[0].author)
                        .setThumbnail(res.tracks[0].displayThumbnail('maxresdefault'))
                        .addField("Position", player.queue.length + 1)
                        .setFooter(`Requester : ${message.author.username}`, message.author.avatarURL());
                    message.channel.send(embed)
                } else {
                    const embed = new MessageEmbed()
                        .setTitle("Enqueued Track")
                        .addField("Title", `[${res.tracks[0].title}](${res.tracks[0].uri})`)
                        .addField("Artist", res.tracks[0].author)
                        .setThumbnail(res.tracks[0].displayThumbnail('maxresdefault'))
                        .setFooter(`Requester : ${message.author.username}`, message.author.avatarURL());
                    message.channel.send(embed)
                }

                if (!player.playing && !player.paused && !player.queue.size) await player.play(); player.setVolume(35);
                break;

            case 'PLAYLIST_LOADED':
                if (!res.playlist) return;
                const embed = new MessageEmbed()
                        .setTitle("Enqueued Track")
                        .addField("Total Tracks", res.tracks.length)
                        .addField("Playlist Title", `[${res.playlist.name}](${args[0]})`)
                        .setThumbnail(res.playlist.selectedTrack.displayThumbnail('maxresdefault'))
                        .setFooter(`Requester : ${message.author.username}`, message.author.avatarURL());
                if (player.queue.current) {
                    message.channel.send(embed)
                } else {
                    message.channel.send(embed)
                }

                player.queue.add(res.tracks)
                if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) await player.play(); player.setVolume(35);
                break;

            case 'NO_MATCHES':
                message.reply(`No matches found for ${res.query}`)
                break;
            
            case 'LOAD_FAILED':
                message.reply(`Failed to load the tracks. ;-;`)
                break;
        }
    }
}