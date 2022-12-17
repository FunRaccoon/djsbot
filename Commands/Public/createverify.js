const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createverify')
        .setDescription('Set your verification channel')
        .setDMPermission(false)
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Send verification embed in this channel')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel')
        const verifyEmbed = new EmbedBuilder()
            .setTitle("Verifycation")
            .setDescription('Нажмите кнопку, чтобы верифицировать свою учетную запись и получить доступ к каналам.')
            .setColor(0x5fb041)
        let sendChannel = channel.send({
            embeds: ([verifyEmbed]),
            components: [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('verify').setLabel('Verify').setStyle(ButtonStyle.Success),
                ),
            ],
        })
        if (!sendChannel) {
            return interaction.reply({ content: 'Это была ошибка! Попробуйте позже.', ephemeral: true })
        } else {
            return interaction.reply({ content: 'Канал проверки был успешно установлен', ephemeral: true })
        }
    },
}