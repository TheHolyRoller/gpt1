

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Make sure to set your API key in the environment variables
});



async function sendPromptToOpenAI(text) {
  try {

    const prompt  = `based on the patient's age, weight, gender, and medical history evaluate all the different health markers provided such as but not limited to, heart rate, blood pressure, temperature, and if they are provided in the test evaluate the patients blood test results as well as any assessments and diagnosis. Your evaluation must be based off of data and studies and it should determine whether each thing that you are evaluating is in a healthy range for the patient given their profile such as age, gender and weight. You must also make recommendations to the patient on how they can improve their health and then you must include a quick medical disclaimer. ` + text; 
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
