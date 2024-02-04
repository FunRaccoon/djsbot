const { CommandInteraction, EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'messageContentEdited',

    async execute(message, oldContent, newContent) {

        if(message.guild.id != "1054804473224110080") {
            return
        }
        if(message.author.bot) return;

        console.log(message)
        let msgEditEmb = new EmbedBuilder()
            .setColor("Pink")
            .setTitle("❗ Изменение сообщения")
            .setDescription(`**Сообщение изменено в канале:** <#${message.channel.id}>.\n**Было:** ${oldContent}.\n**Столо:** ${newContent}.`)
            .setTimestamp()

        message.guild.channels.cache.get('1055808031310499921').send({embeds: [msgEditEmb]})
    }
}