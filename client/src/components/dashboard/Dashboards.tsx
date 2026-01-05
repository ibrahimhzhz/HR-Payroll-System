import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, DollarSign, FileText, PlusCircle, Users, CheckCircle, XCircle, ArrowUpRight } from "lucide-react";
import { stats, currentUser, leaveRequests, payrollRuns, documents } from "@/lib/mockData";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

const StatCard = ({ title, value, subtext, icon: Icon, colorClass = "text-primary", progress }: any) => (
  <Card className="overflow-hidden border-none shadow-sm bg-white hover:shadow-lg transition-all duration-300 group">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</CardTitle>
      <div className={`p-2 rounded-xl bg-background group-hover:scale-110 transition-transform duration-300 ${colorClass}`}>
        <Icon className="h-4 w-4" strokeWidth={2.5} />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-extrabold tracking-tight">{value}</div>
      <p className="text-[11px] font-semibold text-muted-foreground mt-1 flex items-center gap-1">
        {subtext}
      </p>
      {progress !== undefined && (
        <div className="mt-4 space-y-1">
          <Progress value={progress} className="h-1.5" />
        </div>
      )}
    </CardContent>
  </Card>
);

export function EmployeeDashboard() {
  const myLeaves = leaveRequests.filter(lr => lr.userId === currentUser.id);
  const nextLeave = myLeaves.find(lr => lr.status === "approved" && new Date(lr.startDate) > new Date());
  
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard 
          title="Leave Balance" 
          value={`${stats.employee.leaveBalance} Days`} 
          subtext="Annual allowance remaining" 
          icon={Calendar} 
          progress={(stats.employee.leaveBalance / 25) * 100} 
        />
        <StatCard 
          title="Est. Payroll" 
          value="$4,500" 
          subtext="Estimated for Jan 28" 
          icon={DollarSign} 
          colorClass="text-secondary"
        />
        <StatCard 
          title="Upcoming Holiday" 
          value={nextLeave ? "Approved" : "None"} 
          subtext={nextLeave ? `${nextLeave.startDate} (${nextLeave.days}d)` : "Ready for a break?"} 
          icon={Clock} 
          colorClass="text-amber-500"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-none shadow-sm bg-white">
          <CardHeader className="border-b border-background pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Track your latest requests and updates.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest gap-1 hover:bg-background">
                View All <ArrowUpRight className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {myLeaves.length > 0 ? (
                myLeaves.map(leave => (
                  <div key={leave.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center shadow-sm transition-colors",
                        leave.status === 'approved' ? 'bg-secondary/10 text-secondary' : 'bg-muted/10 text-primary'
                      )}>
                        <Calendar className="h-5 w-5" strokeWidth={2} />
                      </div>
                      <div className="grid gap-0.5">
                        <p className="text-sm font-bold">{leave.type} Leave</p>
                        <p className="text-[11px] font-medium text-muted-foreground">
                          {leave.startDate} — {leave.endDate}
                        </p>
                      </div>
                    </div>
                    <Badge className={cn(
                      "rounded-lg px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border-none shadow-none",
                      leave.status === "approved" ? "bg-secondary text-secondary-foreground" : 
                      leave.status === "pending" ? "bg-background text-primary" : "bg-destructive/10 text-destructive"
                    )}>
                      {leave.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center bg-background/50 rounded-2xl border-2 border-dashed border-muted/20">
                   <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                     <Calendar className="h-6 w-6 text-muted-foreground opacity-20" />
                   </div>
                   <p className="text-sm font-semibold text-muted-foreground">No recent activity to show.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm bg-muted/40 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <PlusCircle className="h-32 w-32" />
          </div>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>Common tasks you might need.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Link href="/leave">
              <Button className="w-full justify-start gap-3 h-14 rounded-2xl bg-white text-foreground hover:bg-white hover:shadow-md transition-all border-none group shadow-none" variant="outline">
                <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <PlusCircle className="h-5 w-5" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-bold">Request Leave</span>
                  <span className="text-[10px] font-medium opacity-60">Plan your time off</span>
                </div>
              </Button>
            </Link>
            <Link href="/leave">
              <Button className="w-full justify-start gap-3 h-14 rounded-2xl bg-white text-foreground hover:bg-white hover:shadow-md transition-all border-none group shadow-none" variant="outline">
                <div className="p-2 rounded-xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-bold">Request WFH</span>
                  <span className="text-[10px] font-medium opacity-60">Remote work session</span>
                </div>
              </Button>
            </Link>
            <Link href="/documents">
              <Button className="w-full justify-start gap-3 h-14 rounded-2xl bg-white text-foreground hover:bg-white hover:shadow-md transition-all border-none group shadow-none" variant="outline">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-bold">Upload Docs</span>
                  <span className="text-[10px] font-medium opacity-60">Manage your records</span>
                </div>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function ManagerDashboard() {
  const pendingRequests = leaveRequests.filter(lr => lr.status === "pending");

  return (
    <div className="grid gap-6">
       <div className="grid gap-4 md:grid-cols-2">
        <StatCard 
          title="Pending Approvals" 
          value={pendingRequests.length} 
          subtext="Awaiting your review" 
          icon={Clock} 
          colorClass="text-amber-500"
        />
        <StatCard 
          title="Team on Leave" 
          value={stats.manager.teamOnLeave} 
          subtext="Currently out of office" 
          icon={Users} 
          colorClass="text-secondary"
        />
      </div>

      <Card className="border-none shadow-sm bg-white">
        <CardHeader className="border-b border-background pb-6">
          <CardTitle>Approval Queue</CardTitle>
          <CardDescription>Fast-track leave and WFH requests from your team.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
           <div className="space-y-6">
              {pendingRequests.map(req => (
                <div key={req.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-background/50 border border-transparent hover:border-secondary/20 hover:bg-white transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center font-bold text-secondary border-2 border-white shadow-sm">
                       {req.userName.charAt(0)}
                    </div>
                    <div className="grid gap-0.5">
                      <p className="text-sm font-bold">{req.userName}</p>
                      <p className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                        <span className="text-primary">{req.type}</span> • {req.days} Days • {req.startDate}
                      </p>
                      <p className="text-xs text-muted-foreground/80 italic mt-1 line-clamp-1">"{req.reason}"</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-9 rounded-xl text-destructive hover:bg-destructive/10">Reject</Button>
                    <Button size="sm" className="h-9 rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-4 shadow-none">Approve</Button>
                  </div>
                </div>
              ))}
              {pendingRequests.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                   <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                     <CheckCircle className="h-8 w-8 text-secondary" />
                   </div>
                   <h3 className="font-bold">All caught up!</h3>
                   <p className="text-sm text-muted-foreground max-w-[200px] mt-1">No pending requests require your attention right now.</p>
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
    <div className="grid gap-6">
       <div className="grid gap-4 md:grid-cols-3">
        <StatCard 
          title="Payroll Status" 
          value={latestPayroll?.status} 
          subtext={`Current period: ${latestPayroll?.month}`} 
          icon={DollarSign} 
          colorClass="text-secondary"
        />
        <StatCard 
          title="Active Staff" 
          value={stats.admin.totalEmployees} 
          subtext="Total workforce strength" 
          icon={Users} 
          colorClass="text-primary"
        />
        <StatCard 
          title="Document Alerts" 
          value={expiringDocs.length} 
          subtext="Requires urgent updates" 
          icon={FileText} 
          colorClass="text-destructive"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="bg-primary text-white pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Payroll Overview</CardTitle>
                <CardDescription className="text-primary-foreground/70">Performance summary.</CardDescription>
              </div>
              <DollarSign className="h-8 w-8 opacity-20" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
             <div className="space-y-6">
              {payrollRuns.slice().reverse().slice(0, 3).map(run => (
                <div key={run.id} className="flex items-center justify-between pb-4 border-b border-background last:border-0 last:pb-0">
                  <div className="grid gap-0.5">
                    <p className="text-sm font-bold">{run.month}</p>
                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Paid on {run.paymentDate}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                     <span className="text-sm font-extrabold tracking-tight">${run.totalAmount.toLocaleString()}</span>
                     <Badge className={cn(
                       "rounded-lg px-2 text-[9px] font-bold uppercase tracking-widest border-none shadow-none",
                       run.status === "Approved" ? "bg-secondary text-secondary-foreground" : 
                       run.status === "Draft" ? "bg-background text-primary" : "bg-muted text-muted-foreground"
                     )}>
                        {run.status}
                     </Badge>
                  </div>
                </div>
              ))}
             </div>
          </CardContent>
          <CardFooter className="bg-background/30 border-t pt-4">
            <Link href="/payroll" className="w-full">
              <Button variant="ghost" className="w-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-all">
                Full Records <ArrowUpRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="pb-6 border-b border-background">
            <CardTitle className="text-lg">Document Alerts</CardTitle>
            <CardDescription>Critical compliance tracking.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {expiringDocs.map(doc => (
                 <div key={doc.id} className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-all",
                      doc.status === 'expired' ? 'bg-destructive/10 text-destructive' : 'bg-amber-500/10 text-amber-600'
                    )}>
                      <FileText className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <div className="grid gap-0.5">
                      <p className="text-sm font-bold">{doc.name}</p>
                      <p className="text-[10px] font-medium text-muted-foreground">Owner: {doc.ownerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="text-[11px] font-bold text-muted-foreground">{doc.expiryDate}</span>
                     {doc.status === 'expired' ? <XCircle className="h-4 w-4 text-destructive" /> : <Clock className="h-4 w-4 text-amber-500" />}
                  </div>
                </div>
              ))}
              {expiringDocs.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center bg-background/50 rounded-2xl border-2 border-dashed border-muted/20">
                   <p className="text-sm font-semibold text-muted-foreground">System compliant. No alerts.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
