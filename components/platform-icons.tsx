import {
    Twitter,
    Github,
    Linkedin,
    Instagram,
    Youtube,
    Globe,
    Send,
    Facebook,
    MessageCircle,
    Music2,
    X
} from "lucide-react"

export function getPlatformIcon(url: string = "") {
    const lowerUrl = url.toLowerCase()

    if (lowerUrl.includes("x.com") || lowerUrl.includes("twitter.com")) return <span className="font-outfit font-black text-sm">𝕏</span>
    if (lowerUrl.includes("github.com")) return <Github className="size-4" />
    if (lowerUrl.includes("linkedin.com")) return <Linkedin className="size-4" />
    if (lowerUrl.includes("instagram.com")) return <Instagram className="size-4" />
    if (lowerUrl.includes("youtube.com")) return <Youtube className="size-4" />
    if (lowerUrl.includes("t.me") || lowerUrl.includes("telegram")) return <Send className="size-4" />
    if (lowerUrl.includes("facebook.com")) return <Facebook className="size-4" />
    if (lowerUrl.includes("whats.app") || lowerUrl.includes("whatsapp")) return <MessageCircle className="size-4" />
    if (lowerUrl.includes("tiktok.com")) return <Music2 className="size-4" />

    return <Globe className="size-4" />
}

export function detectPlatform(url: string = ""): string {
    const lowerUrl = url.toLowerCase()
    if (lowerUrl.includes("x.com") || lowerUrl.includes("twitter.com")) return "x"
    if (lowerUrl.includes("github.com")) return "github"
    if (lowerUrl.includes("linkedin.com")) return "linkedin"
    if (lowerUrl.includes("instagram.com")) return "instagram"
    if (lowerUrl.includes("youtube.com")) return "youtube"
    if (lowerUrl.includes("t.me") || lowerUrl.includes("telegram")) return "telegram"
    if (lowerUrl.includes("tiktok.com")) return "tiktok"
    return "website"
}
