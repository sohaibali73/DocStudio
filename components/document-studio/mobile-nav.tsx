"use client";

import { Menu, PanelRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  rightPanelOpen: boolean;
  setRightPanelOpen: (open: boolean) => void;
}

export function MobileNav({
  sidebarOpen,
  setSidebarOpen,
  rightPanelOpen,
  setRightPanelOpen,
}: MobileNavProps) {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between border-b border-glass-border bg-glass/80 px-4 backdrop-blur-xl lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="text-muted-foreground hover:text-foreground"
      >
        <Menu className="h-5 w-5" />
      </Button>
      <span className="text-sm font-semibold text-foreground">DocStudio</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setRightPanelOpen(!rightPanelOpen)}
        className="text-muted-foreground hover:text-foreground"
      >
        <PanelRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
