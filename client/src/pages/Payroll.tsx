import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { payrollRuns } from "@/lib/mockData";
import { Eye, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Payroll() {
  const { toast } = useToast();

  const handleSendToXero = (id: string) => {
    toast({
      title: "Sent to Xero",
      description: `Payroll run ${id} has been successfully sent to Xero.`,
    });
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Payroll</h2>
          <p className="text-muted-foreground">Manage monthly payroll runs and payslips.</p>
        </div>
        <Button>Run Payroll</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>History</CardTitle>
          <CardDescription>View all past and current payroll runs.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollRuns.slice().reverse().map((run) => (
                <TableRow key={run.id}>
                  <TableCell className="font-medium">{run.month}</TableCell>
                  <TableCell>
                    <Badge variant={run.status === "Approved" ? "default" : run.status === "Draft" ? "outline" : "secondary"}>
                      {run.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{run.employeesCount}</TableCell>
                  <TableCell>{run.paymentDate}</TableCell>
                  <TableCell className="text-right font-mono">${run.totalAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" title="View Details">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {run.status === "Approved" && (
                        <Button 
                          variant="outline" 
                          size="icon" 
                          title="Send to Xero"
                          onClick={() => handleSendToXero(run.id)}
                        >
                          <Send className="h-4 w-4 text-blue-600" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
}
