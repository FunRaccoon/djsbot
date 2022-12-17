const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    name: "guildMemberAdd",
    execute(member) {
        try {
        const { user, guild } = member
        //if (guild.id == `1045884004336943124`) return
        const welcomeChannel = member.guild.channels.cache.get('1045805205792505886')
        const memberRole = '1013348746446258177'
        const row = new ActionRowBuilder()
            .setComponents(
                new ButtonBuilder().setLabel('Правила').setStyle(ButtonStyle.Link).setURL('https://sites.google.com/view/call-of-pripyat-rp/%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0'),
            )
        const welcomeEmbedDM = new EmbedBuilder()
            .setColor('Random')
            .setTitle("Добро пожаловать на сервер **S.T.A.L.K.E.R. Call of Pripyat RP**")
            .setURL('https://discord.gg/call-of-pripyat-rp0')
            .setDescription("Это Role Play проект по мотивам игр серии S.T.A.K.E.R. на игровом площадке DayZ")
            .addFields(
                { name: 'Оставить заявку на собес', value: "<#1045806903772594256>", inline: true },
                { name: 'Как начать играть', value: "<#1013378252426989579>", inline: true },
                { name: 'Сайт', value: 'https://bit.ly/CoPsite', inline: true },
            )
            .setImage('https://sun9-72.userapi.com/impf/c847122/v847122750/d9a08/AIMNgqWaiM8.jpg?size=711x960&quality=96&sign=c4abda2086745caadc4be43b6a355018&type=album')
        
        const welcomeEmbed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`**Добро пожаловать на сервер!!**`)
            .setDescription(`Рады встрече, <@${member.id}>`)
            //.addFields(`На сервере: ${guild.memberCount} человек`)
            .setTimestamp()
            
            member.roles.add(memberRole)
            welcomeChannel.send({ embeds: [welcomeEmbed]})
            member.send({ embeds: [welcomeEmbedDM], components: [row] }).catch(() => console.log('Я не могу отпрвить сообщение в ЛС'))
        } catch (err) {
            console.log(err)
        }
    }
}
