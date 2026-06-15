// app/api/summarize/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { content } = await req.json();

  // 🧹 Limit content size for HuggingFace
  const cleanedContent = content.slice(0, 1000);

  const HF_MODEL = "facebook/bart-large-cnn";

  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: cleanedContent }),
    });

    const data = await response.json();

    console.log("🔍 HuggingFace raw response:", JSON.stringify(data, null, 2));

    // ✅ Extract summary
    let summary = "No summary returned.";
    if (Array.isArray(data) && data[0]?.summary_text) {
      summary = data[0].summary_text;
    } else if (typeof data === "object" && "error" in data) {
      summary = `Model error: ${data.error}`;
    }

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("❌ Summarization error:", error);
    return NextResponse.json({ error: "Failed to summarize." }, { status: 500 });
  }
}