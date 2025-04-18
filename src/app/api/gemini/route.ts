import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { 
  defaultGeminiConfig, 
  defaultSafetySettings,
  geminiConfigSchema,
  safetySettingSchema 
} from "@/app/chat-bot/config";

// Set the default API key
const DEFAULT_API_KEY = defaultGeminiConfig.apiKey;

// Enhanced request schema that incorporates our configuration
const geminiRequestSchema = z.object({
  prompt: z
    .string()
    .min(1, "Prompt cannot be empty")
    .max(2000, "Prompt too long")
    .transform(val => val.trim()),
  apiKey: z
    .string()
    .optional()
    .default(DEFAULT_API_KEY)
    .refine(key => key.length > 0, {
      message: "API key cannot be empty if provided"
    }),
  config: z.object({
    temperature: geminiConfigSchema.shape.temperature.optional(),
    topK: geminiConfigSchema.shape.topK.optional(),
    topP: geminiConfigSchema.shape.topP.optional(),
    maxOutputTokens: geminiConfigSchema.shape.maxOutputTokens.optional(),
    modelName: geminiConfigSchema.shape.modelName.optional(),
  }).optional().default({}),
  safetySettings: z.array(safetySettingSchema).optional(),
});

// Zod schema for Gemini API response validation
const geminiResponseSchema = z.object({
  candidates: z.array(
    z.object({
      content: z.object({
        parts: z.array(
          z.object({
            text: z.string()
          })
        ),
        role: z.string().optional()
      }),
      finishReason: z.string().optional(),
      safetyRatings: z.array(z.any()).optional()
    })
  ).min(1, "No response candidates found"),
});

// Type for a validated API request
type GeminiRequest = z.infer<typeof geminiRequestSchema>;

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body with Zod
    const body = await req.json();
    const validationResult = geminiRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: "Invalid request", 
          details: validationResult.error.format() 
        },
        { status: 400 }
      );
    }

    const { 
      prompt, 
      apiKey,
      config = {},
      safetySettings = defaultSafetySettings
    } = validationResult.data;

    // Merge default config with provided config
    const mergedConfig = {
      temperature: config.temperature ?? defaultGeminiConfig.temperature,
      topK: config.topK ?? defaultGeminiConfig.topK,
      topP: config.topP ?? defaultGeminiConfig.topP,
      maxOutputTokens: config.maxOutputTokens ?? defaultGeminiConfig.maxOutputTokens,
      modelName: config.modelName ?? defaultGeminiConfig.modelName,
    };

    // Define the engineering, career, and college knowledge context
    const systemContext = `
      You are an expert assistant for engineering students, specializing in:
      - Engineering education and disciplines
      - Career guidance for engineers
      - College life and academic advice
      - Technical concepts and explanations
      
      Focus your responses on these areas. If asked about unrelated topics, 
      politely guide the conversation back to engineering, careers, and college life.
      
      Provide helpful, concise, and accurate information based on factual knowledge.
    `;

    // Call Gemini API with the updated endpoint for the configured model
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${mergedConfig.modelName}:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: systemContext },
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          temperature: mergedConfig.temperature,
          topK: mergedConfig.topK,
          topP: mergedConfig.topP,
          maxOutputTokens: mergedConfig.maxOutputTokens,
        },
        safetySettings: safetySettings,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    
    // Validate the API response with Zod
    const responseValidation = geminiResponseSchema.safeParse(data);
    
    if (!responseValidation.success) {
      console.error("Invalid response format from Gemini API:", responseValidation.error);
      return NextResponse.json(
        { error: "Invalid response from Gemini API", details: responseValidation.error.format() },
        { status: 500 }
      );
    }
    
    const validatedData = responseValidation.data;
    const responseText = validatedData.candidates[0].content.parts[0].text;

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("Error in Gemini API route:", error);
    return NextResponse.json(
      { error: "Failed to process request", details: (error as Error).message },
      { status: 500 }
    );
  }
} 