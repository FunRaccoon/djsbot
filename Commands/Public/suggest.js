const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const suggestionSchema = require('../../Models/Suggestion')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("suggest")
        .setDMPermission(false)
        .setDescription("Заполните анкету")
        .addStringOption(option =>
            option.setName("nick")
                .setDescription("Напишите позывной")
                .setRequired(true)
                .setMaxLength(20)
        )
        .addNumberOption(option =>
            option.setName("age")
                .setDescription("Напишите реальный возраст")
                .setRequired(true)
                .setMaxValue(100)
        )
        .addStringOption(option =>
            option.setName("steamid")
                .setDescription("Напишите ваш SteamID_64")
                .setRequired(true)
                .setMaxLength(17)
                .setMinLength(17)
        )
        .addBooleanOption(option =>
            option.setName("rules")
                .setDescription("Подтвердите прочтение правил серрвера")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { options, guildId, member, user, guild } = interaction

        const gameName = options.getString("nick")
        const age = options.getNumber("age")
        const SteamID = options.getString("steamid")
        const Rule = options.getBoolean("rules")
        let channel;

        //if (type == "Idea")
        channel = guild.channels.cache.get("1047530549188755566")
        //else channel = guild.channels.cache.get("1046572042075508837")

        const embed = new EmbedBuilder()
            .setColor("Orange")
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true }) })
            .addFields(
                { name: "Позывной", value: gameName, inline: false },
                { name: "Возраст", value: `${age}`, inline: false },
                { name: "Discord Tag", value: `<@${user.id}>`, inline: false }
            )
            .addFields(
                { name: "SteamID64", value: SteamID, inline: true },
                { name: "Прочтение правил", value: `${Rule}`, inline: true },
                { name: "Статус", value: "В процессе", inline: true },
            )
            .setTimestamp()

        const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("suggest-accept").setLabel("✅ Одобрить").setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId("suggest-deceline").setLabel("⛔ Отказать").setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId("suggest-process").setLabel("👋 Вызвать на собеседование").setStyle(ButtonStyle.Primary),
        )

        try {
            const testToRu = /[a-zA-Z0-9]/;
            //console.log(gameName)
            //console.log(testToRu.test(embed.data.fields[0].value))
            if (testToRu.test(embed.data.fields[0].value) === true)
                return interaction.reply({ content: "Позывной должен быть на русском и без цифр", ephemeral: true })

            const m = await channel.send({ content: `<@&1020177582936821770>`, embeds: [embed], components: [buttons], fetchReply: true })
            //await channel.send({content: "Use `/suggest` in the bot-commands channel to submit your suggestion"})
            await interaction.reply({ content: "Заявка была успешно отправлена", ephemeral: true })

            await suggestionSchema.create({
                GuildID: guildId, MessageID: m.id, Details: [
                    {
                        MemberID: member.id,
                        //Type: type,
                        //Suggestion: description
                    }
                ]
            })
        } catch (err) {
            console.log(err)
        }
    }
}