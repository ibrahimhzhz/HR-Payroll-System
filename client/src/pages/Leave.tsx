import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";
import { leaveRequests } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";

export default function Leave() {
  const [date, setDate] = useState<Date>();

  return (
    <Layout>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Leave & WFH</h2>
          <p className="text-muted-foreground">Manage your time off and work location.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Request Leave</CardTitle>
            <CardDescription>Submit a new leave or work from home request.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Request Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Annual Leave</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="remote">Work From Home</SelectItem>
                  <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Reason</Label>
              <Textarea placeholder="Optional description..." />
            </div>

            <Button className="w-full">Submit Request</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Request History</CardTitle>
            <CardDescription>Past and upcoming leaves.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {leaveRequests.map((req) => (
                <div key={req.id} className="flex items-center justify-between">
                  <div className="grid gap-1">
                    <div className="font-semibold">{req.type} Leave</div>
                    <div className="text-sm text-muted-foreground">
                      {req.startDate} - {req.endDate} ({req.days} days)
                    </div>
                  </div>
                  <Badge variant={req.status === "approved" ? "default" : req.status === "pending" ? "outline" : "destructive"}>
                    {req.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
