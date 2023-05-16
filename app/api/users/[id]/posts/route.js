import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { connect } from "mongoose";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    console.log(`api/users/${params.id}/posts: getting user posts..`);
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(`api/users/id/posts: ${error}`);
    return new Response(`api/users/id/posts GET Failed: ${error}`, {
      status: 500,
    });
  }
};
