import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, DollarSign, FileText, PlusCircle, Users, CheckCircle, XCircle } from "lucide-react";
import { stats, currentUser, leaveRequests, payrollRuns, documents } from "@/lib/mockData";
import { Link } from "wouter";

export function EmployeeDashboard() {
  const myLeaves = leaveRequests.filter(lr => lr.userId === currentUser.id);
  const nextLeave = myLeaves.find(lr => lr.status === "approved" && new Date(lr.startDate) > new Date());
  
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leave Balance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.employee.leaveBalance} Days</div>
            <p className="text-xs text-muted-foreground">Annual leave remaining</p>
            <Progress value={(stats.employee.leaveBalance / 25) * 100} className="mt-3 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Jan 28</div>
            <p className="text-xs text-muted-foreground">Est. amount: $4,500</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Holiday</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nextLeave ? "Approved" : "None"}</div>
            <p className="text-xs text-muted-foreground">{nextLeave ? `${nextLeave.startDate} (${nextLeave.days} days)` : "Plan your next break"}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myLeaves.length > 0 ? (
                myLeaves.map(leave => (
                  <div key={leave.id} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{leave.type} Leave Request</p>
                      <p className="text-sm text-muted-foreground">
                        {leave.startDate} to {leave.endDate}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <Badge variant={leave.status === "approved" ? "default" : leave.status === "pending" ? "outline" : "destructive"}>
                        {leave.status}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No recent activity.</p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link href="/leave">
              <Button className="w-full justify-start gap-2" variant="outline">
                <PlusCircle className="h-4 w-4" />
                Request Leave
              </Button>
            </Link>
            <Link href="/leave">
              <Button className="w-full justify-start gap-2" variant="outline">
                <Clock className="h-4 w-4" />
                Request WFH
              </Button>
            </Link>
            <Link href="/documents">
              <Button className="w-full justify-start gap-2" variant="outline">
                <FileText className="h-4 w-4" />
                My Documents
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
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests.length}</div>
            <p className="text-xs text-muted-foreground">Requires your attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team on Leave</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.manager.teamOnLeave}</div>
            <p className="text-xs text-muted-foreground">Currently away</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Approval Queue</CardTitle>
          <CardDescription>Manage leave and WFH requests from your team.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="space-y-4">
              {pendingRequests.map(req => (
                <div key={req.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{req.userName}</p>
                    <p className="text-sm text-muted-foreground">
                      Requested {req.type} Leave • {req.days} Days ({req.startDate})
                    </p>
                    <p className="text-xs text-muted-foreground italic">"{req.reason}"</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">Reject</Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
              ))}
              {pendingRequests.length === 0 && <p className="text-muted-foreground text-sm">All caught up! No pending requests.</p>}
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
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payroll Status</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestPayroll?.status}</div>
            <p className="text-xs text-muted-foreground">For {latestPayroll?.month}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.admin.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Docs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{expiringDocs.length}</div>
            <p className="text-xs text-muted-foreground">Requires action</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payroll Overview</CardTitle>
            <CardDescription>Recent payroll runs.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
              {payrollRuns.slice().reverse().slice(0, 3).map(run => (
                <div key={run.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{run.month}</p>
                    <p className="text-xs text-muted-foreground">Paid on {run.paymentDate}</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className="text-sm font-bold">${run.totalAmount.toLocaleString()}</span>
                     <Badge variant={run.status === "Approved" ? "default" : run.status === "Draft" ? "outline" : "secondary"}>
                        {run.status}
                     </Badge>
                  </div>
                </div>
              ))}
             </div>
          </CardContent>
          <CardFooter>
            <Link href="/payroll">
              <Button variant="ghost" className="w-full">View All Payroll Runs</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Document Alerts</CardTitle>
            <CardDescription>Documents expiring soon or expired.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expiringDocs.map(doc => (
                 <div key={doc.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">Owner: {doc.ownerName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-xs text-muted-foreground">{doc.expiryDate}</span>
                     {doc.status === 'expired' ? <XCircle className="h-4 w-4 text-destructive" /> : <Clock className="h-4 w-4 text-amber-500" />}
                  </div>
                </div>
              ))}
              {expiringDocs.length === 0 && <p className="text-sm text-muted-foreground">No document alerts.</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
