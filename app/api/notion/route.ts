import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

interface NotionRequestBody {
  name: string;
  email: string;
  profession?: string;
  referralSource: string;
}

export async function POST(request: Request) {
  const body: NotionRequestBody = await request.json();
  try {
    const notion = new Client({ auth: process.env.NOTION_SECRET });
    const response = await notion.pages.create({
      parent: {
        database_id: `${process.env.NOTION_DB}`,
      },
      properties: {
        Email: {
          type: "email",
          email: body?.email,
        },
        Name: {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: body?.name,
              },
            },
          ],
        },
        Profession: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: body?.profession || "",
              },
            },
          ],
        },
        "Referral Source": {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: body?.referralSource,
              },
            },
          ],
        },
      },
    });

    if (!response) {
      throw new Error("Failed to add email to Notion");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}