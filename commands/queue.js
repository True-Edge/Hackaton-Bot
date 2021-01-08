const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    description: "Display da queue!",
    async execute(client, message, args) {
        const player = message.client.Music.get(message.guild.id);
        const queue = player.queue;
        const embed = new MessageEmbed()
            .setAuthor(`Queue for ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL())

        const multiple = 10;
        const page = args.length && Number(args[0]) ? Number(args[0]) : 1;

        const end = page * multiple;
        const start = end - multiple;
        
        const tracks = queue.slice(start, end)

        if (queue.current) embed.addField("Current Playing..", `[${queue.current.title}](${queue.current.uri})`);
        if (!tracks.length) embed.setDescription(`No tracks in ${page > 1 ? `page ${page}` : "the queue"}.`);
        else embed.setDescription(tracks.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri})`).join("\n"));
        
        const maxPages = Math.ceil(queue.length / multiple);

        embed.setFooter(`Page ${page > maxPages ? maxPages : page} of ${maxPages}`);
        if (player && player.textChannel == message.channel.id) {
            return message.reply(embed);
        } else {
            message.channel.send("Is not the correct blinded channel or player not detected in this guild!")
        }
    }
}