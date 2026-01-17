// / app/aip / sanity / published / route.ts;
import { NextRequest, NextResponse } from "next/server";
import { Client } from "@upstash/qstash";

const qstash = new Client({ token: process.env.QSTASH_TOKEN! });

export async function POST(req: NextRequest) {
  try {
    // 1. Validate Sanity webhook signature
    const signature = req.headers.get("sanity-webhook-signature");
    const body = await req.text();

    // Verify signature (use Sanity's webhook secret)
    // ... signature validation logic

    const payload = JSON.parse(body);
    const postId = payload._id;

    // 2. Enqueue job to QStash (returns immediately)
    await qstash.publishJSON({
      url: `${process.env.NEXT_PUBLIC_URL}/api/jobs/generate-audio`,
      body: { postId },
      retries: 3, // Auto-retry on failure
      delay: 5, // Optional: wait 5s before processing
    });

    return NextResponse.json({
      success: true,
      message: "Audio generation queued",
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
