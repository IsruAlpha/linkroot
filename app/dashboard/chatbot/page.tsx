"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ChatInput } from "@/components/ui/chat-input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CornerDownLeft, Bot, MessageSquare, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ChatbotPage() {
  const user = useQuery(api.users.getMe);
  const updateChatbot = useMutation(api.users.updateChatbotSettings);
  const router = useRouter();
  
  const [prompt, setPrompt] = useState("");
  const [isEditingPreview, setIsEditingPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setEnabled(user.chatbotEnabled || false);
      setPreviewContent(user.chatbotPrompt || "");
    }
  }, [user]);

  const handleSave = async (content: string, isFromPreview = false) => {
    if (!content.trim()) return;
    setIsSaving(true);
    
    // Accumulate content if not from preview edit
    const newFullContent = isFromPreview 
      ? content 
      : (previewContent ? `${previewContent}\n\n${content}` : content);

    try {
      await updateChatbot({
        chatbotPrompt: newFullContent,
        chatbotEnabled: enabled,
      });
      toast.success("Chatbot settings updated!");
      if (!isFromPreview) {
        setPrompt(""); // Clear main input
      }
      setIsEditingPreview(false);
      setPreviewContent(newFullContent);
    } catch (error) {
      toast.error("Failed to update settings");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (user === undefined) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
      </div>
    );
  }

  const isPro = user?.isPro || false;

  const handleToggle = (val: boolean) => {
    if (!isPro && val) {
      toast.error("Pro feature", {
        description: "You need a Pro plan to enable the AI chatbot on your profile.",
        action: {
          label: "Upgrade",
          onClick: () => router.push("/pricing"),
        },
      });
      return;
    }
    setEnabled(val);
    updateChatbot({ chatbotEnabled: val });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Chatbot</h1>
        <p className="text-zinc-400">
          Train your AI persona so visitors can chat with you even when you're offline.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Label className="text-base">Enable Chatbot</Label>
                  {!isPro && (
                    <span className="bg-zinc-800 text-zinc-400 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border border-zinc-700">
                      Pro
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-500">
                  Show the chat widget on your public profile.
                </p>
              </div>
              <Switch
                checked={enabled}
                onCheckedChange={handleToggle}
              />
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-4">
            <Label className="text-base flex items-center gap-2">
              <Bot className="h-4 w-4" />
              Your Personality
            </Label>
            <p className="text-sm text-zinc-500">
              Tell the AI who you are, what you love, your work, and your hobbies. The more details you provide, the better it represents you.
            </p>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(prompt);
              }} 
              className="relative rounded-lg border bg-black focus-within:ring-1 focus-within:ring-ring p-1"
            >
              <ChatInput
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="I am a software engineer who loves surfing and minimal design..."
                className="min-h-32 resize-none bg-black border-0 p-3 shadow-none focus-visible:ring-0"
              />
              <div className="flex items-center p-3 pt-0">
                <Button
                  type="submit"
                  size="sm"
                  className="ml-auto gap-1.5 bg-white text-black hover:bg-zinc-200"
                  disabled={isSaving || !prompt.trim()}
                >
                  {isSaving ? "Saving..." : "Save Persona"}
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-zinc-400" />
              Persona Preview
            </h3>
            <div className="bg-black border border-zinc-800 rounded-lg p-6 h-[300px] overflow-y-auto group relative">
              {isEditingPreview ? (
                <div className="space-y-4">
                  <ChatInput
                    value={previewContent}
                    onChange={(e) => setPreviewContent(e.target.value)}
                    className="min-h-40 resize-none bg-zinc-900 border border-zinc-800 p-3 focus-visible:ring-1 focus-visible:ring-zinc-700"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setIsEditingPreview(false);
                        setPreviewContent(user?.chatbotPrompt || "");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-white text-black hover:bg-zinc-200"
                      onClick={() => handleSave(previewContent, true)}
                      disabled={isSaving}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              ) : previewContent ? (
                <div 
                  className="space-y-4 cursor-pointer hover:bg-zinc-900 transition-colors p-2 rounded-lg"
                  onClick={() => setIsEditingPreview(true)}
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-zinc-800 p-2 rounded-lg">
                      <Bot className="h-4 w-4 text-zinc-400" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Trained Persona</p>
                        <span className="text-[10px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">Click to edit</span>
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed italic">
                        "{previewContent}"
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-2">
                  <Bot className="h-8 w-8 text-zinc-800" />
                  <p className="text-sm text-zinc-600">
                    Your AI persona is currently empty. Describe yourself to train the bot.
                  </p>
                </div>
              )}
            </div>
            <p className="text-[10px] text-zinc-600 text-center uppercase tracking-widest">
              Live Preview of your AI core
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
