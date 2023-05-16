import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { connect } from "mongoose";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response(`Prompt ${params.id} not found!`);

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(`api/prompt/id/GET: ${error}`);
    return new Response(`api/prompt/id/GET Failed: ${error}`, { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt: newPrompt, tag: newTag } = await request.json();
  try {
    await connectToDB();
    const oldPost = await Prompt.findById(params.id).populate("creator");
    if (!oldPost) return new Response(`Prompt ${params.id} not found!`);

    oldPost.prompt = newPrompt;
    oldPost.tag = newTag;

    await oldPost.save();
    return new Response(JSON.stringify(oldPost), { status: 200 });
  } catch (error) {
    return new Response(`Prompt ${params.id} update error: ${error}`, {
      status: 500,
    });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response(`Prompt ${params.id} deletion error: ${error}`, {
      status: 500,
    });
  }
};
