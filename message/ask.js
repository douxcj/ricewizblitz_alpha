// Import required modules
const OpenAIApi = require('openai');
const config = require('../config.js');
// Import the cjplay command from cjplay.js
const cjplay = require('../commands/music/cjplay.js');

// Configuration for OpenAI API
const configuration = {
  apiKey: config.API_key, // Replace with your OpenAI API key
};

const openai = new OpenAIApi(configuration);

try {
  module.exports = (client) => {
    client.on('messageCreate', async (message) => {

      if (message.content.length > 2000) {
        console.log("** The message is too long")
        return;
      }

      console.log("!***** A message is received:*******! ")
      console.log(`***The message received is ${message.content}`)
      const userId = message.author.id;
      console.log(`***The user id of this message is ${userId}`)
      const userName = message.author.username;
      console.log(`***The user name of this message is ${userName}`)
      const guildId = message.guildId;
      console.log(`***The server id of this message is ${guildId}`)
      const guildName = message.guild.name;
      console.log(`***The server name of this message is ${guildName}`)


      if (message.author.bot) return;
  
      // Check if the bot is mentioned
      if (message.mentions.has(client.user)) {
        // Extract the user's question from the message content
        const question = message.content.replace(/<@!\d+>/, '').trim(); // Remove the mention and trim whitespace
  
        // Ensure there's a valid question
        if (!question) return;
  
        
  
        // Conversation log
        // let conversationLog = [
        //   {
        //     role: 'system',
        //     content: 'You are a discord AI chat and music bot. Your creator is CJ. Your name is RiceWizBlitz. Your user guide can be accessed by using the command /cjhelp. The basic command to play music using you is /cjplay. Note one special case: if you detect the question input has anything like ask you to play some music, or play some random music, or play some music from some particular artist, please respond with "Suggested: song name". You can suggest any song name you think is appropriate, can be songs that are not so popular, but please only respond with that format, no other words.',
        //   },
        // ];
  
        let conversationLog = [
          {
            role: 'system',
            content: 'You are RiceWizBlitz_alpha, who is an advanced AI bot for Discord. Created by CJ, you are designed for both music and conversation. Users can access the comprehensive user guide via the /cjhelp command. To request music playback, utilize the /cjplay command. Responding to any of the question do not exceed 200 words. A specific case for you to note: if the most recent incoming question from the users involves playing music or I want to listen to music or something like that, please respond with a popular song or a lesser-known track, please respond with "Suggested: song name." Feel free to recommend any suitable song, ensuring it\'s in this format "Suggested: song name." without any additional text. '
          },
        ];
      
  
        try {
          const voiceConnections = new Map();
          let prevMessages = await message.channel.messages.fetch({ limit: 3 });
          prevMessages.reverse();
  
          prevMessages.forEach((msg) => {
            if (msg.content.startsWith('/')) return;
            if (msg.author.id !== client.user.id && message.author.bot) return;
            if (msg.author.id == client.user.id) {
              conversationLog.push({
                role: 'assistant',
                content: msg.content,
                name: msg.author.username
                  .replace(/\s+/g, '_')
                  .replace(/[^\w\s]/gi, ''),
              });
            }
  
            if (msg.author.id == message.author.id) {
              conversationLog.push({
                role: 'user',
                content: msg.content,
                name: message.author.username
                  .replace(/\s+/g, '_')
                  .replace(/[^\w\s]/gi, ''),
              });
            }
          });
  
          // Send a typing indicator while generating the response
          await message.channel.sendTyping();
  
          const result = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: conversationLog,
          });
  
          // Extract the response from the result
          chatGPTResponse = String(result.choices[0].message.content);
  
          if (chatGPTResponse && chatGPTResponse.startsWith('Suggested')) {
            // The response starts with 'Suggested', proceed to play the song
  
            const searchString = chatGPTResponse.replace("Suggested:", "");
            console.log(searchString);
  
            // Create a mock interaction object with the user's input
            const interaction = {
              client: client,
              user: message.author,
              channel: message.channel,
              options: {
                getString: (optionName) => {
                  if (optionName === 'song') {
                    return searchString;
                  }
                  if (optionName === '247') {
                    return 'false'; // Set this as per your requirements
                  }
                },
              },
          
            reply: (response) => {
              // Handle the response here if needed
              // For example, you can send a reply to the user.
              message.reply(response);
              },
            };
          // Pass the voice channel ID to the interaction object
          interaction.member = { voice: { channel: message.member.voice.channel.id } };
          // Execute the cjplay command
          cjplay.execute(interaction);
        } else {
          message.reply(chatGPTResponse).catch(console.error);
          }
        } 
        catch (error) {
          console.error(`Error: ${error.message}`);
          message.reply('Sorry, the AI bot is not available right now. Please try again later.');
        }
      }
    });
  };

}catch (error) {
  console.log("Executing ask has error!")
  console.log(error)
}
