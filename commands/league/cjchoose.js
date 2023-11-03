const all_champs = {
	top: [
		'Aatrox', 'Akali', 'Camille', 'Darius', 'Dr. Mundo', 'Fiora', 'Gangplank',
		'Garen', 'Gnar', 'Irelia', 'Jax', 'Jayce', 'Kayle', 'Kennen', 'Kled',
		'Lillia', 'Malphite', 'Maokai', 'Mordekaiser', 'Nasus', 'Ornn', 'Pantheon',
		'Poppy', 'Quinn', 'Renekton', 'Rengar', 'Riven', 'Sett', 'Shen', 'Singed',
		'Sion', 'Teemo', 'Trundle', 'Tryndamere', 'Urgot', 'Vayne', 'Volibear',
		'Wukong', 'Yasuo', 'Yone', 'Yorick', 'K\'Sante', 'Gwen'
	],
	jg: [
		'Amumu', 'Elise', 'Evelynn', 'Fiddlesticks', 'Gragas', 'Graves', 'Hecarim',
		'Ivern', 'Jarvan IV', 'Jax', 'Karthus', 'Kha\'Zix', 'Lee Sin', 'Lillia',
		'Master Yi', 'Nidalee', 'Nocturne', 'Nunu & Willump', 'Olaf', 'Poppy',
		'Rek\'Sai', 'Rengar', 'Sejuani', 'Shaco', 'Skarner', 'Taliyah', 'Trundle',
		'Udyr', 'Vi', 'Volibear', 'Warwick', 'Xin Zhao', 'Zac', 'Briar', 'Bel\'Veth', 'Viego', 
	],
	mid: [
		'Ahri', 'Akali', 'Anivia', 'Annie', 'Aurelion Sol', 'Azir', 'Cassiopeia',
		'Corki', 'Diana', 'Ekko', 'Fizz', 'Galio', 'Gangplank', 'Heimerdinger',
		'Irelia', 'Jayce', 'Kassadin', 'Katarina', 'LeBlanc', 'Lillia', 'Lissandra',
		'Lucian', 'Malphite', 'Malzahar', 'Neeko', 'Orianna', 'Qiyana', 'Rumble',
		'Ryze', 'Sylas', 'Syndra', 'Talon', 'Twisted Fate', 'Veigar', 'Viktor',
		'Xerath', 'Yasuo', 'Yone', 'Zed', 'Ziggs', 'Zoe', 'Naafiri', 'Vex', 'Akshan'
	],
	bot: [
		'Aphelios', 'Ashe', 'Caitlyn', 'Draven', 'Ezreal', 'Jhin', 'Jinx', 'Kai\'Sa',
		'Kalista', 'Kog\'Maw', 'Miss Fortune', 'Samira', 'Senna', 'Sivir', 'Tristana',
		'Twitch', 'Varus', 'Vayne', 'Xayah', 'Nilah', 'Zeri',
	],
	sup: [
		'Alistar', 'Bard', 'Blitzcrank', 'Braum', 'Galio', 'Janna', 'Karma',
		'Leona', 'Lulu', 'Lux', 'Morgana', 'Millio', 'Nami', 'Nautilus', 'Pyke', 'Rakan', 'Senna', 'Seraphine', 'Sona', 'Soraka', 'Swain', 'Tahm Kench', 'Taric', 'Thresh', 'Yuumi', 'Zilean', 'Renata Glasc', 'Rell', 
	],
};
const { SlashCommandBuilder } = require('discord.js');

try {
	const getRandomChampion = (lane) => {
		let champs;
		if (lane === 'all') {
			const lanes = Object.keys(all_champs);
			const randomLaneIndex = Math.floor(Math.random() * lanes.length);
			const randomLane = lanes[randomLaneIndex];
			champs = all_champs[randomLane];
		}
		else {
			champs = all_champs[lane];
		}
		const randomIndex = Math.floor(Math.random() * champs.length);
		return champs[randomIndex];
	};
	
	module.exports = {
		data: new SlashCommandBuilder()
			.setName('cjchoose')
			.setDescription('Select a random champion for a given lane')
			.addStringOption((option) =>
				option.setName('lane')
					.setDescription('The lane for which to select a champion')
					.setRequired(true)
					.addChoices(
						{ name: 'Top', value: 'top' },
						{ name: 'Jungle', value: 'jg' },
						{ name: 'Mid', value: 'mid' },
						{ name: 'Bot', value: 'bot' },
						{ name: 'Support', value: 'sup' },
					),
			)
			.addIntegerOption((option) =>
				option
					.setName('number')
					.setDescription('The number of champions to select (default: 1)'),
			),
		async execute(interaction) {
			const lane = interaction.options.getString('lane');
			const number = interaction.options.getInteger('number') || 1;
	
			const champions = [];
			for (let i = 0; i < number; i++) {
				const champion = getRandomChampion(lane);
				champions.push(champion);
			}
	
			const championList = champions.join(', ');
	
			await interaction.reply(
				`Hey <@!${interaction.user.id}>! The ${number} champion(s) I picked for you for the ${lane} lane is: ${championList}`,
			);
		},
	};
	
	

}catch (error) {
    console.log("Executing cjchoose has error!")
    console.log(error)
}
