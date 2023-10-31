const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cjhelp')
		.setDescription('bot instructions'),
	async execute(interaction) {
		const exampleEmbed = {
			components: [
				{
					type: 1,
					components: [
						// {
						// 	style: 5,
						// 	label: '抖音',
						// 	url: 'https://www.douyin.com/user/MS4wLjABAAAA8S8lCi35OJuZJPWU22rs1HQk3VEJ8EN5HPdeJLBYl5k',
						// 	disabled: false,
						// 	emoji: {
						// 		id: null,
						// 		name: '🎵',
						// 	},
						// 	type: 2,
						// },
						{
							style: 5,
							label: 'Website',
							url: 'https://douxcj.wixsite.com/ricewizblitz',
							disabled: false,
							emoji: {
								id: null,
								name: '🖥️',
							},
							type: 2,
						},
						{
							style: 5,
							label: 'Community',
							url: 'https://discord.gg/XKAxFjKqye',
							disabled: false,
							emoji: {
								id: null,
								name: '🙌',
							},
							type: 2,
						},
					],
				},
			],
			embeds: [
				{
					type: 'rich',
					title: 'Hello, I am RiceWizBlitz',
					description: 'Free 24/7 AI Music and Chat Bot',
					color: 0xd07093,
					fields: [
						{
							name: '**Music Playback Instruction**',
							value: 'Type slash "/" in any text channel to search or use a command \n \
							You must be in a voice channel for music playback \n \
							The bot can only play music in 1 voice channel in 1 server \n \
							/cjplay + Enter + song name                     -> play or queue music \n \
							/cjhelp                                       -> instructions \n \
							/cjrand                                       -> randomly play 1 music, can add customized requirements \n \
							/cjlist                                         -> check current list\n \
							/cjnext                                       -> next song\n \
							/cjstop                                       -> get me out',
							inline: true,
						},
						{
							name: '**Help you choose a champion for league of legends**',
							value: 'Type "/cjchoose", + Enter + choose a lane from dropdown + input howmany (optional)',
							name: '**AI ChatBot**',
							value: '@RiceWizBlitz and ask me anything or chat with me. Or tell me you to play some music',
						},
					],
					timestamp: '2023-10-24T00:00:00.000Z',
					image: {
						url: 'https://assets.babylist.com/assets/giveaway/canadian/footer_flowers-8712aa9cd808944b875ecdf544c143a95c1a52d9c4584942c2db0d158b46f9e3.png',
						height: 0,
						width: 0,
					},
					thumbnail: {
						url: 'https://64.media.tumblr.com/67ff34800800d0a1aa9befb92031d2ac/tumblr_p5bssiNcVB1tbpqalo1_500.png',
						height: 100,
						width: 0,
					},
					footer: {
						text: 'bot powered by Honma Meikoo',
						icon_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj5i9NpIFf9oUBcSeXCH5_EOZNjqXDDMUJxw&usqp=CAU',
					},
				},
			],
		};

		await interaction.reply({ embeds: exampleEmbed.embeds, components: exampleEmbed.components });
	},
};

