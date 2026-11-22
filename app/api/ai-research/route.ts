import { NextRequest, NextResponse } from "next/server";
import { getGroqClient } from "@/lib/groq";
import { searchTavily, TavilySearchResult } from "@/lib/tavily";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, country, includeWebSearch = true } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "A valid query string is required" }, { status: 400 });
    }

    let searchContext = "";
    let sources: Array<{ title: string; url: string }> = [];

    // 1. Fetch live web search results from Tavily if enabled
    if (includeWebSearch) {
      const tavilyResults: TavilySearchResult[] = await searchTavily(
        country ? `${country} ${query}` : query,
        4
      );

      if (tavilyResults.length > 0) {
        sources = tavilyResults.map((r) => ({
          title: r.title,
          url: r.url,
        }));

        searchContext = tavilyResults
          .map(
            (r, idx) =>
              `[Source ${idx + 1}] Title: ${r.title}\nURL: ${r.url}\nExcerpt: ${r.content}`
          )
          .join("\n\n");
      }
    }

    // 2. Query Groq LLM
    const groq = getGroqClient();

    if (!groq) {
      return NextResponse.json(
        {
          answer:
            "Groq API key is not configured. Please add GROQ_API_KEY to your environment variables.",
          sources: [],
        },
        { status: 500 }
      );
    }

    const systemPrompt = `You are JurisLink AI, an elite comparative cybercrime legal analyst and international cyber law scholar.
Your role:
- Provide precise, structured legal comparisons of cybercrime statutes, maximum prison terms, monetary penalties, extraterritorial reach, and mandatory breach notification windows.
- Always distinguish between ENFORCED/ENACTED legislation and DRAFT/AVAILABLE BUT NOT YET NOTIFIED acts (e.g. bills awaiting official gazetting or secondary regulations).
- Detail AI-related cybercrime governance (deepfakes, voice cloning, autonomous agent liability, foundation model security, EU AI Act).
- Maintain an authoritative, objective, and analytical tone with bulleted points and clear headings.
- If live web sources are provided below, synthesize them and cite specific statutory provisions accurately.`;

    const userMessage = searchContext
      ? `Live Web Context:\n${searchContext}\n\nUser Question:\n${query}${
          country ? ` (Focus jurisdiction: ${country})` : ""
        }\n\nPlease provide an insightful, highly structured legal analysis addressing statutory penalties, pending bills, and real-world strictness.`
      : `User Question:\n${query}${
          country ? ` (Focus jurisdiction: ${country})` : ""
        }\n\nPlease provide an insightful, highly structured legal analysis addressing statutory penalties, pending bills, and real-world strictness.`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.3,
      max_tokens: 1024,
    });

    const answer =
      completion.choices[0]?.message?.content ||
      "Unable to generate response from the legal intelligence engine.";

    return NextResponse.json({
      answer,
      sources,
    });
  } catch (error: any) {
    console.error("Error in AI research endpoint:", error);
    return NextResponse.json(
      {
        error: error.message || "Internal server error occurred",
      },
      { status: 500 }
    );
  }
}
