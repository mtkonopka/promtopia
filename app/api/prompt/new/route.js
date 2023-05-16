import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  console.log(`api/prompt/new: req: ${req}`);
  console.log(
    `api/prompt/new: userId: ${userId} prompt: ${prompt} tag: ${tag}`
  );
  try {
    await connectToDB();
    const newPrompt = await new Prompt({
      creator: userId,
      prompt: prompt,
      tag,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(`api/prompt/new error: ${error}`);
    return new Response("Failed to create a new Prompt", { status: 500 });
  }
};
