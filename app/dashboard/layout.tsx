import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-background">
                <AppSidebar />
                <SidebarInset className="flex flex-col bg-zinc-950">
                    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-zinc-900 bg-black/80 backdrop-blur px-4">
                        <SidebarTrigger className="-ml-1 text-zinc-400 hover:text-white" />
                        <div className="h-4 w-px bg-zinc-800 mx-2" />
                        <span className="text-sm font-bold text-zinc-400 uppercase tracking-[0.2em] font-outfit">Dashboard</span>
                    </header>
                    <main className="flex-1 overflow-y-auto bg-black font-outfit">
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
