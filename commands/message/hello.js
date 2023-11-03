const { SlashCommandBuilder } = require('discord.js');

try {
	module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('test by saying hi!'),
	async execute(interaction) {
		await interaction.reply('Hello, I am running!');
	},
};
}catch (error) {
    console.log("Executing hello has error!")
    console.log(error)
}

