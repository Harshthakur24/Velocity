"use client";

import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@radix-ui/react-separator";
import { Loader2, Settings, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Default API key
const DEFAULT_API_KEY = "AIzaSyBb4WRbjbnycgufljXgT8oZw3lXo4m9rHc";

// Enhanced Zod schemas with more precise validation
const messageSchema = z.object({
    content: z
        .string()
        .min(1, "Message cannot be empty")
        .max(500, "Message too long")
        .trim()
        .refine(content => content.length > 0, {
            message: "Message cannot be only whitespace"
        }),
});

const apiKeySchema = z.object({
    geminiApiKey: z
        .string()
        .optional()
        .transform(val => (!val || val.trim() === "") ? DEFAULT_API_KEY : val.trim()),
});

// Role enum as a constant for better type safety
const MessageRole = z.enum(["user", "assistant", "system"]);
type MessageRoleType = z.infer<typeof MessageRole>;

// Message timestamp validation
const timestampSchema = z
    .date()
    .refine(date => !isNaN(date.getTime()), {
        message: "Invalid date"
    });

// Enhanced chat message schema with more validation
const chatMessageSchema = z.object({
    id: z.string().min(1, "ID is required"),
    role: MessageRole,
    content: z.string().min(1, "Content is required"),
    timestamp: timestampSchema,
});

// Chat message history schema for localStorage
const chatHistorySchema = z.array(chatMessageSchema);

type ChatMessage = z.infer<typeof chatMessageSchema>;
type MessageInput = z.infer<typeof messageSchema>;
type ApiKeyInput = z.infer<typeof apiKeySchema>;

// API response schema for validating Gemini API responses
const apiResponseSchema = z.object({
    response: z.string().min(1),
});

export default function ChatBotPage() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "Hello! I'm your engineering and college life assistant. Ask me anything about engineering careers, college life, or academic questions!",
            timestamp: new Date(),
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [apiKey, setApiKey] = useState<string>(DEFAULT_API_KEY);
    const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Form for chat messages
    const messageForm = useForm<MessageInput>({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            content: "",
        },
    });

    // Form for API key
    const apiKeyForm = useForm<ApiKeyInput>({
        resolver: zodResolver(apiKeySchema),
        defaultValues: {
            geminiApiKey: DEFAULT_API_KEY,
        },
    });

    // Load chat history from localStorage on component mount
    useEffect(() => {
        try {
            const savedHistory = localStorage.getItem("chatHistory");
            if (savedHistory) {
                const parsedHistory = JSON.parse(savedHistory);
                // Validate the history with Zod
                const validationResult = chatHistorySchema.safeParse(
                    parsedHistory.map((msg: any) => ({
                        ...msg,
                        timestamp: new Date(msg.timestamp),
                    }))
                );

                if (validationResult.success) {
                    setMessages(validationResult.data);
                } else {
                    console.error("Invalid chat history format:", validationResult.error);
                    // Reset to default if invalid
                    setMessages([{
                        id: "welcome",
                        role: "assistant",
                        content: "Hello! I'm your engineering and college life assistant. Ask me anything about engineering careers, college life, or academic questions!",
                        timestamp: new Date(),
                    }]);
                }
            }
        } catch (error) {
            console.error("Error loading chat history:", error);
        }
    }, []);

    // Save chat history to localStorage when messages change
    useEffect(() => {
        try {
            localStorage.setItem("chatHistory", JSON.stringify(messages));
        } catch (error) {
            console.error("Error saving chat history:", error);
        }
    }, [messages]);

    // Load API key from localStorage on component mount
    useEffect(() => {
        const savedApiKey = localStorage.getItem("geminiApiKey");
        if (savedApiKey) {
            // Validate API key
            const validationResult = z.string().min(1).safeParse(savedApiKey);
            if (validationResult.success) {
                setApiKey(validationResult.data);
                apiKeyForm.setValue("geminiApiKey", validationResult.data);
            }
        }
    }, [apiKeyForm]);

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    async function onSubmit(data: MessageInput) {
        try {
            // Create user message with Zod validation
            const userMessageResult = chatMessageSchema.safeParse({
                id: Date.now().toString(),
                role: "user",
                content: data.content,
                timestamp: new Date(),
            });

            if (!userMessageResult.success) {
                console.error("Invalid message format:", userMessageResult.error);
                return;
            }

            const userMessage = userMessageResult.data;

            setMessages((prev) => [...prev, userMessage]);
            setIsLoading(true);

            // Call the Gemini API through our route
            const response = await fetchGeminiResponse(data.content);

            // Create assistant message with Zod validation
            const assistantMessageResult = chatMessageSchema.safeParse({
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: response,
                timestamp: new Date(),
            });

            if (!assistantMessageResult.success) {
                console.error("Invalid assistant message format:", assistantMessageResult.error);

                // Show error message
                const errorMessageResult = chatMessageSchema.safeParse({
                    id: (Date.now() + 2).toString(),
                    role: "system",
                    content: `Error: Invalid response format`,
                    timestamp: new Date(),
                });

                if (errorMessageResult.success) {
                    setMessages((prev) => [...prev, errorMessageResult.data]);
                }

                return;
            }

            setMessages((prev) => [...prev, assistantMessageResult.data]);
            messageForm.reset();
        } catch (error) {
            console.error("Error sending message:", error);

            // Show error message
            const errorMessageResult = chatMessageSchema.safeParse({
                id: (Date.now() + 1).toString(),
                role: "system",
                content: `Error: ${(error as Error).message || "Failed to get response"}`,
                timestamp: new Date(),
            });

            if (errorMessageResult.success) {
                setMessages((prev) => [...prev, errorMessageResult.data]);
            }
        } finally {
            setIsLoading(false);
        }
    }

    function saveApiKey(data: ApiKeyInput) {
        const newApiKey = data.geminiApiKey || DEFAULT_API_KEY;

        // Validate API key before saving
        const validationResult = z
            .string()
            .min(1, "API key cannot be empty")
            .safeParse(newApiKey);

        if (validationResult.success) {
            setApiKey(validationResult.data);
            localStorage.setItem("geminiApiKey", validationResult.data);
            setApiKeyDialogOpen(false);
        }
    }

    async function fetchGeminiResponse(prompt: string): Promise<string> {
        const response = await fetch("/api/gemini", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt,
                apiKey,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.details || "Failed to fetch from Gemini API");
        }

        const data = await response.json();

        // Validate API response with Zod
        const validationResult = apiResponseSchema.safeParse(data);
        if (!validationResult.success) {
            throw new Error("Invalid API response format");
        }

        return validationResult.data.response;
    }

    return (
        <div className="container mx-auto max-w-4xl py-8">
            <Card className="h-[80vh] flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Engineering & College Life Assistant</CardTitle>
                        <CardDescription>
                            Ask questions about engineering, careers, or college life
                        </CardDescription>
                    </div>

                    <Dialog open={apiKeyDialogOpen} onOpenChange={setApiKeyDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Settings className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Gemini API Key (Optional)</DialogTitle>
                                <DialogDescription>
                                    The chatbot uses a default API key, but you can provide your own if needed.
                                </DialogDescription>
                            </DialogHeader>

                            <Form {...apiKeyForm}>
                                <form onSubmit={apiKeyForm.handleSubmit(saveApiKey)} className="space-y-4">
                                    <FormField
                                        control={apiKeyForm.control}
                                        name="geminiApiKey"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gemini API Key</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your Gemini API key or leave default..."
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full">Save API Key</Button>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </CardHeader>

                <CardContent className="flex-grow overflow-y-auto space-y-4 mb-4 pr-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.role === "user"
                                ? "justify-end"
                                : message.role === "system"
                                    ? "justify-center"
                                    : "justify-start"
                                }`}
                        >
                            <div
                                className={`flex gap-3 max-w-[80%] ${message.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : message.role === "system"
                                        ? "bg-destructive text-destructive-foreground"
                                        : "bg-muted"
                                    } p-4 rounded-lg`}
                            >
                                {message.role === "assistant" && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>AI</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className="space-y-1">
                                    <p className="whitespace-pre-wrap">{message.content}</p>
                                    <p className="text-xs opacity-70">
                                        {message.timestamp.toLocaleTimeString()}
                                    </p>
                                </div>
                                {message.role === "user" && (
                                    <Avatar className="h-8 w-8 text-white text-sm bg-primary">
                                        <AvatarFallback>You</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-muted p-4 rounded-lg flex items-center space-x-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <p>Thinking...</p>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </CardContent>

                <Separator className="mx-4" />

                <CardFooter className="pt-4">
                    <Form {...messageForm}>
                        <form onSubmit={messageForm.handleSubmit(onSubmit)} className="w-full flex gap-2">
                            <FormField
                                control={messageForm.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                placeholder="Ask about engineering, careers, or college life..."
                                                {...field}
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
                            </Button>
                        </form>
                    </Form>
                </CardFooter>
            </Card>
        </div>
    );
}
