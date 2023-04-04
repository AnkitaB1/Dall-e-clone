const { app } = require('@azure/functions');
const openai = require("../../lib/openai")
//to run refresh, then start, then app name, then it starts on its own
app.http('getChatGPTSuggestion', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const response= await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: "Write a random prompt for DALL-E to generate an image, this prompt will be shown to the user and include details such as genre; type of painting, watercolor used etc.",
            max_tokens: 100,
            temperature: 0.8,

        })
        context.log(`HELLO Http function processed request for url "${request.url}"`);

        const responseText = response.data.choices[0].text;

        

        return { body: responseText };
    }
});
