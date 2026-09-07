import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const AI_API_KEY = Deno.env.get("AI_API_KEY");
    const AI_API_URL = Deno.env.get("AI_API_URL");
    
    if (!AI_API_KEY) {
      throw new Error("AI_API_KEY is not configured");
    }

    const response = await fetch(AI_API_URL || "https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are Let'sGo Genie, an expert travel assistant for "Let's Go" - a premium travel company specializing in curated travel experiences worldwide.

YOUR EXPERTISE:
- Deep knowledge of destinations, cultures, and travel logistics
- Personalized recommendations based on traveler preferences
- Expert advice on visas, weather, best travel times, and local customs
- Detailed information about tours, pricing, and booking processes

AVAILABLE TOURS & DESTINATIONS:
Featured Tours:
1. Greek Island Hopping Adventure - 7 days, $1,299 (Adventure)
2. Bali Cultural Experience - 5 days, $899 (Cultural)
3. Paris Romantic Getaway - 4 days, $1,599 (Romance)
4. Thailand Beach Paradise - 6 days, $999 (Beach)
5. Rajasthan Royal Heritage - 8 days, $1,199 (Cultural)
6. Singapore City Explorer - 4 days, $1,099 (City)
7. Goa Beach Adventure - 5 days, $799 (Beach)
8. Maldives Luxury Escape - 7 days, $2,499 (Luxury)

Destinations: Bali, Greece, Maldives, Paris, Thailand, Goa, Rajasthan, Singapore, and 200+ more worldwide

COMPANY FEATURES:
- 200+ destinations across 6 continents
- Expert local guides with cultural expertise
- 24/7 customer support (before, during, and after trips)
- Best price guarantee
- Small group sizes for personalized experiences
- All-inclusive packages available

COMMUNICATION STYLE:
- Warm, enthusiastic, and professional
- Provide specific details (prices, durations, highlights)
- Keep responses concise (2-4 sentences) unless detailed information is requested
- Ask clarifying questions to better understand traveler needs
- Suggest relevant tours based on interests, budget, and preferences
- Use emojis sparingly to add warmth (✈️ 🌍 ⭐)

BOOKING PROCESS:
1. Browse tours on our Tours or View Tours pages
2. Click "Book Now" on any tour
3. Fill out booking form with travel dates and passenger details
4. Proceed to secure payment
5. Receive confirmation email with itinerary

Never introduce yourself with "I am..." - just naturally help visitors. Focus on making travel dreams come true!`
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
