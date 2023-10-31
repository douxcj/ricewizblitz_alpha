const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const {QueryType} = require("discord-player")
const config = require('../../config.js');
const OpenAIApi = require('openai');

// Configuration for OpenAI API
const configuration = {
    apiKey: config.API_key, // Replace with your OpenAI API key
  };
  
  const openai = new OpenAIApi(configuration);
  

module.exports = {
    data: new SlashCommandBuilder()
    .setName("cjrand")
    .setDescription("new play command")
    .addStringOption(option => option
        .setName("typeofsong")
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
       try {
            const stri = interaction.options.getString("247")
            const check = interaction.options.getString("typeofsong")
            console.log(check);

            // Check if the user is in a voice channel
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                return interaction.reply("You must be in a voice channel to use this command.");
            }
            
            // Conversation log
            let conversationLog = [
                {
                role: 'system',
                content: 'You are RiceWizBlitz_alpha, who is an advanced AI bot for Discord. Created by CJ, you are designed for both music and conversation. Users can access the comprehensive user guide via the /cjhelp command. To request music playback, utilize the /cjplay command. A specific case for you to note: if the most recent incoming question from the users involves playing music or I want to listen to music or something like that, please respond with a popular song or a lesser-known track, please respond with "Suggested: song name." Feel free to recommend any suitable song, ensuring it\'s in this format "Suggested: song name." without any additional text.',
                },
            ];
            conversationLog.push({
            role: 'user',
            content: check,
            });


            // Extract the response from the result
            const gptresult = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: conversationLog,
              });
            chatGPTResponse = String(gptresult.choices[0].message.content);

            if (chatGPTResponse) {
            console.log('Start to play');

            const searchString = chatGPTResponse;
            console.log(searchString);

            if (!searchString) {
                return message.channel.send('No search string provided!');
            }

           const result = await interaction.client.player.search(searchString, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
            })
            console.log(result);


            const results = new EmbedBuilder()
            .setTitle(`No results`)
            .setColor(`#ff0000`)
            .setTimestamp()

            if (!result.hasTracks()) {
                return interaction.reply({embeds: [results]})
            }

            await interaction.reply({ content: 'I am loading/adding the song for you :)', ephemeral: true });

            // TODO: check if user is currently in voice channel

            const yes = await interaction.client.player.play(interaction.member.voice.channel?.id, result, {
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
            }
        }catch (error) {
            console.log(error)
    }
}}