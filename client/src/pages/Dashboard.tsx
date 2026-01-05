import Layout from "@/components/layout/Layout";
import { EmployeeDashboard, ManagerDashboard, AdminDashboard } from "@/components/dashboard/Dashboards";
import { currentUser, UserRole } from "@/lib/mockData";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Dashboard() {
  // For demo purposes, allow role switching
  const [role, setRole] = useState<UserRole>(currentUser.role);

  // Update the mock user role for the session (in a real app this would be backend auth)
  currentUser.role = role;

  return (
    <Layout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">View as:</span>
          <Select value={role} onValueChange={(val: UserRole) => setRole(val)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employee">Employee</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="admin">HR Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {role === "employee" && <EmployeeDashboard />}
      {role === "manager" && <ManagerDashboard />}
      {role === "admin" && <AdminDashboard />}
    </Layout>
  );
}
