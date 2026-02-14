import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-01-17",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, title, articleText } = body;

    // 1. Basic Validation
    if (!name || !email || !title || !articleText) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }
    const paragraphs = articleText
      .split(/\r?\n/)
      .filter((p: string) => p.trim() !== "");

    // Map each string paragraph to a Sanity Block object
    const portableTextBlocks = paragraphs.map((text: string) => ({
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          text: text,
          marks: [],
        },
      ],
    }));
    // 2. Create the document in Sanity
    const result = await client.create({
      _type: "opinionPiece",
      name: name,
      email: email,
      title: title,
      article: portableTextBlocks,
    });

    return NextResponse.json(
      { message: "Opinion piece submitted", id: result._id },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("Sanity Error:", err);
    return NextResponse.json(
      { message: "Error creating document", error: err.message },
      { status: 500 },
    );
  }
}
