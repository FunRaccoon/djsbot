const { CommandInteraction } = require('discord.js')

module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName)

            if (!command) {
                interaction.reply({ content: "устаревшая команда" })
            }

            command.execute(interaction, client)
        } else if (interaction.isButton()) {
            const { customId } = interaction;

            if (customId == "verify") {
                const role = interaction.guild.roles.cache.get('1046214690956644413')
                return interaction.member.roles
                    .add(role)
                    .then((member) =>
                        interaction.reply({
                            content: `${role} была вам назначена`,
                            ephemeral: true
                        })
                    )
            }
        } else {
            return;
        }
    },
}