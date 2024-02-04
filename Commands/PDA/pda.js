const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const { avatarBandits, avatarCS, avatarDOLG, avatarVSU, avatarGrech, avatarMerc, avatarMonolith, avatarNeutrals, avatarRenegats, avatarSientis, avatarStalker, avatarSvoboda, avatarUN } = require('../../avatar.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pda")
        .setDescription("Отправление сообщения в общую сеть PDA")
        .setDMPermission(false)
        //.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName("text")
                .setDescription("Cообщение")
                .setRequired(true)
                .setMaxLength(255)
        )
        .addBooleanOption(option =>
            option.setName("anonim")
                .setDescription("Анонимно или нет")
                .setRequired(true)
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
            "1013346488929234954", //mercenaries 11+🍺
            "1013345656137601054", //sientist    12+
            "1013345968814571620"  //monolith    13+
        ]
        const { options, member, channel, command } = interaction
        try {
            if (channel.id != "1045822074071044279")
                return interaction.reply({ content: "Кпк не тут!", ephemeral: true })
            //if (member.nickname.split("|")[1].trim().length == 0)   Если бот упадёт (Внизу будет ошибка) кричите, я полежать пошёл

            //return interaction.reply({ content: "У тебя проблема с ником", ephemeral: true })

            const name = member.nickname//.split("|")[1].trim()
            const anon = options.getBoolean("anonim")
            const text = options.getString("text")
            const embed = new EmbedBuilder()
                .setTitle(`Сообщение: ${text}`)
                .setTimestamp()


            if (text.length > 255)
                return interaction.reply({ content: "Сообщение не может превышать 2000 символов", ephemeral: true })
            let l = 0;
            for (let i = 0; i < groupsID.length; i++) {
                if (member._roles.includes(groupsID[i])) {
                    l++;
                    if (l != 1)
                        return interaction.reply({ content: "Ты из какой группировки?", ephemeral: true })
                    else if (l == 0) {
                        return interaction.reply({ content: "Ты без группировки", ephemeral: true })
                    }
                }
                //if (s) {}
            }

            if (member.nickname == null)
                return interaction.reply({ content: "У тебя проблема с ником", ephemeral: true})

            if (anon) {
                interaction.reply({ content: "Сообщение отправлено", ephemeral: true })
                await channel.createWebhook({
                    name: 'Аноним',
                    avatar: 'https://steamuserimages-a.akamaihd.net/ugc/80345569855693596/625F74CBD54E707C9C4589C60288416A098143B3/',
                })

                //let m = member._roles
                //if(member.roles.cache.has("1046214690956644413")) console.log('1')
                const WebHooksInChannel = await channel.fetchWebhooks();
                //console.log(WebHooksInChannel.find(el => el.name == "Anon").id)
                const WebHooksChannel = await WebHooksInChannel.find(el => el.name == "Аноним")

                await WebHooksChannel.send({
                    embeds: [embed]//.setColor("Random")]
                })
                await WebHooksChannel.delete()//.then(console.log("1"))
            } else {
                interaction.reply({ content: "Сообщение отправлено", ephemeral: true })
                let ava;
                if (member.roles.cache.has("1013345052132638822")) ava = avatarStalker[Math.floor(Math.random() * avatarStalker.length)]
                else if (member.roles.cache.has("1045791184393609227")) ava = avatarBandits[Math.floor(Math.random() * avatarBandits.length)]
                else if (member.roles.cache.has("1013345499652313088")) ava = avatarVSU[Math.floor(Math.random() * avatarVSU.length)]
                else if (member.roles.cache.has("1013346010279444570")) ava = avatarNeutrals[Math.floor(Math.random() * avatarNeutrals.length)]
                else if (member.roles.cache.has("1013345855761285150")) ava = avatarCS[Math.floor(Math.random() * avatarCS.length)]
                else if (member.roles.cache.has("1013345863894061086")) ava = avatarRenegats[Math.floor(Math.random() * avatarRenegats.length)]
                else if (member.roles.cache.has("1045789565492932738")) ava = avatarDOLG[Math.floor(Math.random() * avatarDOLG.length)]
                else if (member.roles.cache.has("1041723317821915247")) ava = avatarSvoboda[Math.floor(Math.random() * avatarSvoboda.length)]
                else if (member.roles.cache.has("1029087229525631016")) ava = avatarUN[Math.floor(Math.random() * avatarUN.length)]
                else if (member.roles.cache.has("1013346374173081670")) ava = avatarGrech[Math.floor(Math.random() * avatarGrech.length)]
                else if (member.roles.cache.has("1013346488929234954")) ava = avatarMerc[Math.floor(Math.random() * avatarMerc.length)]
                else if (member.roles.cache.has("1013345656137601054")) ava = avatarSientis[Math.floor(Math.random() * avatarSientis.length)]
                else if (member.roles.cache.has("1013345968814571620")) ava = avatarMonolith[Math.floor(Math.random() * avatarMonolith.length)]
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
            }

        } catch (err) {
            console.log(err)
        }
    }
}