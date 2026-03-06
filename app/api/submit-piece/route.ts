import { sanityUploadClient } from "@/lib/SanityUploadClient";
import { NextResponse } from "next/server";

// Helper function to send email to editorial team
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

// Helper function to send confirmation email to the author
async function sendAuthorConfirmation(authorName: string, authorEmail: string) {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;

  const emailData = {
    sender: {
      name: "The Editorial Team",
      email: "editorial@afroangle.com",
    },
    to: [
      {
        email: authorEmail,
        name: authorName,
      },
    ],
    subject: `We've Received Your Submission`,
    htmlContent: `
      <html>
        <body style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <p>Dear ${authorName},</p>
          <p>
            Thank you for reaching out to Afroangle and for thinking of us as a home for your work.
          </p>
          <p>
            We have received your submission and our editorial team will review it carefully. 
            We aim to respond within three business days. In the meantime, please feel free to 
            send any additional context or supporting materials that might help us better understand 
            your angle.
          </p>
          <p>
            Afroangle is built on the strength and diversity of African voices. We are genuinely 
            glad you are part of that conversation.
          </p>
          <br />
          <p>Warm regards,</p>
          <p>
            <strong>The Editorial Team</strong><br />
            Afroangle<br />
            <a href="mailto:editorial@afroangle.com">editorial@afroangle.com</a><br />
            <a href="https://www.afroangle.com">www.afroangle.com</a>
          </p>
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
    const asset = await sanityUploadClient.assets.upload("file", buffer, {
      filename: file.name,
      contentType: file.type,
    });

    // 2. Create the document
    const result = await sanityUploadClient.create({
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

    // 3. Trigger Brevo Email Notifications
    try {
      await Promise.all([
        sendEmailNotification(name, email, file.name),
        sendAuthorConfirmation(name, email),
      ]);
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
