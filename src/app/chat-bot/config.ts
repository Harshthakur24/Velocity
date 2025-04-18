import { z } from "zod";

// Define a schema for the Gemini API configuration
export const geminiConfigSchema = z.object({
  apiKey: z.string().min(1, "API key is required"),
  modelName: z.enum(["gemini-2.0-flash", "gemini-2.0-pro"], {
    description: "Model name must be a valid Gemini model",
  }),
  temperature: z
    .number()
    .min(0, "Temperature must be at least 0")
    .max(1, "Temperature must not exceed 1")
    .default(0.7),
  topK: z
    .number()
    .int("TopK must be an integer")
    .positive("TopK must be positive")
    .default(40),
  topP: z
    .number()
    .min(0, "TopP must be at least 0")
    .max(1, "TopP must not exceed 1")
    .default(0.95),
  maxOutputTokens: z
    .number()
    .int("MaxOutputTokens must be an integer")
    .positive("MaxOutputTokens must be positive")
    .max(2048, "MaxOutputTokens must not exceed 2048")
    .default(1024),
});

// Define a schema for safety settings
export const safetySettingSchema = z.object({
  category: z.enum([
    "HARM_CATEGORY_HARASSMENT",
    "HARM_CATEGORY_HATE_SPEECH",
    "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "HARM_CATEGORY_DANGEROUS_CONTENT",
  ]),
  threshold: z.enum([
    "BLOCK_NONE",
    "BLOCK_LOW_AND_ABOVE",
    "BLOCK_MEDIUM_AND_ABOVE",
    "BLOCK_HIGH_AND_ABOVE",
  ]),
});

// Define a schema for UI settings
export const uiConfigSchema = z.object({
  theme: z.enum(["light", "dark", "system"]).default("system"),
  messageBubbleColors: z.object({
    user: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color"),
    assistant: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color"),
    system: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color"),
  }).default({
    user: "#7C3AED",    // Violet-600
    assistant: "#64748B", // Slate-500
    system: "#EF4444",    // Red-500
  }),
  chatFontSize: z.enum(["small", "medium", "large"]).default("medium"),
  enableAutoScroll: z.boolean().default(true),
  enableSendWithEnter: z.boolean().default(true),
});

// Create a combined config schema
export const chatBotConfigSchema = z.object({
  gemini: geminiConfigSchema,
  ui: uiConfigSchema,
  safety: z.array(safetySettingSchema).min(1, "At least one safety setting is required"),
});

// Default Gemini API configuration
export const defaultGeminiConfig = geminiConfigSchema.parse({
  apiKey: "AIzaSyBb4WRbjbnycgufljXgT8oZw3lXo4m9rHc",
  modelName: "gemini-2.0-flash",
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 1024,
});

// Default safety settings
export const defaultSafetySettings = [
  safetySettingSchema.parse({
    category: "HARM_CATEGORY_HARASSMENT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE",
  }),
  safetySettingSchema.parse({
    category: "HARM_CATEGORY_HATE_SPEECH",
    threshold: "BLOCK_MEDIUM_AND_ABOVE",
  }),
  safetySettingSchema.parse({
    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE",
  }),
  safetySettingSchema.parse({
    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE",
  }),
];

// Default UI configuration
export const defaultUiConfig = uiConfigSchema.parse({
  theme: "system",
  messageBubbleColors: {
    user: "#7C3AED",
    assistant: "#64748B",
    system: "#EF4444",
  },
  chatFontSize: "medium",
  enableAutoScroll: true,
  enableSendWithEnter: true,
});

// Create types from our schemas
export type GeminiConfig = z.infer<typeof geminiConfigSchema>;
export type SafetySetting = z.infer<typeof safetySettingSchema>;
export type UiConfig = z.infer<typeof uiConfigSchema>;
export type ChatBotConfig = z.infer<typeof chatBotConfigSchema>;

// Helper function to load config from localStorage with validation
export function loadConfigFromStorage(): ChatBotConfig {
  try {
    const savedConfig = localStorage.getItem("chatBotConfig");
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      // Validate with our schema
      const validationResult = chatBotConfigSchema.safeParse(parsedConfig);
      if (validationResult.success) {
        return validationResult.data;
      }
      console.error("Invalid config format:", validationResult.error);
    }
  } catch (error) {
    console.error("Error loading config:", error);
  }
  
  // Return default config if loading fails
  return {
    gemini: defaultGeminiConfig,
    ui: defaultUiConfig,
    safety: defaultSafetySettings,
  };
}

// Helper function to save config to localStorage with validation
export function saveConfigToStorage(config: ChatBotConfig): boolean {
  try {
    // Validate with our schema before saving
    const validationResult = chatBotConfigSchema.safeParse(config);
    if (validationResult.success) {
      localStorage.setItem("chatBotConfig", JSON.stringify(validationResult.data));
      return true;
    }
    console.error("Invalid config format:", validationResult.error);
    return false;
  } catch (error) {
    console.error("Error saving config:", error);
    return false;
  }
} 