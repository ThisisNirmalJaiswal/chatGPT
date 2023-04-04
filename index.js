import { Configuration, OpenAIApi } from 'openai';
import serverLess from 'serverless-http';
import express from 'express';
import cors from 'cors';



const config = new Configuration({
    organization: 'org-jN4bhZWb32Nd2u1hYHcHKbUI',
    apiKey: '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',
});

const openai = new OpenAIApi(config);
const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { messages } = req.body;

    console.log(messages);
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": "You are a helpful assistant." },
            ...messages
            // { "role": 'user', content: `${message}` },
        ]
    });

    res.json({
        completion: completion.data.choices[0].message
    })
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});