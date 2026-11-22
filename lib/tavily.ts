export interface TavilySearchResult {
  title: string;
  url: string;
  content: string;
  score: number;
}

export interface TavilyResponse {
  query: string;
  results: TavilySearchResult[];
}

export async function searchTavily(query: string, maxResults = 4): Promise<TavilySearchResult[]> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    console.warn("TAVILY_API_KEY is not set.");
    return [];
  }

  try {
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: apiKey,
        query: `${query} cybercrime cyber law legislation penalty`,
        search_depth: "basic",
        max_results: maxResults,
        include_answer: false,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Tavily API error:", res.status, errText);
      return [];
    }

    const data: TavilyResponse = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("Failed to query Tavily search:", err);
    return [];
  }
}
