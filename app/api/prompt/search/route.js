import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { URLSearchParams } from "url";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const searchParams = new URLSearchParams(request.url.split("?")[1]);
    const searchText = searchParams.get("searchText");

    // console log arguments passed in the request
    console.log(`api/prompt/search/GET: searchText ${searchText}`);

    const prompts = await Prompt.find(
      { $text: { $search: searchText } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .populate("creator");
    console.log(`api/prompt/search/GET: results ${JSON.stringify(prompts)}`);
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(`api/prompt/search/GET: ${error}`);
    return new Response(`api/prompt/search/GET Failed: ${error}`, {
      status: 500,
    });
  }
};
