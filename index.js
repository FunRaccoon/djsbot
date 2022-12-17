const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js')
const gamedig = require("gamedig");

const { Guilds, GuildMembers, GuildMessages, MessageContent} = GatewayIntentBits
const { User, Message, GuildMember, ThreadMember, Channel} = Partials

const { loadEvents } = require('./Handlers/eventHandler')
const { loadCommands } = require('./Handlers/commandHandler')

const client = new Client({
    fetchAllMembers: true,
    intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
    Partials: [User, Message, GuildMember, ThreadMember]
})

async function online() {
	gamedig.query({type: 'dayz', host: '109.248.4.50', port: '2403'
		}).then((state) => {
			client.user.setActivity(`cервер, онлайн: ${state.raw.numplayers}/${state.maxplayers}`, {type: 3});
		}).catch((err) => {
			client.user.setActivity(`cервер, offline`, {type: 3});
		});
}

client.commands = new Collection()
client.config = require('./config.json')

client.login(client.config.token).then(() => {
    loadEvents(client)
    loadCommands(client)
})

client.on('ready', async () => {
    online()
    setInterval(online, 1000)
})