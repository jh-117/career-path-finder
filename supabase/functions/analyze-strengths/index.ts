import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.81.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error("Unauthorized");
    }

    const { data: profile, error: profileError } = await supabase
      .from("strength_profiles")
      .select(`
        *,
        technical_skills (*),
        soft_skills (*),
        career_interests (*)
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (profileError) throw profileError;
    if (!profile) {
      throw new Error("No strength profile found");
    }

    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      throw new Error("OpenAI API key not configured");
    }

    const technicalSkills = profile.technical_skills?.map((s: any) => s.skill_name).join(", ") || "None";
    const softSkills = profile.soft_skills?.map((s: any) => s.skill_name).join(", ") || "None";
    const careerInterests = profile.career_interests?.map((i: any) => i.interest_name).join(", ") || "None";
    const workStyle = profile.work_style || "Not specified";

    const prompt = `You are a career development expert. Analyze the following user profile and provide a comprehensive career analysis.

User Profile:
- Technical Skills: ${technicalSkills}
- Soft Skills: ${softSkills}
- Career Interests: ${careerInterests}
- Work Style Preference: ${workStyle}

Provide a detailed analysis in the following JSON format:
{
  "personalityPattern": "A 2-3 sentence analysis using the Big Five personality framework",
  "topAdvantage": "A 2-3 sentence description of their unique strengths",
  "naturalTendencies": "A 2-3 sentence description of their work preferences and environment",
  "skillsRadar": {
    "technical": 0-100,
    "communication": 0-100,
    "leadership": 0-100,
    "creativity": 0-100,
    "problemSolving": 0-100,
    "adaptability": 0-100
  },
  "recommendedRoles": [
    {
      "title": "Role title",
      "matchScore": 0-100,
      "skills": ["skill1", "skill2", "skill3", "skill4"],
      "department": "Department name",
      "reasoning": "Why this role is a good fit"
    }
  ]
}

Provide exactly 3 recommended roles. Be specific and insightful.`;

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a career development expert specializing in personality assessment and career matching."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      }),
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.text();
      console.error("OpenAI API error:", error);
      throw new Error("Failed to generate AI analysis");
    }

    const openaiData = await openaiResponse.json();
    const analysis = JSON.parse(openaiData.choices[0].message.content);

    const { data: savedAnalysis, error: saveError } = await supabase
      .from("ai_analyses")
      .insert({
        user_id: user.id,
        strength_profile_id: profile.id,
        analysis_data: analysis,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (saveError) throw saveError;

    return new Response(
      JSON.stringify({
        success: true,
        analysis: savedAnalysis
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error in analyze-strengths function:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});