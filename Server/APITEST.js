import * as fs from "fs";
import 'dotenv/config'
import {ChatOpenAI, OpenAI} from "@langchain/openai";
import { JsonSpec } from "langchain/tools";
import { createOpenApiAgent, OpenApiToolkit } from "langchain/agents";

export const run = async () => {
    let data;
    try {
        const jsonfile = fs.readFileSync("./SpaceTraders_og.json", "utf8");
        data = JSON.parse(jsonfile)
        if (!data) {
            throw new Error("Failed to load spec");
        }
    } catch (e) {
        console.error(e);
        return;
    }

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiU1BBQ0VYUElSQVRFIiwidmVyc2lvbiI6InYyLjEuNSIsInJlc2V0X2RhdGUiOiIyMDI0LTAyLTI1IiwiaWF0IjoxNzA5MjE5NTU5LCJzdWIiOiJhZ2VudC10b2tlbiJ9.AzclddyJxv1U91dGOFNSouVZ-LpDZzXTTFQg1coTB3tl8fymjmuik5hFjZmiae6hzONuGAHP6pe-tFJDqDPPC2CS2Q71WLsdTheZ0yUXpjskQ9H0WWZucBYlg1wATA7mnDToXIdKeZMFUQ9EefgI08ZUj3HVekbTwORdYwRpZ-dPRQ0VSSUUGBae174w-3E6MaVv_mjFVowR4A-G7lpgAXFZZI8u5RcJQVX3oU5NENdux-LY5vWMnvGJDWcVdx3bCKS-s1G2vWoB4PG-0j9dy8Tcl3GWgnYXfWlsgvpTkziRxOPmgt5n-2VoGrQpm6GmOGRUXYWpaZlvJaf-C4-gDg`,
    };
    const model = new ChatOpenAI({
        azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
        azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
        azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
        azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
        temperature: 0 });
    const toolkit = new OpenApiToolkit(new JsonSpec(data), model, headers);
    const executor = createOpenApiAgent(model, toolkit);

    const input = `Fetch the data of system: X1-BD70.`;
    console.log(`Executing with input "${input}"...`);

    const result = await executor.invoke({ input });
    console.log(`Got output ${result.output}`);

    console.log(
        `Got intermediate steps ${JSON.stringify(
            result.intermediateSteps,
            null,
            2
        )}`
    );
};
run();