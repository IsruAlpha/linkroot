"use client"

import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    X,
    Instagram,
    Twitter,
    Github,
    Linkedin,
    Youtube,
    Globe,
    Send,
    Mail,
    ExternalLink,
    Search,
    CheckCircle2,
    Loader2
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { formatAbsoluteUrl } from "@/lib/utils"

interface AddLinkModalProps {
    isOpen: boolean
    onClose: () => void
    onAdd: (link: { title: string; url: string; platform: string }) => void
}

const PLATFORM_PATTERNS = [
    { name: "Twitter / X", pattern: /twitter\.com|x\.com/, icon: Twitter, color: "text-[#1DA1F2]" },
    { name: "Instagram", pattern: /instagram\.com/, icon: Instagram, color: "text-[#E4405F]" },
    { name: "GitHub", pattern: /github\.com/, icon: Github, color: "text-[#333]" },
    { name: "LinkedIn", pattern: /linkedin\.com/, icon: Linkedin, color: "text-[#0077B5]" },
    { name: "YouTube", pattern: /youtube\.com/, icon: Youtube, color: "text-[#FF0000]" },
    { name: "Facebook", pattern: /facebook\.com/, icon: Globe, color: "text-[#1877F2]" },
    { name: "TikTok", pattern: /tiktok\.com/, icon: Globe, color: "text-[#000000]" },
    { name: "Telegram", pattern: /t\.me/, icon: Send, color: "text-[#0088cc]" },
]

export function AddLinkModal({ isOpen, onClose, onAdd }: AddLinkModalProps) {
    const [url, setUrl] = useState("")
    const [title, setTitle] = useState("")
    const [detectedPlatform, setDetectedPlatform] = useState<any>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)

    useEffect(() => {
        if (url) {
            const platform = PLATFORM_PATTERNS.find(p => p.pattern.test(url))
            if (platform) {
                setDetectedPlatform(platform)
                if (!title) {
                    setTitle(platform.name)
                }
            } else {
                setDetectedPlatform(null)
            }
        } else {
            setDetectedPlatform(null)
        }
    }, [url, title])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!url) return

        setIsProcessing(true)

        // Simulate fetching/processing
        setTimeout(() => {
            const formattedUrl = formatAbsoluteUrl(url)
            onAdd({
                title: title || "New Link",
                url: formattedUrl,
                platform: detectedPlatform?.name.toLowerCase() || "website"
            })
            setUrl("")
            setTitle("")
            setDetectedPlatform(null)
            setIsProcessing(false)
        }, 800)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] overflow-hidden border-border/50 bg-card/95 backdrop-blur-xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Add a link</DialogTitle>
                    <DialogDescription>
                        Enter a URL to add it to your Linktree. We'll automatically detect the platform.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="url" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">URL</Label>
                            <div className="relative group">
                                <Input
                                    id="url"
                                    placeholder="https://example.com"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="pl-10 h-11 bg-background/50 border-border/50 focus:border-primary transition-all pr-12 rounded-xl"
                                    required
                                />
                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                    <Search className="size-4" />
                                </div>
                                <AnimatePresence>
                                    {detectedPlatform && (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.8, opacity: 0 }}
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                        >
                                            <detectedPlatform.icon className={`size-5 ${detectedPlatform.color}`} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <AnimatePresence>
                            {url && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="space-y-2 overflow-hidden"
                                >
                                    <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="My Portfolio"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="h-11 bg-background/50 border-border/50 focus:border-primary transition-all rounded-xl"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {detectedPlatform && (
                        <div className="bg-primary/5 border border-primary/10 rounded-xl p-3 flex items-center gap-3">
                            <div className="bg-background p-2 rounded-lg shadow-sm">
                                <detectedPlatform.icon className={`size-4 ${detectedPlatform.color}`} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Platform detected</p>
                                <p className="text-xs text-muted-foreground">We'll use a custom {detectedPlatform.name} icon.</p>
                            </div>
                            <CheckCircle2 className="size-4 text-primary" />
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            type="submit"
                            className="w-full h-11 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
                            disabled={!url || isProcessing}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="size-4 mr-2 animate-spin" />
                                    Adding Link...
                                </>
                            ) : (
                                "Add to Linktree"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
