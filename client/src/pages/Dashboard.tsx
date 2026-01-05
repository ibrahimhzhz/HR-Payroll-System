import Layout from "@/components/layout/Layout";
import { EmployeeDashboard, ManagerDashboard, AdminDashboard } from "@/components/dashboard/Dashboards";
import { currentUser, UserRole } from "@/lib/mockData";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Dashboard() {
  const [role, setRole] = useState<UserRole>(currentUser.role);
  currentUser.role = role;

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 relative">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-8 bg-gradient-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500/60">Overview</span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-foreground lg:text-5xl">
            Welcome back, <span className="text-gradient">Alex</span>
          </h2>
          <p className="text-muted-foreground mt-3 font-medium text-lg">System monitoring is active. Everything looks good.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-3 rounded-[1.5rem] shadow-xl shadow-indigo-500/5 border border-white relative z-10">
          <div className="px-3">
             <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Context</span>
          </div>
          <Select value={role} onValueChange={(val: UserRole) => setRole(val)}>
            <SelectTrigger className="w-[160px] h-12 rounded-[1rem] border-none bg-indigo-500/5 shadow-none hover:bg-indigo-500/10 transition-all font-bold">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent className="rounded-[1.25rem] border-none shadow-2xl p-2">
              <SelectItem value="employee" className="rounded-lg font-bold">Employee View</SelectItem>
              <SelectItem value="manager" className="rounded-lg font-bold">Manager View</SelectItem>
              <SelectItem value="admin" className="rounded-lg font-bold">Admin Central</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
        {role === "employee" && <EmployeeDashboard />}
        {role === "manager" && <ManagerDashboard />}
        {role === "admin" && <AdminDashboard />}
      </div>
    </Layout>
  );
}
