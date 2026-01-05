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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Welcome back, <span className="text-primary italic">Alex</span>
          </h2>
          <p className="text-muted-foreground mt-1 font-medium">Here's what's happening today at Acme Corp.</p>
        </div>
        <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm p-2 rounded-2xl border border-white shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2">Role Switch</span>
          <Select value={role} onValueChange={(val: UserRole) => setRole(val)}>
            <SelectTrigger className="w-[140px] h-10 rounded-xl border-none bg-background shadow-sm hover:shadow-md transition-all">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border shadow-xl">
              <SelectItem value="employee">Employee</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="admin">HR Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        {role === "employee" && <EmployeeDashboard />}
        {role === "manager" && <ManagerDashboard />}
        {role === "admin" && <AdminDashboard />}
      </div>
    </Layout>
  );
}
