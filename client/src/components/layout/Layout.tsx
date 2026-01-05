import { Sidebar, MobileSidebar } from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[300px_1fr]">
      <div className="hidden border-none md:block shadow-2xl z-50">
        <Sidebar />
      </div>
      <div className="flex flex-col relative">
        <header className="flex h-14 items-center gap-4 border-b bg-white/50 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6 md:hidden z-40">
          <MobileSidebar />
          <div className="w-full flex-1">
            <span className="font-bold tracking-tight">Acme HR</span>
          </div>
        </header>
        {/* Ambient background is handled in index.css body gradient */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-8 lg:p-10 relative overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
