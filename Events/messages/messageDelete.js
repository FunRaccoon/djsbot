const { CommandInteraction, EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'messageDelete',

    async execute(message) {

        if(message.guild.id != "1054804473224110080") {
            return
        }
        if(message.author.bot) return;
        
        let y = 1;
        let msgDeleteEmb = new EmbedBuilder()
            .setColor("Red")
            //.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({dynamic : true}))
            .setTitle("❌ Удаление сообщений")
            .setDescription(`**Сообщение удалено в канале:** <#${message.channel.id}>.\n**Автор:** ${message.author}.`)
            .setTimestamp();
        if (message.attachments.size > 0) {
            for (let i = 0; i < message.attachments.size; i++) {
                await msgDeleteEmb.addFields({name: `Файл ${y++}`, value: `${message.attachments.map(el => el.attachment)[i]}`})
            }
        }
        if (message.content != "") {
            await msgDeleteEmb.setDescription(`**Сообщение удалено в канале:** <#${message.channel.id}>.\n**Автор:** ${message.author}.\n**Содержимое:** ${message}.`)
        }
        message.guild.channels.cache.get('1055808031310499921').send({embeds: [msgDeleteEmb]})
    }
}