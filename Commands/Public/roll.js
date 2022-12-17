const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('roll')
        .addNumberOption(option =>
            option.setName("min")
                .setDescription("min value")
                .setRequired(true)
        )
        .addNumberOption(option =>
            option.setName("max")
                .setDescription("max value")
                .setRequired(true)
        ),
    async execute(interaction) {
        const {options, guild} = interaction
        const min = Math.ceil(options.getNumber("min"))
        const max = Math.floor(options.getNumber("max"))
        if(min <= 0 || max <= 0)
            return interaction.reply({ content: "Значения не могут быть меньше 0", ephemeral: true})
        interaction.reply({ content: `${Math.floor((Math.random() * (max - min + 1)) + min)}`, ephemeral: true })
    }
}