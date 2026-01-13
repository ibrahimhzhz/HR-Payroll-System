import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/error-boundary";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Payroll from "@/pages/Payroll";
import Employees from "@/pages/Employees";
import Leave from "@/pages/Leave";
import Documents from "@/pages/Documents";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/payroll" component={Payroll} />
      <Route path="/employees" component={Employees} />
      <Route path="/leave" component={Leave} />
      <Route path="/documents" component={Documents} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router base="/">
          <TooltipProvider>
            <Toaster />
            <AppRoutes />
          </TooltipProvider>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
