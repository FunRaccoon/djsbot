const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const { avatarBandits, avatarTorg, avatarCS, avatarDOLG, avatarVSU, avatarGrech, avatarMerc, avatarMonolith, avatarNeutrals, avatarRenegats, avatarSientis, avatarStalker, avatarSvoboda, avatarUN } = require('../../avatar.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pdaadmin")
        .setDescription("Отправление сообщения в общую сеть PDA")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addStringOption(option =>
            option.setName("name")
                .setDescription("Имя отправителя")
                .setRequired(true)
                .setMaxLength(30)
        )
        .addStringOption(option =>
            option.setName("text")
                .setDescription("Cообщение")
                .setRequired(true)
                .setMaxLength(255)
        )
        .addRoleOption(option =>
            option.setName("group")
                .setDescription("Выберите роль гп")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("avatar")
                .setDescription("ТОЛЬКО ССЫЛКА БЛЕАТЬ!!!!")
                .setRequired(true)
                .setMaxLength(255)
        ),
    async execute(interaction) {
        const groupsID = [
            "1013345052132638822", //stalker  1+
            "1045791184393609227", //bandits  2+
            "1013345499652313088", //vsu      3+
            "1013346010279444570", //neutrals 4+
            "1013345855761285150", //cs       5+
            "1013345863894061086", //renegats 6+
            "1045789565492932738", //dolg     7+
            "1041723317821915247", //freedom  8+
            "1029087229525631016", //un       9+
            "1013346374173081670", //grech    10+
            "1013346488929234954", //mercenaries 11+
            "1013345656137601054", //sientist    12+
            "1013345968814571620"  //monolith    13+
        ]
        const { options, member, channel, command } = interaction
        try {
            if (channel.id != "1045822074071044279")
                return interaction.reply({ content: "Кпк не тут!", ephemeral: true })
            //if (member.nickname.split("|")[1].trim().length == 0)   Если бот упадёт (Внизу будет ошибка) кричите, я полежать пошёл

            //return interaction.reply({ content: "У тебя проблема с ником", ephemeral: true })

            const name = options.getString("name")
            const group = options.getRole("group")
            const text = options.getString("text")
            const avatar = options.getString("avatar")
            const embed = new EmbedBuilder()
                .setTitle(`Сообщение: ${text}`)
                .setTimestamp()

            if (text.length > 255)
                return interaction.reply({ content: "Сообщение не может превышать 2000 символов", ephemeral: true })

            interaction.reply({ content: "Сообщение отправлено", ephemeral: true })
            let ava;
            if (group.id == "1013345052132638822") ava = avatarStalker[Math.floor(Math.random() * avatarStalker.length)]
            else if (group.id == "1045791184393609227") ava = avatarBandits[Math.floor(Math.random() * avatarBandits.length)]
            else if (group.id == "1013345499652313088") ava = avatarVSU[Math.floor(Math.random() * avatarVSU.length)]
            else if (group.id == "1013346010279444570") ava = avatarNeutrals[Math.floor(Math.random() * avatarNeutrals.length)]
            else if (group.id == "1013345855761285150") ava = avatarCS[Math.floor(Math.random() * avatarCS.length)]
            else if (group.id == "1013345863894061086") ava = avatarRenegats[Math.floor(Math.random() * avatarRenegats.length)]
            else if (group.id == "1045789565492932738") ava = avatarDOLG[Math.floor(Math.random() * avatarDOLG.length)]
            else if (group.id == "1041723317821915247") ava = avatarSvoboda[Math.floor(Math.random() * avatarSvoboda.length)]
            else if (group.id == "1029087229525631016") ava = avatarUN[Math.floor(Math.random() * avatarUN.length)]
            else if (group.id == "1013346374173081670") ava = avatarGrech[Math.floor(Math.random() * avatarGrech.length)]
            else if (group.id == "1013346488929234954") ava = avatarMerc[Math.floor(Math.random() * avatarMerc.length)]
            else if (group.id == "1013345656137601054") ava = avatarSientis[Math.floor(Math.random() * avatarSientis.length)]
            else if (group.id == "1013345968814571620") ava = avatarMonolith[Math.floor(Math.random() * avatarMonolith.length)]
            else if (group.id == "1013346059998724186") {
                if      (name == "Сидорович")          { ava = "https://static.wikia.nocookie.net/stalker/images/3/3a/Icon_SoC_character_trader.png/revision/latest?cb=20210313091759&path-prefix=ru" }
                else if (name == "Бармен")             { ava = "https://static.wikia.nocookie.net/stalker/images/2/25/Icon_SoC_character_barman.png/revision/latest?cb=20220115072446&path-prefix=ru" }
                else if (name == "Полковник Петренко") { ava = "https://static.wikia.nocookie.net/stalker/images/b/be/Icon_SoC_character_stalker_do_balon_3.png/revision/latest?cb=20210626074246&path-prefix=ru" }
                else if (name == "Профессор Сахаров")  { ava = "https://static.wikia.nocookie.net/stalker/images/2/22/Icon_SoC_character_ucheniy_2.png/revision/latest?cb=20210626112025&path-prefix=ru" }
                else if (name == "Скряга")             { ava = "https://static.wikia.nocookie.net/stalker/images/4/4b/Icon_SoC_character_stalker_sv_balon_1.png/revision/latest?cb=20210626072205&path-prefix=ru" }
                else if (name == "Ашот")               { ava = "https://static.wikia.nocookie.net/stalker/images/2/24/Icon_CS_character_freedom_2_mask.png/revision/latest?cb=20210626072807&path-prefix=ru" }
                else if (name == "Зуб")                { ava = "https://static.wikia.nocookie.net/stalker/images/0/03/Icon_CS_character_bandit_3.png/revision/latest?cb=20210626095331&path-prefix=ru" }
                else if (name == "Шилов")              { ava = "https://static.wikia.nocookie.net/stalker/images/d/d3/Icon_CS_character_neutral_2_mask.png/revision/latest?cb=20210221120857&path-prefix=ru" }
                else if (name == "Сыч")                { ava = "https://static.wikia.nocookie.net/stalker/images/9/99/Icon_CoP_character_Sich.png/revision/latest?cb=20210221121919&path-prefix=ru" }
                else if (name == "Шустрый")            { ava = "https://static.wikia.nocookie.net/stalker/images/7/7e/Icon_SoC_character_green_stalker_1.png/revision/latest?cb=20210221111322&path-prefix=ru" }
                else if (name == "Борода")             { ava = "https://static.wikia.nocookie.net/stalker/images/d/d0/Icon_CoP_character_Boroda.png/revision/latest?cb=20210221121919&path-prefix=ru" }
                else if (name == "Гаваец")             { ava = "https://static.wikia.nocookie.net/stalker/images/9/9f/Icon_CoP_character_Gavaets.png/revision/latest?cb=20210221121919&path-prefix=ru" }
                else ava = avatar
            }
            await channel.createWebhook({
                name: name,
                avatar: ava,
            })

            const WebHooksInChannel = await channel.fetchWebhooks();
            //console.log(WebHooksInChannel.find(el => el.name == name).id)
            const WebHooksChannel = await WebHooksInChannel.find(el => el.name == name)

            await WebHooksChannel.send({
                embeds: [embed] //.setColor(color)
            })
            await WebHooksChannel.delete()


        } catch (err) {
            console.log(err)
        }
    }
}