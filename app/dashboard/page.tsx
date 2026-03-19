"use client"

import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Plus, Link2, Pencil, Trash2, GripVertical, ExternalLink, Copy, Check, Info, Camera, Loader2, Palette } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { AddLinkModal } from "../../components/add-link-modal"
import { EditLinkModal } from "../../components/edit-link-modal"
import SocialCard from "../../components/forgeui/social-card"
import { GridPattern } from "@/components/ui/grid-pattern"
import { useEffect, useRef } from "react"
import { toast } from "sonner"
import { getPlatformIcon } from "../../components/platform-icons"
import { cn } from "@/lib/utils"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { useRouter } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/base-popover"
import { Badge } from "@/components/ui/base-badge"
import { ThemeSelector } from "../../components/theme-selector"
import { Background, PATTERNS } from "@/lib/patterns"

export default function DashboardPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isPricingModalOpen, setIsPricingModalOpen] = useState(false)
    const [editingLink, setEditingLink] = useState<any>(null)
    const [isEditingProfile, setIsEditingProfile] = useState(false)
    const [isUploadingImage, setIsUploadingImage] = useState(false)
    const [copied, setCopied] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Convex queries and mutations
    const user = useQuery(api.users.getMe)
    const storeUser = useMutation(api.users.storeUser)
    const updateProfile = useMutation(api.users.updateProfile)
    const updateBranding = useMutation(api.users.updateBranding)
    const updateTheme = useMutation(api.users.updateTheme)
    const links = useQuery(api.links.getLinks, user ? { userId: user._id } : "skip")

    const addLink = useMutation(api.links.addLink)
    const updateLinkMutation = useMutation(api.links.updateLink)
    const toggleLinkMutation = useMutation(api.links.toggleLink)
    const deleteLinkMutation = useMutation(api.links.deleteLink)
    const reorderLinksMutation = useMutation(api.links.reorderLinks)

    const router = useRouter()
    const [localLinks, setLocalLinks] = useState<any[]>([])

    useEffect(() => {
        if (links) setLocalLinks(links)
    }, [links])

    const onDragEnd = async (result: DropResult) => {
        if (!result.destination) return
        if (result.source.index === result.destination.index) return
        
        const items = Array.from(localLinks)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        
        const updatedItems = items.map((item, index) => ({ ...item, order: index }))
        setLocalLinks(updatedItems)
        
        try {
            await reorderLinksMutation({
                updates: updatedItems.map(item => ({ _id: item._id, order: item.order }))
            })
        } catch (error) {
            setLocalLinks(links || [])
            toast.error("Failed to reorder links")
        }
    }

    // Image upload mutations
    const generateUploadUrl = useMutation(api.files.generateUploadUrl)
    const saveImageUrl = useMutation(api.files.saveImageUrl)

    // Form states for editing profile
    const [editName, setEditName] = useState("")
    const [editBio, setEditBio] = useState("")
    const [editUsername, setEditUsername] = useState("")
    const [hasInitializedForm, setHasInitializedForm] = useState(false)

    useEffect(() => {
        storeUser()
    }, [storeUser])

    useEffect(() => {
        if (user && !hasInitializedForm) {
            setEditName(user.name || "")
            setEditBio(user.bio || "")
            setEditUsername(user.username || "")
            setHasInitializedForm(true)
        }
    }, [user, hasInitializedForm])

    // Sync form with latest user data only when NOT editing or when starting to edit
    // This prevents background updates (like image storage ID resolving) from wiping current typing
    const startEditing = () => {
        if (user) {
            setEditName(user.name || "")
            setEditBio(user.bio || "")
            setEditUsername(user.username || "")
        }
        setIsEditingProfile(true)
    }

    if (user === undefined) return <div className="flex items-center justify-center h-full text-zinc-500 font-outfit">Loading your dashboard...</div>

    const handleUpdateProfile = async () => {
        if (!user) return
        try {
            await updateProfile({
                name: editName,
                bio: editBio,
                username: editUsername,
            })
            setIsEditingProfile(false)
            toast.success("Profile updated!")
        } catch (error: any) {
            toast.error(error.message || "Failed to update profile")
        }
    }

    const copyToClipboard = () => {
        if (!user?.username) return
        const url = `${window.location.origin}/${user.username}`
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploadingImage(true)
        try {
            const postUrl = await generateUploadUrl()
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            })
            const { storageId } = await result.json()
            await saveImageUrl({ storageId })
            toast.success("Profile photo updated!")
        } catch (error) {
            toast.error("Failed to upload image")
        } finally {
            setIsUploadingImage(false)
        }
    }

    const openEditLink = (link: any) => {
        setEditingLink(link)
        setIsEditModalOpen(true)
    }

    // Using localLinks for optimistic UI

    return (
        <div className="flex flex-col lg:flex-row h-full gap-8 p-6 max-w-7xl mx-auto">
            {/* Editor Column */}
            <div className="flex-1 space-y-8 max-w-2xl">
                <section className="space-y-4 font-outfit">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold tracking-tight text-white">Profile</h2>
                        {user?.username && (
                            <div className="flex items-center gap-2 bg-zinc-950/50 border border-zinc-900 rounded-full px-4 py-1.5 transition-all hover:border-zinc-700 group">
                                <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Your Link:</span>
                                <span className="text-sm font-bold text-white tracking-tight">linkroot.com/{user.username}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-zinc-500 hover:text-white transition-colors"
                                    onClick={copyToClipboard}
                                >
                                    {copied ? <Check className="size-3.5 text-green-500" /> : <Copy className="size-3.5" />}
                                </Button>
                            </div>
                        )}
                    </div>

                    <Card className="bg-zinc-950 border-zinc-900 shadow-none overflow-hidden">
                        <CardContent className="pt-6">
                            {!isEditingProfile ? (
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                        <Avatar
                                            onClick={() => fileInputRef.current?.click()}
                                            className="h-24 w-24 border-2 border-zinc-800 group-hover:border-white transition-colors cursor-pointer relative"
                                        >
                                            <AvatarImage src={user?.image} alt={user?.name || "User"} />
                                            <AvatarFallback className="text-2xl bg-zinc-900 text-zinc-400">
                                                {user?.name?.[0] || user?.email?.[0] || "U"}
                                            </AvatarFallback>
                                            {isUploadingImage && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full">
                                                    <Loader2 className="size-6 text-white animate-spin" />
                                                </div>
                                            )}
                                        </Avatar>
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="absolute -bottom-1 -right-1 p-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors cursor-pointer"
                                        >
                                            <Camera className="size-3.5" />
                                        </div>
                                    </div>
                                    <div className="flex-1 w-full space-y-4">
                                        <div className="space-y-2 text-center sm:text-left">
                                            <h3 className="font-semibold text-white text-lg">{user?.name || "No name set"}</h3>
                                            <p className="text-sm text-zinc-500">{user?.bio || "No bio yet. Tell the world about yourself!"}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={startEditing}
                                                variant="outline"
                                                size="sm"
                                                className="w-full sm:w-auto border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all font-bold"
                                            >
                                                Edit Profile
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Display Name</label>
                                            <Input
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                placeholder="e.g. John Doe"
                                                className="bg-zinc-900 border-zinc-800 focus:border-white transition-all rounded-xl"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Username</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 text-sm font-medium">linkroot.com/</span>
                                                <Input
                                                    value={editUsername}
                                                    onChange={(e) => setEditUsername(e.target.value)}
                                                    placeholder="username"
                                                    className="pl-[100px] bg-zinc-900 border-zinc-800 focus:border-white transition-all rounded-xl"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Bio</label>
                                        <Textarea
                                            value={editBio}
                                            onChange={(e) => setEditBio(e.target.value)}
                                            placeholder="Building weird and useful stuff."
                                            className="bg-zinc-900 border-zinc-800 focus:border-white transition-all rounded-xl min-h-[100px]"
                                        />
                                    </div>
                                    <div className="flex items-center justify-end gap-3 pt-2">
                                        <Button
                                            variant="ghost"
                                            onClick={() => setIsEditingProfile(false)}
                                            className="text-zinc-500 hover:text-white"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={handleUpdateProfile}
                                            className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 font-bold"
                                        >
                                            Save Changes
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    {!user?.username && !isEditingProfile && (
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
                            <Info className="size-5 text-blue-500 mt-0.5" />
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-blue-400">Set your username</p>
                                <p className="text-xs text-blue-400/80 leading-relaxed font-medium">Create a personalized link for your profile to share with the world.</p>
                            </div>
                        </div>
                    )}
                </section>

                <section className="space-y-4 font-outfit">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold tracking-tight text-white">Links</h2>
                        <Button onClick={() => setIsAddModalOpen(true)} className="rounded-full bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/5 transition-all hover:scale-105 active:scale-95">
                            <Plus className="size-4 mr-2" /> Add Link
                        </Button>
                    </div>

                    <div className="space-y-3">
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="links">
                                {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                                        {localLinks.map((link, index) => (
                                            <Draggable key={link._id} draggableId={link._id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        className={cn(snapshot.isDragging && "z-50 relative opacity-80 scale-[1.02] shadow-xl")}
                                                    >
                                                        <Card className="group border-zinc-900 transition-all hover:shadow-md bg-zinc-950/50 backdrop-blur-sm">
                                                            <CardContent className="p-4 flex items-center gap-4">
                                                                <div 
                                                                    {...provided.dragHandleProps}
                                                                    className="cursor-grab active:cursor-grabbing p-1 text-zinc-600 hover:text-zinc-400 transition-colors"
                                                                >
                                                                    <GripVertical className="size-4" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="text-zinc-500">
                                                                            {getPlatformIcon(link.url)}
                                                                        </div>
                                                                        <span className="font-semibold text-white truncate">{link.title}</span>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-6 w-6 text-zinc-600 hover:text-white transition-colors"
                                                                            onClick={() => openEditLink(link)}
                                                                        >
                                                                            <Pencil className="size-3" />
                                                                        </Button>
                                                                    </div>
                                                                    <div className="flex items-center gap-1 text-xs text-zinc-500 font-medium">
                                                                        <Link2 className="size-3" />
                                                                        <span className="truncate">{link.url}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-4">
                                                                    <Switch
                                                                        checked={link.isActive}
                                                                        onCheckedChange={(checked) => toggleLinkMutation({ linkId: link._id, isActive: checked })}
                                                                        className="data-[state=checked]:bg-white data-[state=checked]:border-white"
                                                                    />
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-8 w-8 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                                                        onClick={() => deleteLinkMutation({ linkId: link._id })}
                                                                    >
                                                                        <Trash2 className="size-4" />
                                                                    </Button>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        
                        {localLinks.length === 0 && (
                            <div className="text-center py-12 border-2 border-dashed border-zinc-900 rounded-2xl bg-zinc-950/20">
                                <div className="size-12 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Link2 className="size-6 text-zinc-500" />
                                </div>
                                <div className="space-y-1 px-8">
                                    <p className="font-bold text-white">Show the world what you do</p>
                                    <p className="text-xs text-zinc-500 leading-relaxed font-medium">Add your first link to start building your Linkroot page.</p>
                                </div>
                            </div>
                        )}

                        {/* Premium Branding Toggle */}
                        {localLinks.length > 0 && (
                            <Card className="border-zinc-800 bg-black backdrop-blur-sm mt-8 transition-colors hover:border-zinc-600 shadow-sm relative overflow-hidden group/pro">
                                <CardContent className="p-5 flex items-center justify-between gap-4 relative z-10">
                                    <div className="space-y-1.5 z-10">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-white text-sm">Remove Linkroot branding</h3>
                                            <span className="text-[10px] uppercase tracking-wider font-bold bg-white text-black px-1.5 py-0.5 rounded-sm">Pro</span>
                                        </div>
                                        <p className="text-xs text-zinc-400 font-medium">Keep your page completely clean and white-labeled.</p>
                                    </div>
                                    {user?.isPro ? (
                                        <Switch
                                            className="data-[state=checked]:bg-white data-[state=checked]:border-white z-10"
                                            checked={user?.removeBranding || false}
                                            onCheckedChange={(checked) => {
                                                updateBranding({ removeBranding: checked });
                                                toast.success(checked ? "Linkroot branding removed" : "Linkroot branding enabled");
                                            }}
                                        />
                                    ) : (
                                        <Popover>
                                            <PopoverTrigger render={<div className="focus:outline-none inline-block" />} nativeButton={false}>
                                                <Switch
                                                    className="data-[state=checked]:bg-white data-[state=checked]:border-white z-10 pointer-events-none"
                                                    checked={false}
                                                />
                                            </PopoverTrigger>
                                            <PopoverContent className="max-w-[300px] text-sm space-y-2 bg-zinc-950 border-zinc-800 text-zinc-300 shadow-2xl" side="top" sideOffset={12}>
                                                <p className="font-medium text-white">Premium Plan</p>
                                                <p className="text-zinc-400">
                                                  Customizing styling and removing Linkroot branding requires an active Pro subscription. Upgrade to claim full control over your page.
                                                </p>
                                                <p className="flex items-center space-x-2 pt-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => router.push("/pricing")}>
                                                  <Badge variant="destructive" size="sm">
                                                    Note!
                                                  </Badge>
                                                  <span className="text-xs text-zinc-400 underline decoration-zinc-600 underline-offset-2">Go to Pro tab to upgrade</span>
                                                </p>
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {localLinks.length > 0 && (
                            <Popover>
                                <PopoverTrigger 
                                    nativeButton={false}
                                    render={
                                        <Card className="border-zinc-800 bg-black backdrop-blur-sm mt-4 transition-colors hover:border-zinc-600 shadow-sm relative overflow-hidden group/theme cursor-pointer focus:outline-none">
                                            <CardContent className="p-5 flex items-center justify-between gap-4 relative z-10">
                                                <div className="space-y-1.5 z-10">
                                                    <div className="flex items-center gap-2">
                                                        <Palette className="size-4 text-zinc-400" />
                                                        <h3 className="font-bold text-white text-sm">Add custom theme's</h3>
                                                    </div>
                                                    <p className="text-xs text-zinc-400 font-medium">Choose a beautiful background pattern for your page.</p>
                                                </div>
                                                <div className="p-2 rounded-full bg-zinc-900 group-hover/theme:bg-white group-hover/theme:text-black transition-colors">
                                                    <Plus className="size-4" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    } 
                                />
                                <PopoverContent className="w-[500px] p-6 bg-zinc-950 border-zinc-900 shadow-2xl" side="right" align="end" sideOffset={20}>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h2 className="text-lg font-bold text-white">Select Theme</h2>
                                                <p className="text-xs text-zinc-500 font-medium">Patterns and backgrounds</p>
                                            </div>
                                        </div>
                                        <ThemeSelector
                                            selectedThemeId={user?.theme}
                                            isPro={user?.isPro || false}
                                            onSelect={async (themeId) => {
                                                await updateTheme({ theme: themeId });
                                                toast.success("Theme updated!");
                                            }}
                                        />
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                </section>
            </div>

            {/* Preview Column (Mobile Phone Mockup) */}
            <div className="hidden xl:flex sticky top-24 h-fit flex-1 justify-center pb-12">
                <div className="relative w-[320px] aspect-[9/19] bg-zinc-950 rounded-[3.5rem] border-[10px] border-zinc-900 shadow-[0_0_80px_rgba(0,0,0,0.5)] p-4 overflow-hidden outline outline-1 outline-zinc-800">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-zinc-900 rounded-b-[1.5rem] z-20 flex items-end justify-center pb-1.5">
                        <div className="w-10 h-1 bg-zinc-800 rounded-full" />
                    </div>

                    <div className="h-full w-full rounded-[2.5rem] bg-black text-white overflow-hidden flex flex-col items-center justify-center p-2 no-scrollbar font-outfit dark relative">
                        <Background themeId={user?.theme} />
                        <div className="relative z-10 w-full flex items-center justify-center">
                            <SocialCard
                                className="scale-[0.85] shadow-none border-none bg-transparent dark:bg-transparent text-white"
                                image={user?.image || "https://github.com/shadcn.png"}
                                title={`${(isEditingProfile ? editName : user?.name) || "User"}'s Linkroot`}
                                name={(isEditingProfile ? editName : user?.name) || "Your Name"}
                                pitch={(isEditingProfile ? editBio : user?.bio) || "Your bio will appear here."}
                                buttons={localLinks.filter(l => l.isActive).map(link => ({
                                    label: link.title,
                                    icon: getPlatformIcon(link.url),
                                    link: link.url
                                }))}
                            />
                        </div>

                        {/* Preview Branding Badge */}
                        {!(user?.isPro && user?.removeBranding) && (
                            <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20 scale-[0.65] pointer-events-none opacity-80">
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        "gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-medium tracking-widest backdrop-blur-sm transition-colors uppercase",
                                        (PATTERNS.find(p => p.id === user?.theme) || PATTERNS[0]).isLight 
                                            ? "border-zinc-200 bg-white/50 text-zinc-900" 
                                            : "border-zinc-800 bg-zinc-950/50 text-zinc-500"
                                    )}
                                >
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 200 200"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="opacity-70"
                                    >
                                        <path d="M65.3404 78.6901C62.42 72.6221 61.118 65.9022 61.5607 59.1826C62.0035 52.4629 64.1761 45.9719 67.8675 40.3396C71.5589 34.7073 76.6438 30.1251 82.6286 27.0377C88.6133 23.9503 95.2946 22.4626 102.024 22.7191C108.753 22.9756 115.302 24.9676 121.034 28.5016C126.767 32.0356 131.488 36.9916 134.74 42.8885C137.992 48.7855 139.664 55.423 139.594 62.1569C139.524 68.8907 137.714 75.4921 134.34 81.3201L102.82 136L112.27 152.37L148.55 89.5301C155.711 76.8108 157.566 61.7803 153.712 47.7018C149.858 33.6233 140.606 21.6332 127.966 14.3345C115.325 7.03585 100.315 5.01775 86.1959 8.71837C72.0763 12.419 59.9862 21.5396 52.5504 34.1001C48.6014 40.8482 46.1424 48.3634 45.3387 56.1406C44.5349 63.9178 45.405 71.777 47.8904 79.1901C50.4182 78.8737 52.963 78.7134 55.5104 78.7101L65.3404 78.6901Z" fill="currentColor"/>
                                        <path d="M192.49 110.49C188.573 103.613 183.212 97.6655 176.776 93.0581C170.341 88.4506 162.983 85.2922 155.21 83.8001C154.224 86.1582 153.092 88.4527 151.82 90.6701L146.88 99.2201C153.622 99.6343 160.142 101.79 165.802 105.476C171.462 109.162 176.07 114.254 179.174 120.252C182.279 126.251 183.775 132.953 183.517 139.703C183.258 146.452 181.253 153.02 177.698 158.763C174.143 164.507 169.16 169.23 163.234 172.473C157.308 175.715 150.643 177.365 143.889 177.262C137.135 177.159 130.524 175.306 124.7 171.885C118.876 168.463 114.038 163.59 110.66 157.74L79.1904 103.24H60.3004L96.4804 165.92C97.7245 168.059 99.104 170.117 100.61 172.08L100.91 172.47C106.063 179.103 112.673 184.461 120.228 188.13C127.783 191.8 136.082 193.681 144.48 193.63C154.209 193.629 163.767 191.067 172.192 186.202C180.617 181.337 187.613 174.34 192.478 165.915C197.342 157.489 199.903 147.932 199.904 138.203C199.904 128.474 197.344 118.916 192.48 110.49H192.49Z" fill="currentColor"/>
                                        <path d="M88.1504 159.66C84.4914 165.231 79.4675 169.772 73.5571 172.852C67.6467 175.931 61.0463 177.447 54.3844 177.255C47.7225 177.062 41.2207 175.168 35.4979 171.752C29.7751 168.336 25.0218 163.512 21.6904 157.74C18.2632 151.802 16.459 145.067 16.4589 138.21C16.4589 131.354 18.263 124.619 21.6901 118.681C25.1173 112.742 30.0466 107.811 35.9832 104.381C41.9197 100.951 48.6543 99.1434 55.5104 99.1401H118.58L128 82.7801H55.5104C48.1693 82.6815 40.8817 84.0423 34.0707 86.7834C27.2598 89.5245 21.0613 93.5914 15.8351 98.7478C10.6089 103.904 6.45917 110.048 3.62681 116.821C0.794458 123.595 -0.664062 130.863 -0.664062 138.205C-0.664062 145.547 0.794458 152.816 3.62681 159.589C6.45917 166.363 10.6089 172.506 15.8351 177.662C21.0613 182.819 27.2598 186.886 34.0707 189.627C40.8817 192.368 48.1693 193.729 55.5104 193.63C63.4508 193.677 71.3064 191.996 78.5327 188.705C85.7591 185.414 92.1834 180.591 97.3604 174.57C95.7428 172.481 94.2662 170.286 92.9404 168L88.1504 159.66Z" fill="currentColor"/>
                                    </svg>
                                    Powered by Linkroot
                                </Badge>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <EditLinkModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false)
                    setEditingLink(null)
                }}
                link={editingLink}
                onUpdate={async (linkId, updates) => {
                    await updateLinkMutation({ linkId, ...updates })
                    toast.success("Link updated!")
                }}
            />

            <AddLinkModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={(newLink: { title: string; url: string; platform: string }) => {
                    if (user?._id) {
                        addLink({
                            userId: user._id,
                            title: newLink.title,
                            url: newLink.url,
                            platform: newLink.platform,
                        }).then(() => {
                            toast.success("Link added!")
                        })
                    } else {
                        toast.error("User not initialized. Please try again in a moment.")
                    }
                    setIsAddModalOpen(false)
                }}
            />
        </div>
    )
}
