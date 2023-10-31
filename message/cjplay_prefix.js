// const ytdl = require('@distube/ytdl-core');
// const ytSearch = require('yt-search');
// const { getVoiceConnection } = require('@discordjs/voice');

// module.exports = {
// 	name: 'messageCreate',
// 	async execute(message) {
// 		console.log('cjplay.js accessed!');

// 		if (message.content.startsWith('cjplay')) {
// 			console.log(message);
// 			// eslint-disable-next-line no-inline-comments
// 			const content = message.content.substring(7).trim(); // Extract the content after 'cjplay'

// 			// Send a reply with the extracted content
// 			message.channel.send(`You entered: ${content}`);

// 			const searchString = content;
// 			console.log(searchString);

// 			try {
// 				let youtubeLink;
// 				if (!searchString) {
// 					return message.channel.send('No search string provided!');
// 				}
// 				if (!searchString.includes('youtube.com')) {
// 					const results = await ytSearch(searchString);
// 					if (!results?.all?.length) {
// 						return message.channel.send('No results found for your search string. Please try a different one.');
// 					}
// 					youtubeLink = results.all[0].url;
// 				}
// 				else {
// 					youtubeLink = searchString;
// 				}

// 				console.log(youtubeLink);
// 				const downloadInfo = await ytdl.getInfo(youtubeLink);
// 				// Play the track in the voice channel (replace VOICE_CHANNEL with your desired voice channel ID)
// 				// if (!message.guild.me.voice.channel) {
// 				// 	// Join the voice channel
// 				// 	const connection = await message.member.voice.channel.join();
// 				// 	// Play the track
// 				// 	connection.play(downloadInfo.videoDetails.video_url);
// 				// } else {
// 				// 	return message.channel.send('I am already playing in a voice channel!');
// 				// }
// 				const connection = getVoiceConnection(message.guildId);
// 				connection.play(downloadInfo.videoDetails.video_url);

// 				return message.channel.send(`Now playing **${downloadInfo.videoDetails.title}**`);
// 			}
// 			catch (e) {
// 				console.log(e);
// 				return message.channel.send('Failed to play track!');
// 			}
// 		}
// 	},
// };
