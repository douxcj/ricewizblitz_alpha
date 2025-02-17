const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const {QueryType} = require("discord-player")

try {
    
    module.exports = {
        data: new SlashCommandBuilder()
        .setName("cjplay")
        .setDescription("new play command")
        .addStringOption(option => option
            .setName("song")
            .setDescription("query")
            .setRequired(true))
            .addStringOption(option => option
                .setName("247")
                .setDescription("24/7")
                .addChoices(
                    {name: "yes", value: "false"},
                    {name: "no", value: "true"}
                )
            ),
        async execute(interaction) {
            console.log("User is using command cjplay")
           try {
                const stri = interaction.options.getString("247")
                const check = interaction.options.getString("song")
                
                
               const result = await interaction.client.player.search(check, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            //console.log(result);
    
    
            const results = new EmbedBuilder()
            .setTitle(`No results`)
            .setColor(`#ff0000`)
            .setTimestamp()
    
            if (!result.hasTracks()) {
                return interaction.reply({embeds: [results]})
            }
    
            //await interaction.deferReply()
            //await interaction.editReply({ content: `Loading a: ${result.playlist ? 'playlist' : 'track' }`})
            await interaction.reply({ content: 'I am loading/adding the song for you :)', ephemeral: true });
    
            // TODO: check if user is currently in voice channel
            
    
            const yes = await interaction.client.player.play(interaction.member.voice.channel, result, {
                nodeOptions: {
                    metadata: {
                        channel: interaction.channel,
                        client: interaction.guild?.members.me,
                        requestedBy: interaction.user.username
                    },
                    volume: 20,
                    bufferingTimeout: 3000,
                leaveOnEnd: stri === "false" ? false : true
                  },
                
            })
            
            const embed = new EmbedBuilder()
            function yess() {
                const totalDurationMs = yes.track.playlist.tracks.reduce((a, c) => c.durationMS + a, 0)
                const totalDurationSec = Math.floor(totalDurationMs / 1000);
                const hours = Math.floor(totalDurationSec / 3600);
                const minutes = Math.floor((totalDurationSec % 3600) / 60);
                const seconds = totalDurationSec % 60;
                const durationStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                return durationStr
            }
            
            embed
                .setDescription(`${yes.track.playlist ? `**multiple tracks** from: **${yes.track.playlist.title}**` : `**${yes.track.title}**`}`)
                .setThumbnail(`${yes.track.playlist ? `${yes.track.playlist.thumbnail.url}` : `${yes.track.thumbnail}`}`)
                .setColor(`#d07093`)
                .setTimestamp()
                .setFooter({ text: `Duration: ${yes.track.playlist ? `${yess()}` : `${yes.track.duration}`} | Event Loop Lag ${interaction.client.player.eventLoopLag.toFixed(0)}` })
            
                return interaction.editReply({ embeds: [embed ]})
            }catch (error) {
                console.log(error)
            }
        }
    }
    
    
}catch (error) {
    console.log("Executing cjplay has error!")
    console.log(error)
}
