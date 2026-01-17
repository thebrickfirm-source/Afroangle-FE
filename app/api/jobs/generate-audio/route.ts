// app/api/jobs/generate-audio/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { createClient } from "@sanity/client";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN!, // Need write token
  apiVersion: "2024-01-01",
  useCdn: false,
});

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY!,
});

async function handler(req: NextRequest) {
  try {
    const { postId } = await req.json();

    // 1. Fetch post text from Sanity
    const post = await sanity.fetch(`*[_id == $postId][0]{ title, body }`, {
      postId,
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // 2. Convert text to speech
    const textToConvert = `${post.title}. ${extractTextFromPortableText(post.body)}`;

    const audio = await elevenlabs.textToSpeech.convert({
      voice_id: "your-voice-id",
      text: textToConvert,
      model_id: "eleven_monolingual_v1",
    });

    // 3. Convert stream to buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of audio) {
      chunks.push(chunk);
    }
    const audioBuffer = Buffer.concat(chunks);

    // 4. Upload to Sanity as asset
    const audioAsset = await sanity.assets.upload("file", audioBuffer, {
      filename: `${postId}.mp3`,
      contentType: "audio/mpeg",
    });

    // 5. Update post with audio reference
    await sanity
      .patch(postId)
      .set({ audioFile: { _type: "file", asset: { _ref: audioAsset._id } } })
      .commit();

    return NextResponse.json({
      success: true,
      audioAssetId: audioAsset._id,
    });
  } catch (error) {
    console.error("Audio generation failed:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

// Verify QStash signature (prevents unauthorized calls)
export const POST = verifySignatureAppRouter(handler);

// Helper to extract plain text from Portable Text
function extractTextFromPortableText(blocks: any[]): string {
  return (
    blocks
      ?.map((block) => block.children?.map((child: any) => child.text).join(""))
      .join("\n") || ""
  );
}
