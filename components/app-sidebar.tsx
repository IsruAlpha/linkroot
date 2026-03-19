"use client"

import * as React from "react"
import {
    MoreHorizontal,
    LogOut,
    User as UserIcon,
    Settings2,
} from "lucide-react"
import { LinkIcon } from "@/components/ui/link"
import { BookTextIcon } from "@/components/ui/book-text"
import { DollarSignIcon } from "@/components/ui/dollar-sign"
import { BotMessageSquareIcon } from "@/components/ui/bot-message-square"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@workos-inc/authkit-nextjs/components"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/base-badge"

const NavMainItem = ({ item, pathname }: { item: any, pathname: string }) => {
    const iconRef = React.useRef<any>(null);
    const isActive = pathname === item.url;

    return (
        <SidebarMenuItem
            onMouseEnter={() => iconRef.current?.startAnimation()}
            onMouseLeave={() => iconRef.current?.stopAnimation()}
        >
            <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.title}
                className="hover:bg-zinc-900 text-zinc-400 data-[active=true]:text-white data-[active=true]:bg-zinc-900 transition-colors py-6 group/item"
            >
                <Link href={item.url} className="flex items-center gap-3">
                    {item.icon && (
                        <item.icon
                            ref={iconRef}
                            size={20}
                            className={cn(
                                "transition-colors",
                                isActive ? "text-white" : "text-zinc-400 group-hover/item:text-white"
                            )}
                        />
                    )}
                    <span className="font-semibold text-base">{item.title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    const { user } = useAuth()
    const userData = useQuery(api.users.getMe)
    const isPro = userData?.isPro || false
    const signOutUrl = "/sign-out"

    const navMain = [
        {
            title: "Links",
            url: "/dashboard",
            icon: LinkIcon,
        },
        {
            title: "Blog",
            url: "/blog",
            icon: BookTextIcon,
        },
        {
            title: "Pro",
            url: "/pricing",
            icon: DollarSignIcon,
        },
        {
            title: "Chatbot",
            url: "/dashboard/chatbot",
            icon: BotMessageSquareIcon,
        },
    ]

    return (
        <Sidebar collapsible="icon" {...props} className="border-r border-zinc-900 bg-black text-white dark">
            <SidebarHeader className="bg-black pt-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="px-2 mb-2">
                            <div className="flex items-center gap-2">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 200 200"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-white"
                                >
                                    <g clipPath="url(#clip0-sidebar)">
                                        <path
                                            d="M65.3404 78.6901C62.42 72.6221 61.118 65.9022 61.5607 59.1826C62.0035 52.4629 64.1761 45.9719 67.8675 40.3396C71.5589 34.7073 76.6438 30.1251 82.6286 27.0377C88.6133 23.9503 95.2946 22.4626 102.024 22.7191C108.753 22.9756 115.302 24.9676 121.034 28.5016C126.767 32.0356 131.488 36.9916 134.74 42.8885C137.992 48.7855 139.664 55.423 139.594 62.1569C139.524 68.8907 137.714 75.4921 134.34 81.3201L102.82 136L112.27 152.37L148.55 89.5301C155.711 76.8108 157.566 61.7803 153.712 47.7018C149.858 33.6233 140.606 21.6332 127.966 14.3345C115.325 7.03585 100.315 5.01775 86.1959 8.71837C72.0763 12.419 59.9862 21.5396 52.5504 34.1001C48.6014 40.8482 46.1424 48.3634 45.3387 56.1406C44.5349 63.9178 45.405 71.777 47.8904 79.1901C50.4182 78.8737 52.963 78.7134 55.5104 78.7101L65.3404 78.6901Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M192.49 110.49C188.573 103.613 183.212 97.6655 176.776 93.0581C170.341 88.4506 162.983 85.2922 155.21 83.8001C154.224 86.1582 153.092 88.4527 151.82 90.6701L146.88 99.2201C153.622 99.6343 160.142 101.79 165.802 105.476C171.462 109.162 176.07 114.254 179.174 120.252C182.279 126.251 183.775 132.953 183.517 139.703C183.258 146.452 181.253 153.02 177.698 158.763C174.143 164.507 169.16 169.23 163.234 172.473C157.308 175.715 150.643 177.365 143.889 177.262C137.135 177.159 130.524 175.306 124.7 171.885C118.876 168.463 114.038 163.59 110.66 157.74L79.1904 103.24H60.3004L96.4804 165.92C97.7245 168.059 99.104 170.117 100.61 172.08L100.91 172.47C106.063 179.103 112.673 184.461 120.228 188.13C127.783 191.8 136.082 193.681 144.48 193.63C154.209 193.629 163.767 191.067 172.192 186.202C180.617 181.337 187.613 174.34 192.478 165.915C197.342 157.489 199.903 147.932 199.904 138.203C199.904 128.474 197.344 118.916 192.48 110.49H192.49Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M88.1504 159.66C84.4914 165.231 79.4675 169.772 73.5571 172.852C67.6467 175.931 61.0463 177.447 54.3844 177.255C47.7225 177.062 41.2207 175.168 35.4979 171.752C29.7751 168.336 25.0218 163.512 21.6904 157.74C18.2632 151.802 16.459 145.067 16.4589 138.21C16.4589 131.354 18.263 124.619 21.6901 118.681C25.1173 112.742 30.0466 107.811 35.9832 104.381C41.9197 100.951 48.6543 99.1434 55.5104 99.1401H118.58L128 82.7801H55.5104C48.1693 82.6815 40.8817 84.0423 34.0707 86.7834C27.2598 89.5245 21.0613 93.5914 15.8351 98.7478C10.6089 103.904 6.45917 110.048 3.62681 116.821C0.794458 123.595 -0.664062 130.863 -0.664062 138.205C-0.664062 145.547 0.794458 152.816 3.62681 159.589C6.45917 166.363 10.6089 172.506 15.8351 177.662C21.0613 182.819 27.2598 186.886 34.0707 189.627C40.8817 192.368 48.1693 193.729 55.5104 193.63C63.4508 193.677 71.3064 191.996 78.5327 188.705C85.7591 185.414 92.1834 180.591 97.3604 174.57C95.7428 172.481 94.2662 170.286 92.9404 168L88.1504 159.66Z"
                                            fill="currentColor"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0-sidebar">
                                            <rect width="200" height="200" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <span className="text-base font-semibold tracking-tight font-outfit text-white group-data-[collapsible=icon]:hidden">Linkroot</span>
                            </div>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="bg-black">
                <SidebarMenu className="px-2 pt-4">
                    {navMain.map((item) => (
                        <NavMainItem key={item.title} item={item} pathname={pathname} />
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="bg-black border-t border-zinc-900">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-zinc-900 data-[state=open]:text-white hover:bg-zinc-900 text-white"
                                >
                                    <Avatar className="h-8 w-8 rounded-full border border-zinc-800">
                                        <AvatarImage src={user?.profilePictureUrl ?? ""} alt={user?.firstName ?? "User"} />
                                        <AvatarFallback className="bg-zinc-800 text-zinc-400">
                                            {user?.firstName?.[0] ?? user?.email?.[0] ?? "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{user?.email ?? "User"}</span>
                                        <span className="truncate text-xs text-zinc-500">{user?.email ?? ""}</span>
                                    </div>
                                    <MoreHorizontal className="ml-auto size-4 text-zinc-500" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl bg-zinc-950 border-zinc-800 text-white shadow-2xl"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-3 px-2 py-2 text-left text-sm">
                                        <Avatar className="h-9 w-9 rounded-full border border-zinc-800">
                                            <AvatarImage src={user?.profilePictureUrl ?? ""} alt={user?.firstName ?? "User"} />
                                            <AvatarFallback className="bg-zinc-800 text-zinc-400">
                                                {user?.firstName?.[0] ?? user?.email?.[0] ?? "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">{user?.email ?? "User"}</span>
                                            <span className="truncate text-xs text-zinc-500">{user?.email ?? ""}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-zinc-800" />
                                <DropdownMenuItem className="focus:bg-zinc-900 focus:text-white cursor-pointer py-3 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <UserIcon className="mr-3 size-4" />
                                        Account
                                    </div>
                                    <Badge 
                                        variant={isPro ? "primary" : "outline"} 
                                        className={cn(
                                            "text-[10px] px-1.5 h-4 font-bold uppercase tracking-tight",
                                            isPro ? "bg-white text-black" : "border-zinc-800 text-zinc-500"
                                        )}
                                    >
                                        {isPro ? "Pro" : "Free"}
                                    </Badge>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-zinc-800" />
                                <DropdownMenuItem
                                    className="focus:bg-destructive focus:text-white text-destructive cursor-pointer py-3"
                                    asChild
                                >
                                    <a href={signOutUrl}>
                                        <LogOut className="mr-3 size-4" />
                                        Log out
                                    </a>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
