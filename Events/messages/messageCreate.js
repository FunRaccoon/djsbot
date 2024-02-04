const { CommandInteraction } = require('discord.js')

module.exports = {
    name: 'messageCreate',

    async execute(message) {

        if(message.guild.id != "1054804473224110080") {
            return
        }
        if(message.author.bot) return;

        //console.log(message)
        let words = ["pidor", "ass"]

        let confirm = false

        for (i = 0; i < words.length; i++) {
            if (message.content.toLowerCase().includes(words[i].toLowerCase())) confirm = true
        }
        if (confirm) {
            message.delete();
            message.channel.send({ content: `${message.author}, your message was flagged for sweaing!`})
        }

        if(message.channel.id == '1045822074071044279' && message.webhookId == null) message.delete()
        if(message.channel.id == '1045806903772594256' && message.webhookId == null) message.delete()
    }
}