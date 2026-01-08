import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  DollarSign,
  Users,
  Calendar,
  FileText,
  LogOut,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { currentUser } from "@/lib/mockData";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: DollarSign, label: "Payroll", href: "/payroll", roles: ["admin", "employee"] },
  { icon: Users, label: "Employees", href: "/employees", roles: ["admin", "manager"] },
  { icon: Calendar, label: "Leave & WFH", href: "/leave" },
  { icon: FileText, label: "Documents", href: "/documents" },
];

export function Sidebar() {
  const [location] = useLocation();
  const isMobile = useIsMobile();

  const filteredItems = sidebarItems.filter(
    (item) => !item.roles || item.roles.includes(currentUser.role)
  );

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground overflow-hidden">
      <div className="flex h-16 items-center px-4 mb-2 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 blur-3xl -mr-16 -mt-16 rounded-full" />
        <Link href="/" className="flex items-center gap-2 relative z-10">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary text-white shadow-lg shadow-indigo-500/20">
            <span className="text-lg font-black tracking-tighter italic">Es</span>
          </div>
          <div className="flex flex-col hidden sm:flex">
            <span className="font-black text-sm leading-tight tracking-tighter">Estadeem</span>
          </div>
        </Link>
      </div>
      <div className="flex-1 overflow-auto px-3 space-y-0.5">
        <nav className="grid gap-0.5">
          {filteredItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2.5 transition-all duration-300 group relative overflow-hidden text-xs",
                  location === item.href
                    ? "bg-white/10 text-white font-semibold shadow-lg"
                    : "text-sidebar-foreground/60 hover:text-white hover:bg-white/5"
                )}
              >
                {location === item.href && (
                  <div className="absolute inset-0 bg-gradient-primary opacity-10" />
                )}
                <item.icon className={cn("h-3.5 w-3.5 transition-all duration-300 group-hover:scale-110 flex-shrink-0", location === item.href ? "text-gradient opacity-100" : "opacity-40 group-hover:opacity-100")} strokeWidth={2.4} />
                <span className="text-[11px] tracking-tight hidden sm:inline">{item.label}</span>
                {location === item.href && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gradient-primary shadow-glow shadow-indigo-500" />
                )}
              </a>
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-3 mt-auto">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5 relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-primary opacity-5 blur-2xl rounded-full" />
          <div className="flex items-center gap-2 mb-3">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-9 w-9 rounded-lg object-cover border-2 border-white/10"
              />
              <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-secondary border-2 border-sidebar" />
            </div>
            <div className="grid gap-0 overflow-hidden hidden sm:grid">
              <span className="font-semibold text-[11px] truncate">{currentUser.name}</span>
              <span className="text-[8px] opacity-50 truncate font-semibold uppercase tracking-[0.15em]">{currentUser.department}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 h-8 text-sidebar-foreground/60 hover:text-white hover:bg-white/10 rounded-md transition-all text-[10px]">
            <LogOut className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.15em] hidden sm:inline">Sign Out</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0 md:hidden hover:bg-white/10">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[300px] border-none bg-sidebar">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
