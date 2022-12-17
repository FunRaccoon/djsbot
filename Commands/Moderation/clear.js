const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Удаление сообщений")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Amount')
                .setRequired(true)
                .setMaxValue(99)
                .setMinValue(1)
        ),

    async execute(interaction) {
        const { channel, options } = interaction

        const amount = options.getInteger('amount')

        const messages = await channel.messages.fetch({
            limit: amount + 1,
        })

        const res = new EmbedBuilder()
            .setColor(0x5fb041)
        await channel.bulkDelete(amount, true).then(messages => {
            res.setDescription(`Успешно удалено ${messages.size} сообщений из канала`)
            interaction.reply({ embeds: [res], ephemeral: true})
        })
    }
}
