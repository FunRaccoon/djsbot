const {model, Schema} = require('mongoose')

let ticketSetup = new Schema({
    GuildID: String,
    Channel: String,
    Category: String,
    Transcripts: String,
    Handlers: String,
    Everyone: String,
    Desctiprion: String,
    Buttons: [String],
})

module.exports = model("TicketSetup", ticketSetup)