// llm connection logic for google ai studio
const { GoogleGenAI, Type } = require('@google/genai');

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

const getResponse = async (model = "gemini-2.5-flash", 
    prompt, 
    temperature = 0.9, 
    maxOutputTokens = 8192,
    thinkingBudget = 0,
    topP = 0.9,
    topK = 30,
) => {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            thinkingBudget: thinkingBudget,
            temperature: temperature,
            // maxOutputTokens: maxOutputTokens,
            topP: topP,
            topK: topK,
            responseMimeType: "application/json",
            responseJsonSchema: {
                type: Type.OBJECT,
                properties: {
                    score: { 
                        type: Type.STRING,
                        enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                    },
                    explanation: { type: Type.STRING },
                    remarks: { type: Type.STRING },
                }
            }
        },
    })

    return response;
}

module.exports = {
    getResponse,
}