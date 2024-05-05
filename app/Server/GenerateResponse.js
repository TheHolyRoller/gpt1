

const { OpenAIAPI } = require('openai');

const openai = new OpenAIAPI({
  apiKey: process.env.OPENAI_API_KEY // Make sure to set your API key in the environment variables
});

async function sendPromptToOpenAI(text) {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003', // or another model of your choice
      prompt: text,
      max_tokens: 150
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error connecting to OpenAI:', error);
    throw error;
  }
}

module.exports = sendPromptToOpenAI;
