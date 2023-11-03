// get input from bot owner and make announcement as bot
const fs = require('node:fs');
const path = require('node:path');
const { SlashCommandBuilder } = require('discord.js');
const config = require('../../config.js');
// get owner id
const owner_id =config.owner_id;

try {
	
	module.exports = {
	data: new SlashCommandBuilder()
		.setName('cjadmin')
		.setDescription('Make announcement as bot (bot owner only)')
		.addStringOption(option =>
			option.setName('text')
				.setDescription('The announcement you want to make')),
	async execute(interaction) {
		console.log("User is using command cjplay")
		if (interaction.user.id !== owner_id) {
			return interaction.reply('Sorry, only the bot owner can use this command.');
		}
		const input = interaction.options.getString('text');

		await interaction.reply(`${input}`);
	},
};} catch (error) {
	console.log("Executing cjadmin has error!")
    console.log(error)
}
