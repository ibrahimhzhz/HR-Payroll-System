import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { documents } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, AlertCircle, CheckCircle, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Documents() {
  const expiringCount = documents.filter(d => d.status === 'expiring').length;

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
          <p className="text-muted-foreground">Manage your official documents and contracts.</p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {expiringCount > 0 && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Action Required</AlertTitle>
          <AlertDescription>
            You have {expiringCount} document(s) expiring soon. Please update them to avoid compliance issues.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <Card key={doc.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-muted rounded-md">
                   <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="grid gap-1">
                  <CardTitle className="text-base">{doc.name}</CardTitle>
                  <CardDescription>{doc.type}</CardDescription>
                </div>
              </div>
              <Badge variant={doc.status === "valid" ? "outline" : doc.status === "expiring" ? "secondary" : "destructive"}>
                {doc.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Expires: {doc.expiryDate}</span>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
}
