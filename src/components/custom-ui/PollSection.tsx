"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PollSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Polls</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="text-sm text-muted-foreground mb-4">No polls yet</div>
        <Button>Create poll</Button>
      </CardContent>
    </Card>
  );
}
