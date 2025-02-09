import endent from 'endent';

import { createParser } from 'eventsource-parser';
import Together from "together-ai";
const api="0a5f1089cb5a2a6996bf27b51dbc73e2b4723c823df089aabed5ce9b1c9af509";
const together = new Together({apiKey:api});




const createPrompt=(inputLanguage,outputLanguage,inputCode)=>{
    if(inputLanguage=="Natural Language"){
        return endent`
        You are an expert programmer in all programming languages. 
        Translate natural language to ${outputLanguage} and do not include any back slashes.
        Example : Print Hello World
        
        Example Output in Javascript : 
         
        console.log("Hello World");
        
        `;
    }
    else if(outputLanguage=="Natural Language"){
        return endent`
        You are an expert programmer in all programming languages
        Your task is to translate ${inputCode} into Natural Language for understanding of a human and also a 10 year old child
        Example translation from JS to Natural Language

        JS : console.log("Hello");

        Natural Language:This prints the message Hello in the console
        `;
    }else{
        return endent`
        You are an expert programmer in all programming languages.
        Your task is to convert ${inputCode} from ${inputLanguage} to ${outputLanguage}

        Your job is to keep the output code optimised.
        `
    };
     
   
    

}

export const OpenAIStream = async (inputLanguage, outputLanguage, inputCode) => {
    const prompt = createPrompt(inputLanguage, outputLanguage, inputCode);
    const response = await together.chat.completions.create({
        messages: [{ "role": "user", "content": prompt }],
        model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    });
    if (!response || !response.choices) {
        throw new Error(`Meta Llama Returned an Error: ${JSON.stringify(response)}`);
    }

    const encoder = new TextEncoder();

    // ✅ Directly process response without using getReader()
    const text = response.choices[0]?.message?.content || "";
    const stream = new ReadableStream({
        start(controller) {
            controller.enqueue(encoder.encode(text));
            controller.close();
        },
    });

    return stream;
};
