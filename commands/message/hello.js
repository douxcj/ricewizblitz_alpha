const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('test by saying hi!'),
	async execute(interaction) {
		await interaction.reply('Hello, I am running!');
	},
};
