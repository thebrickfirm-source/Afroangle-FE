import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-01-17",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// Helper function to send email via Brevo
async function sendEmailNotification(
  authorName: string,
  authorEmail: string,
  fileName: string,
) {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;

  const emailData = {
    sender: {
      name: "Afroangle Notification",
      email: "editorial@afroangle.com",
    },
    to: [
      {
        email: "editorial@afroangle.com",
        name: "Israel Winlade",
      },
    ],
    subject: `New Opinion Piece Submission: ${authorName}`,
    htmlContent: `
      <html>
        <body style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2>New Submission Received</h2>
          <p>A new opinion piece has been uploaded to Sanity.</p>
          <hr />
          <p><strong>Author:</strong> ${authorName}</p>
          <p><strong>Email:</strong> ${authorEmail}</p>
          <p><strong>File Name:</strong> ${fileName}</p>
          <hr />
          <p>You can view and download this submission in the <a href="https://afroangle.com/admin">Sanity Studio</a>.</p>
        </body> 
      </html>
    `,
  };

  return fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": BREVO_API_KEY || "",
      "content-type": "application/json",
    },
    body: JSON.stringify(emailData),
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const file = formData.get("file") as File;

    if (!name || !email || !file) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Upload file to Sanity Assets
    const asset = await client.assets.upload("file", buffer, {
      filename: file.name,
      contentType: file.type,
    });

    // 2. Create the document
    const result = await client.create({
      _type: "opinionPiece",
      name,
      email,
      fileUpload: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      },
    });

    // 3. Trigger Brevo Email Notification
    // We don't necessarily need to 'await' this if we want to return the response faster,
    // but awaiting ensures we know if the email failed.
    try {
      await sendEmailNotification(name, email, file.name);
    } catch (emailErr) {
      console.error("Brevo Email Error:", emailErr);
      // We don't stop the process if the email fails, as the document is already in Sanity
    }

    return NextResponse.json({ id: result._id }, { status: 200 });
  } catch (err: any) {
    console.error("Sanity Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
