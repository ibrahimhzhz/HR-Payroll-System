import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, DollarSign, FileText, PlusCircle, Users, CheckCircle, XCircle, ArrowUpRight, Zap } from "lucide-react";
import { stats, currentUser, leaveRequests, payrollRuns, documents } from "@/lib/mockData";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

const StatCard = ({ title, value, subtext, icon: Icon, colorClass = "text-primary", progress, gradient }: any) => (
  <Card className="overflow-hidden border-none shadow-xl shadow-indigo-500/5 bg-white hover-glow group relative">
    {gradient && (
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-primary opacity-[0.03] blur-2xl rounded-full -mr-8 -mt-8" />
    )}
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
      <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{title}</CardTitle>
      <div className={cn(
        "p-2.5 rounded-[1rem] transition-all duration-500 group-hover:rotate-12 group-hover:scale-110",
        gradient ? "bg-gradient-primary text-white shadow-lg shadow-indigo-500/20" : `bg-indigo-500/5 ${colorClass}`
      )}>
        <Icon className="h-4 w-4" strokeWidth={2.5} />
      </div>
    </CardHeader>
    <CardContent className="relative z-10 pt-4">
      <div className="text-4xl font-black tracking-tighter">{value}</div>
      <p className="text-[11px] font-bold text-muted-foreground/70 mt-2 flex items-center gap-1.5 uppercase tracking-wider">
        <Zap className="h-3 w-3 text-gradient" /> {subtext}
      </p>
      {progress !== undefined && (
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
            <span>Utilization</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-indigo-500/5" />
        </div>
      )}
    </CardContent>
  </Card>
);

export function EmployeeDashboard() {
  const myLeaves = leaveRequests.filter(lr => lr.userId === currentUser.id);
  const nextLeave = myLeaves.find(lr => lr.status === "approved" && new Date(lr.startDate) > new Date());
  
  return (
    <div className="grid gap-8">
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard 
          title="Leave Credit" 
          value={`${stats.employee.leaveBalance}d`} 
          subtext="Available for booking" 
          icon={Calendar} 
          progress={(stats.employee.leaveBalance / 25) * 100}
          gradient
        />
        <StatCard 
          title="Est. Compensation" 
          value="$4.5k" 
          subtext="Next disbursement: Jan 28" 
          icon={DollarSign} 
          colorClass="text-indigo-500"
        />
        <StatCard 
          title="Schedule Status" 
          value={nextLeave ? "Active" : "Idle"} 
          subtext={nextLeave ? `Holiday on ${nextLeave.startDate}` : "No upcoming leave"} 
          icon={Clock} 
          colorClass="text-amber-500"
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-none shadow-xl shadow-indigo-500/5 bg-white">
          <CardHeader className="border-b border-indigo-500/5 pb-8">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-black tracking-tight">Timeline Activity</CardTitle>
                <CardDescription className="font-medium">Operational history and request status.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="h-10 rounded-xl bg-indigo-500/5 text-[10px] font-black uppercase tracking-widest gap-2 hover:bg-indigo-500/10">
                Full Log <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="space-y-8">
              {myLeaves.length > 0 ? (
                myLeaves.map(leave => (
                  <div key={leave.id} className="flex items-center justify-between group relative">
                    <div className="flex items-center gap-5">
                      <div className={cn(
                        "h-14 w-14 rounded-[1.25rem] flex items-center justify-center shadow-inner transition-all duration-300 group-hover:scale-105",
                        leave.status === 'approved' ? 'bg-secondary/10 text-secondary' : 'bg-indigo-500/5 text-indigo-500'
                      )}>
                        <Calendar className="h-6 w-6" strokeWidth={2} />
                      </div>
                      <div className="grid gap-1">
                        <p className="text-base font-black tracking-tight">{leave.type} Allocation</p>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/20" />
                          {leave.startDate} — {leave.endDate}
                        </p>
                      </div>
                    </div>
                    <Badge className={cn(
                      "rounded-xl px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border-none shadow-none",
                      leave.status === "approved" ? "bg-secondary text-secondary-foreground" : 
                      leave.status === "pending" ? "bg-indigo-500/10 text-indigo-600" : "bg-destructive text-white shadow-lg shadow-destructive/20"
                    )}>
                      {leave.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center bg-indigo-500/5 rounded-[2rem] border border-dashed border-indigo-500/10">
                   <div className="p-5 bg-white rounded-[1.5rem] shadow-sm mb-4">
                     <Calendar className="h-8 w-8 text-muted-foreground/30" strokeWidth={1.5} />
                   </div>
                   <p className="text-sm font-black text-muted-foreground/50 uppercase tracking-widest">No Activity Records</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card className="border-none shadow-xl shadow-indigo-500/5 bg-gradient-primary text-white p-2 overflow-hidden relative group">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none group-hover:scale-125 transition-transform duration-700">
              <PlusCircle className="h-32 w-32" />
            </div>
            <CardHeader className="relative z-10 pb-4">
              <CardTitle className="text-xl font-black">Quick Actions</CardTitle>
              <CardDescription className="text-white/60 font-bold">Instantly trigger system tasks.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 relative z-10">
              <Link href="/leave">
                <Button className="w-full justify-start gap-4 h-16 rounded-[1.25rem] bg-white text-indigo-900 hover:bg-white/95 hover:-translate-y-1 transition-all border-none group shadow-xl shadow-indigo-900/10" variant="outline">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 group-hover:bg-gradient-primary group-hover:text-white transition-all duration-300">
                    <PlusCircle className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-black uppercase tracking-tight">Request Leave</span>
                  </div>
                </Button>
              </Link>
              <Link href="/leave">
                <Button className="w-full justify-start gap-4 h-16 rounded-[1.25rem] bg-white text-indigo-900 hover:bg-white/95 hover:-translate-y-1 transition-all border-none group shadow-xl shadow-indigo-900/10" variant="outline">
                  <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                    <Clock className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-black uppercase tracking-tight">Request WFH</span>
                  </div>
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl shadow-indigo-500/5 bg-white hover-glow p-2">
             <CardHeader className="pb-4">
               <CardTitle className="text-lg font-black tracking-tight">Identity & Privacy</CardTitle>
             </CardHeader>
             <CardContent>
                <Link href="/documents">
                  <Button variant="ghost" className="w-full h-14 rounded-xl justify-between group px-4 bg-indigo-500/5 hover:bg-indigo-500/10 transition-all">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-indigo-500" strokeWidth={2} />
                      <span className="text-sm font-bold uppercase tracking-tight">My Documents</span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
                  </Button>
                </Link>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function ManagerDashboard() {
  const pendingRequests = leaveRequests.filter(lr => lr.status === "pending");

  return (
    <div className="grid gap-8">
       <div className="grid gap-6 md:grid-cols-2">
        <StatCard 
          title="Approval Queue" 
          value={pendingRequests.length} 
          subtext="Critical pending reviews" 
          icon={Clock} 
          colorClass="text-amber-500"
          gradient
        />
        <StatCard 
          title="Team Footprint" 
          value={stats.manager.teamOnLeave} 
          subtext="Currently remote or on leave" 
          icon={Users} 
          colorClass="text-secondary"
        />
      </div>

      <Card className="border-none shadow-xl shadow-indigo-500/5 bg-white">
        <CardHeader className="border-b border-indigo-500/5 pb-8">
          <CardTitle className="text-xl font-black">Operations Control</CardTitle>
          <CardDescription className="font-medium">Management queue for team request authorizations.</CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
           <div className="space-y-6">
              {pendingRequests.map(req => (
                <div key={req.id} className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 rounded-[2rem] bg-indigo-500/5 border border-white hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group">
                  <div className="flex items-center gap-5">
                    <div className="h-16 w-16 rounded-[1.5rem] bg-gradient-primary p-0.5 shadow-lg group-hover:rotate-6 transition-transform">
                       <div className="h-full w-full rounded-[1.4rem] bg-white flex items-center justify-center font-black text-xl text-gradient">
                          {req.userName.charAt(0)}
                       </div>
                    </div>
                    <div className="grid gap-1">
                      <p className="text-lg font-black tracking-tight">{req.userName}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="rounded-lg border-indigo-500/20 text-indigo-600 text-[9px] font-black uppercase px-2 py-0">{req.type}</Badge>
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{req.days} Days • {req.startDate}</span>
                      </div>
                      <p className="text-xs text-muted-foreground/60 italic mt-2 line-clamp-1 bg-white/50 px-3 py-1 rounded-lg">"{req.reason}"</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="ghost" size="sm" className="h-12 px-6 rounded-2xl text-destructive font-black uppercase tracking-widest hover:bg-destructive/5">Reject</Button>
                    <Button size="sm" className="h-12 px-8 rounded-2xl bg-gradient-primary hover:opacity-90 text-white font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20">Authorize</Button>
                  </div>
                </div>
              ))}
              {pendingRequests.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                   <div className="h-24 w-24 rounded-[2rem] bg-secondary/5 flex items-center justify-center mb-6 relative">
                     <div className="absolute inset-0 bg-secondary/10 blur-2xl rounded-full animate-pulse" />
                     <CheckCircle className="h-10 w-10 text-secondary relative z-10" strokeWidth={2.5} />
                   </div>
                   <h3 className="text-xl font-black tracking-tight">System Optimized</h3>
                   <p className="text-sm font-medium text-muted-foreground/60 max-w-[240px] mt-2 uppercase tracking-widest">Zero pending actions detected in queue.</p>
                </div>
              )}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function AdminDashboard() {
  const expiringDocs = documents.filter(d => d.status === "expiring" || d.status === "expired");
  const latestPayroll = payrollRuns[payrollRuns.length - 1];

  return (
    <div className="grid gap-8">
       <div className="grid gap-6 md:grid-cols-3">
        <StatCard 
          title="Payroll Health" 
          value={latestPayroll?.status} 
          subtext={`Cycle: ${latestPayroll?.month}`} 
          icon={DollarSign} 
          gradient
        />
        <StatCard 
          title="Workforce Size" 
          value={stats.admin.totalEmployees} 
          subtext="Active system users" 
          icon={Users} 
          colorClass="text-indigo-500"
        />
        <StatCard 
          title="Compliance Alerts" 
          value={expiringDocs.length} 
          subtext="Verification required" 
          icon={FileText} 
          colorClass="text-destructive"
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="border-none shadow-xl shadow-indigo-500/5 bg-white overflow-hidden group">
          <CardHeader className="bg-gradient-primary text-white p-8 pb-10 relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 blur-3xl rounded-full" />
            <div className="flex items-center justify-between relative z-10">
              <div>
                <CardTitle className="text-2xl font-black">Payroll Ledger</CardTitle>
                <CardDescription className="text-white/60 font-bold uppercase tracking-widest text-[10px]">Financial reconciliation summary.</CardDescription>
              </div>
              <DollarSign className="h-10 w-10 opacity-30 group-hover:scale-110 transition-transform duration-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-8 px-8">
             <div className="space-y-8">
              {payrollRuns.slice().reverse().slice(0, 3).map(run => (
                <div key={run.id} className="flex items-center justify-between pb-6 border-b border-indigo-500/5 last:border-0 last:pb-0">
                  <div className="grid gap-1">
                    <p className="text-base font-black tracking-tight">{run.month}</p>
                    <p className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">Disbursed {run.paymentDate}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                     <span className="text-lg font-black tracking-tighter text-gradient">${(run.totalAmount / 1000).toFixed(1)}k</span>
                     <Badge className={cn(
                       "rounded-lg px-3 py-1 text-[9px] font-black uppercase tracking-widest border-none shadow-none",
                       run.status === "Approved" ? "bg-secondary text-secondary-foreground" : 
                       run.status === "Draft" ? "bg-indigo-500/10 text-indigo-600" : "bg-muted text-muted-foreground"
                     )}>
                        {run.status}
                     </Badge>
                  </div>
                </div>
              ))}
             </div>
          </CardContent>
          <CardFooter className="bg-indigo-500/5 p-6">
            <Link href="/payroll" className="w-full">
              <Button variant="ghost" className="w-full h-12 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:shadow-xl hover:shadow-indigo-500/10 transition-all gap-2">
                Executive Report <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="border-none shadow-xl shadow-indigo-500/5 bg-white">
          <CardHeader className="pb-8 border-b border-indigo-500/5">
            <CardTitle className="text-xl font-black">Compliance Radar</CardTitle>
            <CardDescription className="font-medium">Verification of regulatory documentation.</CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="space-y-8">
              {expiringDocs.map(doc => (
                 <div key={doc.id} className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-5">
                    <div className={cn(
                      "h-14 w-14 rounded-[1.25rem] flex items-center justify-center shadow-inner transition-all duration-500 group-hover:-rotate-3 group-hover:scale-105",
                      doc.status === 'expired' ? 'bg-destructive/10 text-destructive' : 'bg-amber-500/10 text-amber-600'
                    )}>
                      <FileText className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-base font-black tracking-tight">{doc.name}</p>
                      <p className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">{doc.ownerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className="text-xs font-black text-muted-foreground/80">{doc.expiryDate}</span>
                     {doc.status === 'expired' ? (
                       <div className="h-8 w-8 rounded-full bg-destructive flex items-center justify-center shadow-lg shadow-destructive/30">
                         <XCircle className="h-4 w-4 text-white" />
                       </div>
                     ) : (
                       <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                         <Clock className="h-4 w-4 text-white" />
                       </div>
                     )}
                  </div>
                </div>
              ))}
              {expiringDocs.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center bg-secondary/5 rounded-[2rem] border border-dashed border-secondary/20">
                   <p className="text-sm font-black text-secondary/50 uppercase tracking-widest">Zero Compliance Risks</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
