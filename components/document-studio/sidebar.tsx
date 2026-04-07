"use client";

import { cn } from "@/lib/utils";
import {
  FileText,
  Presentation,
  Table2,
  FolderOpen,
  Clock,
  Star,
  Trash2,
  Plus,
  ChevronLeft,
  Sparkles,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeDocument: "docx" | "pptx" | "xlsx";
  setActiveDocument: (doc: "docx" | "pptx" | "xlsx") => void;
}

const documentTypes = [
  { id: "docx" as const, label: "Document", icon: FileText, color: "text-blue-400" },
  { id: "pptx" as const, label: "Presentation", icon: Presentation, color: "text-orange-400" },
  { id: "xlsx" as const, label: "Spreadsheet", icon: Table2, color: "text-green-400" },
];

const quickAccess = [
  { id: "recent", label: "Recent", icon: Clock },
  { id: "starred", label: "Starred", icon: Star },
  { id: "shared", label: "Shared with me", icon: FolderOpen },
  { id: "trash", label: "Trash", icon: Trash2 },
];

export function Sidebar({ isOpen, onToggle, activeDocument, setActiveDocument }: SidebarProps) {
  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-full flex-col border-r border-glass-border bg-glass backdrop-blur-xl transition-all duration-300 lg:relative",
          isOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full lg:w-16 lg:translate-x-0"
        )}
      >
        {/* Logo & Brand */}
        <div className="flex h-16 items-center justify-between px-4">
          <div className={cn("flex items-center gap-3 overflow-hidden", !isOpen && "lg:justify-center")}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <span
              className={cn(
                "text-lg font-semibold tracking-tight text-foreground transition-opacity",
                !isOpen && "lg:hidden"
              )}
            >
              DocStudio
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className={cn("shrink-0 text-muted-foreground hover:text-foreground", !isOpen && "lg:hidden")}
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", !isOpen && "rotate-180")} />
          </Button>
        </div>

        <div className={cn("flex flex-1 flex-col overflow-hidden px-3", !isOpen && "lg:items-center lg:px-2")}>
          {/* Search */}
          <div className={cn("relative mb-4", !isOpen && "lg:hidden")}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              className="h-10 border-glass-border bg-secondary/50 pl-9 placeholder:text-muted-foreground focus-visible:ring-primary"
            />
          </div>

          {/* New Document Button */}
          <Button
            className={cn(
              "mb-4 gap-2 bg-primary text-primary-foreground hover:bg-primary/90",
              !isOpen && "lg:h-10 lg:w-10 lg:p-0"
            )}
          >
            <Plus className="h-4 w-4" />
            <span className={cn(!isOpen && "lg:hidden")}>New Document</span>
          </Button>

          {/* Document Types */}
          <div className={cn("mb-4", !isOpen && "lg:flex lg:flex-col lg:items-center")}>
            <span
              className={cn(
                "mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground",
                !isOpen && "lg:hidden"
              )}
            >
              Create New
            </span>
            <div className="space-y-1">
              {documentTypes.map((type) => (
                <Button
                  key={type.id}
                  variant="ghost"
                  onClick={() => setActiveDocument(type.id)}
                  className={cn(
                    "w-full justify-start gap-3 text-muted-foreground hover:bg-glass-hover hover:text-foreground",
                    activeDocument === type.id && "bg-glass-hover text-foreground",
                    !isOpen && "lg:w-10 lg:justify-center lg:p-0"
                  )}
                >
                  <type.icon className={cn("h-4 w-4 shrink-0", type.color)} />
                  <span className={cn(!isOpen && "lg:hidden")}>{type.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <Separator className={cn("mb-4 bg-glass-border", !isOpen && "lg:hidden")} />

          {/* Quick Access */}
          <div className={cn("flex-1 overflow-auto", !isOpen && "lg:flex lg:flex-col lg:items-center")}>
            <span
              className={cn(
                "mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground",
                !isOpen && "lg:hidden"
              )}
            >
              Quick Access
            </span>
            <div className="space-y-1">
              {quickAccess.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 text-muted-foreground hover:bg-glass-hover hover:text-foreground",
                    !isOpen && "lg:w-10 lg:justify-center lg:p-0"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className={cn(!isOpen && "lg:hidden")}>{item.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Storage Info */}
          <div
            className={cn(
              "mt-auto rounded-lg border border-glass-border bg-secondary/30 p-3",
              !isOpen && "lg:hidden"
            )}
          >
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Storage</span>
              <span className="font-medium text-foreground">2.4 GB / 15 GB</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-[16%] rounded-full bg-primary" />
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}
