const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    name: "guildMemberAdd",
    execute(member, guild) {
        let welcomeChannel;
        let memberRole;
        let row = new ActionRowBuilder()
            .setComponents(
                new ButtonBuilder().setLabel('Правила').setStyle(ButtonStyle.Link).setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
            )
        let welcomeEmbedBase = new EmbedBuilder()
            .setColor('Random')
            .setDescription("Это Role Play проект по мотивам игр серии S.T.A.K.E.R. на игровом площадке DayZ")
            .setImage('https://sun9-72.userapi.com/impf/c847122/v847122750/d9a08/AIMNgqWaiM8.jpg?size=711x960&quality=96&sign=c4abda2086745caadc4be43b6a355018&type=album')
        
        let welcomeEmbed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`**Добро пожаловать на сервер!!**`)
            .setDescription(`Рады встрече, <@${member.id}>`)
            //.addFields(`На сервере: ${guild.memberCount} человек`)
            .setTimestamp()
        try {
        const { user, guild } = member
        //console.log(guild.id)
        if(guild.id == "1054804473224110080") { //ls
            welcomeChannel = member.guild.channels.cache.get('1054804474692108306')
            memberRole = '1054804473224110081'
            welcomeEmbedBase.setTitle("Добро пожаловать на сервер **Leaden Sunset**").setURL('https://discord.gg/Cz9uteAs4S').addFields(
                { name: 'Оставить заявку на собес', value: "<#1054804474926993469>", inline: true },
                { name: 'Как начать играть', value: "<#1054804474692108302>", inline: true }
            )
        } else if (guild.id == "1013344004743635045") { //call of
            return
            welcomeChannel = member.guild.channels.cache.get('1045805205792505886')
            memberRole = '1013348746446258177'
            welcomeEmbedBase.setTitle("Добро пожаловать на сервер **S.T.A.L.K.E.R. Call of Pripyat RP**").setURL('https://discord.gg/call-of-pripyat-rp0').addFields(
                { name: 'Оставить заявку на собес', value: "<#1045806903772594256>", inline: true },
                { name: 'Как начать играть', value: "<#1013378252426989579>", inline: true },
                { name: 'Сайт', value: 'https://bit.ly/CoPsite', inline: true },
            )
            welcomeChannel.send({ embeds: [welcomeEmbed]})
        }   
            member.roles.add(memberRole)
            member.send({ embeds: [welcomeEmbedBase], components: [row] }).catch(() => console.log('Я не могу отпрвить сообщение в ЛС'))
        } catch (err) {
            console.log(err)
        }
    }
}
