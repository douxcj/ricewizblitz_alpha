require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, ActivityType, Collection, Partials, WebhookClient } = require('discord.js');
const setupMessageHandler = require('./message/ask.js'); // Import the setup function

//const { token } = require('./config.json');
const token = process.env.DISCORD_TOKEN;
const { YouTubeExtractor } = require("@discord-player/extractor");
const {cyanBright, gray} = require("colorette")


// const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
	partials: [Partials.Channel,
	Partials.GuildMember,
	Partials.Message,
	Partials.Reaction,
	Partials.User],
	presence: {
	  status: 'online',
	  activities: [{
		name: 'MUSIC BOT BY CJ',
		type: ActivityType.Playing
	  }]
	}
  }
);


const { Player } = require('discord-player');

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// command handler
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Add the player on the client
client.player = new Player(client, {
	deafenOnJoin: true,
	lagMonitor: 1000,
	ytdlOptions: {
	  filter: "audioonly",
	  quality: "highestaudio",
	  highWaterMark: 1 << 25
	}
})

// enables youtube extractor
client.player.extractors.register(YouTubeExtractor);
  
  
client.player.events.on('playerStart', (queue, track) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}** requested by **${queue.metadata.requestedBy}**!`));
client.player.events.on('error', (queue, error) => console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`));
client.player.events.on('debug', (_queue, message) => console.log(`[${cyanBright('DEBUG')}] ${gray(message)}\n`));


// event handler
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
  	const event = require(filePath);

  	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
    	client.on(event.name, (...args) => event.execute(...args))
  }
}

//message handler
setupMessageHandler(client);



client.login(token);