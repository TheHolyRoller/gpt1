

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Make sure to set your API key in the environment variables
});



async function sendPromptToOpenAI(text) {
  try {

    const prompt  = `evaluate the profitability and scalability of this business idea ` + text; 
    console.log('this is the prompt', prompt); 
    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const gptResponse = response.choices[0].message.content; 
    const JsonResponse = JSON.stringify(gptResponse); 
    

    return JsonResponse; 
  } catch (error) {
    console.error('Error connecting to OpenAI:', error);
    throw error;
  }
}

module.exports = sendPromptToOpenAI;
