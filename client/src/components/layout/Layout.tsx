import { Sidebar, MobileSidebar } from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr] xl:grid-cols-[240px_1fr]">
      <div className="hidden border-none md:block shadow-2xl z-50">
        <Sidebar />
      </div>
      <div className="flex flex-col relative">
        <header className="flex h-14 items-center gap-4 border-b bg-white/50 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6 md:hidden z-40">
          <MobileSidebar />
          <div className="w-full flex-1">
            <span className="font-bold tracking-tight">Estadeem Consultancy</span>
          </div>
        </header>
        {/* Ambient background is handled in index.css body gradient */}
        <main className="flex flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:gap-8 lg:px-8 lg:py-8 relative overflow-x-hidden">
          <div className="w-full max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
