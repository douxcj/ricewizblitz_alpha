const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cjlist')
        .setDescription('Shows the current queue of music'),
    async execute(interaction) {
        const queue = interaction.client.player.nodes.get(interaction.guild)
        
        if (!queue || queue.tracks.length === 0) {
            return void interaction.reply({
                content: 'There is nothing in the queue right now!',
                ephemeral: false,
            });
        }

        // TODO: make queue work
        let content = `**Current Queue:**\n`;
        for (let i = 0; i < queue.tracks.data.length; i++) {
            console.log("hello!!")
            console.log(queue.tracks.data[0].title)
            content += `${i + 1}. ${queue.tracks.data[i].title} - Requested by **${queue.tracks.data[i].requestedBy.username}**\n`;
        }

        interaction.reply({ content});
    },
};
