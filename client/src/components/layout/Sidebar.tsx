import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  DollarSign,
  Users,
  Calendar,
  FileText,
  Settings,
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
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const [location] = useLocation();
  const isMobile = useIsMobile();

  const filteredItems = sidebarItems.filter(
    (item) => !item.roles || item.roles.includes(currentUser.role)
  );

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-20 items-center px-6 mb-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground shadow-sm">
            <span className="text-xl font-extrabold tracking-tighter italic">Ac</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight tracking-tight">Acme HR</span>
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-60 font-semibold">Premium System</span>
          </div>
        </Link>
      </div>
      <div className="flex-1 overflow-auto px-4">
        <nav className="grid gap-1">
          {filteredItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 group relative",
                  location === item.href
                    ? "bg-sidebar-accent text-sidebar-foreground font-semibold shadow-inner"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                {location === item.href && (
                  <div className="absolute left-0 w-1 h-5 bg-secondary rounded-r-full" />
                )}
                <item.icon className={cn("h-5 w-5 transition-transform group-hover:scale-110", location === item.href ? "text-secondary" : "opacity-70")} strokeWidth={1.5} />
                <span className="text-sm">{item.label}</span>
              </a>
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 mt-auto">
        <div className="bg-sidebar-accent/30 rounded-2xl p-4 border border-sidebar-border/30">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-10 w-10 rounded-full object-cover border-2 border-secondary"
            />
            <div className="grid gap-0.5 overflow-hidden">
              <span className="font-semibold text-sm truncate">{currentUser.name}</span>
              <span className="text-[11px] opacity-60 truncate font-medium">{currentUser.role.toUpperCase()}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 h-9 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-lg">
            <LogOut className="h-4 w-4" />
            <span className="text-xs font-semibold">Sign Out</span>
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
        <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[280px] border-none bg-sidebar">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
