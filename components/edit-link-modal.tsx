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
import { Loader2 } from "lucide-react"
import { getPlatformIcon, detectPlatform } from "./platform-icons"
import { formatAbsoluteUrl } from "@/lib/utils"

interface EditLinkModalProps {
    isOpen: boolean
    onClose: () => void
    link: { _id: any, title: string, url: string, platform: string } | null
    onUpdate: (linkId: any, updates: { title?: string; url?: string; platform?: string }) => Promise<void>
}

export function EditLinkModal({ isOpen, onClose, link, onUpdate }: EditLinkModalProps) {
    const [url, setUrl] = useState("")
    const [title, setTitle] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
        if (link) {
            setUrl(link.url)
            setTitle(link.title)
        }
    }, [link])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!url || !link) return

        setIsProcessing(true)
        try {
            const formattedUrl = formatAbsoluteUrl(url)
            await onUpdate(link._id, {
                title: title || "New Link",
                url: formattedUrl,
                platform: detectPlatform(formattedUrl)
            })
            onClose()
        } catch (error) {
            console.error(error)
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] overflow-hidden border-zinc-900 bg-zinc-950/95 backdrop-blur-xl text-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Edit link</DialogTitle>
                    <DialogDescription className="text-zinc-500 font-medium">
                        Update your link details. We'll automatically update the platform icon.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-4 font-outfit">
                        <div className="space-y-2">
                            <Label htmlFor="edit-url" className="text-xs font-bold uppercase tracking-widest text-zinc-500">URL</Label>
                            <div className="relative group">
                                <Input
                                    id="edit-url"
                                    placeholder="https://example.com"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="pl-10 h-11 bg-zinc-900 border-zinc-800 focus:border-white transition-all rounded-xl"
                                    required
                                />
                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors">
                                    {getPlatformIcon(url)}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="edit-title" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Title</Label>
                            <Input
                                id="edit-title"
                                placeholder="My Portfolio"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="h-11 bg-zinc-900 border-zinc-800 focus:border-white transition-all rounded-xl"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            className="w-full h-11 rounded-full bg-white text-black hover:bg-zinc-200 font-bold transition-all active:scale-95 disabled:opacity-50"
                            disabled={!url || isProcessing}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="size-4 mr-2 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
