import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { connect } from "mongoose";

export const GET = async (request) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(`api/prompt/GET: ${error}`);
    return new Response(`api/prompt/GET Failed: ${error}`, { status: 500 });
  }
};
