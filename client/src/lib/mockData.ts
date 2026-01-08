import { addDays, subDays, format } from "date-fns";

// Types
export type UserRole = "employee" | "manager" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
  position: string;
  joinDate: string;
}

export interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  type: "Annual" | "Sick" | "Remote" | "Unpaid";
  startDate: string;
  endDate: string;
  days: number;
  status: "pending" | "approved" | "rejected";
  reason: string;
}

export interface Document {
  id: string;
  name: string;
  type: "Contract" | "ID" | "Visa" | "Tax";
  status: "valid" | "expiring" | "expired";
  expiryDate: string;
  ownerId: string;
  ownerName: string;
}

export interface PayrollRun {
  id: string;
  month: string;
  status: "Draft" | "Approved" | "Sent to Xero";
  totalAmount: number;
  employeesCount: number;
  paymentDate: string;
}

// Mock Data
export const currentUser: User = {
  id: "u1",
  name: "Ahmad Younis",
  email: "ahmad.younis@company.com",
  role: "admin", // Default role for initial view, will add switcher
  avatar: `${import.meta.env.BASE_URL}AhmadYounisEstadeem.jpg`,
  department: "Executive",
  position: "CEO",
  joinDate: "2022-03-15",
};

export const employees: User[] = [
  currentUser,
  {
    id: "u2",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    role: "manager",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "Product",
    position: "Product Director",
    joinDate: "2021-06-01",
  },
  {
    id: "u3",
    name: "Michael Scott",
    email: "michael.scott@company.com",
    role: "employee",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "Sales",
    position: "Regional Manager",
    joinDate: "2020-01-10",
  },
  {
    id: "u4",
    name: "Emily Blunt",
    email: "emily.blunt@company.com",
    role: "employee",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "HR",
    position: "HR Specialist",
    joinDate: "2023-02-15",
  },
];

export const leaveRequests: LeaveRequest[] = [
  {
    id: "lr1",
    userId: "u3",
    userName: "Michael Scott",
    type: "Annual",
    startDate: format(addDays(new Date(), 5), "yyyy-MM-dd"),
    endDate: format(addDays(new Date(), 10), "yyyy-MM-dd"),
    days: 5,
    status: "pending",
    reason: "Family vacation to Bahamas",
  },
  {
    id: "lr2",
    userId: "u4",
    userName: "Emily Blunt",
    type: "Sick",
    startDate: format(subDays(new Date(), 2), "yyyy-MM-dd"),
    endDate: format(subDays(new Date(), 1), "yyyy-MM-dd"),
    days: 1,
    status: "approved",
    reason: "Flu",
  },
  {
    id: "lr3",
    userId: "u2",
    userName: "Sarah Chen",
    type: "Remote",
    startDate: format(addDays(new Date(), 1), "yyyy-MM-dd"),
    endDate: format(addDays(new Date(), 1), "yyyy-MM-dd"),
    days: 1,
    status: "pending",
    reason: "Plumber visiting",
  },
];

export const documents: Document[] = [
  {
    id: "d1",
    name: "Employment Contract",
    type: "Contract",
    status: "valid",
    expiryDate: "2026-03-15",
    ownerId: "u1",
    ownerName: "Ahmad Younis",
  },
  {
    id: "d2",
    name: "Passport Copy",
    type: "ID",
    status: "expiring",
    expiryDate: format(addDays(new Date(), 15), "yyyy-MM-dd"),
    ownerId: "u3",
    ownerName: "Michael Scott",
  },
  {
    id: "d3",
    name: "Work Visa",
    type: "Visa",
    status: "expired",
    expiryDate: format(subDays(new Date(), 5), "yyyy-MM-dd"),
    ownerId: "u2",
    ownerName: "Sarah Chen",
  },
];

export const payrollRuns: PayrollRun[] = [
  {
    id: "pr1",
    month: "October 2025",
    status: "Sent to Xero",
    totalAmount: 145000,
    employeesCount: 30,
    paymentDate: "2025-10-28",
  },
  {
    id: "pr2",
    month: "November 2025",
    status: "Sent to Xero",
    totalAmount: 146500,
    employeesCount: 31,
    paymentDate: "2025-11-28",
  },
  {
    id: "pr3",
    month: "December 2025",
    status: "Approved",
    totalAmount: 152000,
    employeesCount: 32,
    paymentDate: "2025-12-28",
  },
  {
    id: "pr4",
    month: "January 2026",
    status: "Draft",
    totalAmount: 152000,
    employeesCount: 32,
    paymentDate: "2026-01-28",
  },
];

export const stats = {
  employee: {
    leaveBalance: 14,
    nextLeave: "Aug 15 (Annual)",
    payslipReady: true,
  },
  manager: {
    pendingRequests: 3,
    teamOnLeave: 1,
  },
  admin: {
    payrollStatus: "Draft",
    expiringDocs: 5,
    totalEmployees: 32,
  },
};
