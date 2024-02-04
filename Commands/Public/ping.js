const { SlashCommandBuilder } = require('discord.js')
//const fs = require('fs')
//const test = require('../../../test/test.txt')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong'),
    execute(interaction) {
        //fs.appendFileSync("../../../test/test.txt", "\n4")
        interaction.reply({content: "Pong", ephemeral: true})
    }
}