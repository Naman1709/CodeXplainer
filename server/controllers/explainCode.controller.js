const { getResponse } = require('../services/llmConnect');
const ApiResponse = require('../utils/ApiResponse');
const { wrapper } = require('../utils/wrapper');

const explainCode = wrapper(async (req, res) => {
    const {
        code,
        language = "Unknown",
        model,
        temperature,
        maxOutputTokens,
        topP,
        topK,
    } = req.body;

    if(!code || typeof code !== "string" || code.length === 0) {
        return ApiResponse.error('Please provide a valid prompt', null, 400);
    }

    const prompt = `Explain the following code in detail. Go one line at a time, explain what each line does, and then provide a summary of the overall functionality of the code. The explanation should be clear and concise, suitable for someone who is familiar with programming concepts but may not be an expert in this specific language or framework.
    Include Remarks if any improvements can be made to the code, and what is already handled well in the code.
    Finally, provide a self-assessment score from 1 to 10 on how well the explanation was done, with 10 being the best possible explanation.
    Language: ${language}`

    const response = await getResponse(model, 
        `${prompt}\n\nCode:\n${code}`,
        temperature,
        maxOutputTokens
    );

    const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    // Remove code fences and unwanted markdown
    const cleanText = rawText
        .replace(/^```json/, '')
        .replace(/^```/, '')
        .replace(/```$/, '')
        .trim();

    const parsed = JSON.parse(cleanText);

    return ApiResponse.success(res, 'Code explanation generated successfully', {
        data: parsed
    });
})

module.exports = {
    explainCode,
}