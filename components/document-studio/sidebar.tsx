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
  Cloud,
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
  { id: "docx" as const, label: "Document", icon: FileText, color: "text-blue-400", bgColor: "bg-blue-500/10" },
  { id: "pptx" as const, label: "Presentation", icon: Presentation, color: "text-orange-400", bgColor: "bg-orange-500/10" },
  { id: "xlsx" as const, label: "Spreadsheet", icon: Table2, color: "text-emerald-400", bgColor: "bg-emerald-500/10" },
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
          "fixed left-0 top-0 z-40 flex h-full flex-col transition-all duration-300 lg:relative",
          "border-r border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.02] backdrop-blur-2xl",
          isOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full lg:w-16 lg:translate-x-0"
        )}
      >
        {/* Subtle inner glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent" />
        
        {/* Logo & Brand */}
        <div className="relative flex h-16 items-center justify-between px-4">
          <div className={cn("flex items-center gap-3 overflow-hidden", !isOpen && "lg:justify-center")}>
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-sm" />
              <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-br from-white/10 to-transparent" />
              <Sparkles className="relative h-5 w-5 text-primary" />
            </div>
            <span
              className={cn(
                "bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-lg font-semibold tracking-tight text-transparent transition-opacity",
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
            className={cn(
              "shrink-0 text-muted-foreground/70 hover:bg-white/[0.05] hover:text-foreground",
              !isOpen && "lg:hidden"
            )}
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", !isOpen && "rotate-180")} />
          </Button>
        </div>

        <div className={cn("relative flex flex-1 flex-col overflow-hidden px-3", !isOpen && "lg:items-center lg:px-2")}>
          {/* Search */}
          <div className={cn("relative mb-4", !isOpen && "lg:hidden")}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
            <Input
              placeholder="Search documents..."
              className="h-10 border-white/[0.08] bg-white/[0.03] pl-9 placeholder:text-muted-foreground/50 focus-visible:border-primary/50 focus-visible:bg-white/[0.05] focus-visible:ring-primary/20"
            />
          </div>

          {/* New Document Button */}
          <Button
            className={cn(
              "relative mb-5 overflow-hidden",
              "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
              "shadow-[0_0_20px_rgba(45,212,191,0.15)] hover:shadow-[0_0_30px_rgba(45,212,191,0.25)]",
              "hover:from-primary/90 hover:to-primary/70",
              !isOpen && "lg:h-10 lg:w-10 lg:p-0"
            )}
          >
            <Plus className="h-4 w-4" />
            <span className={cn("ml-2", !isOpen && "lg:hidden")}>New Document</span>
          </Button>

          {/* Document Types */}
          <div className={cn("mb-5", !isOpen && "lg:flex lg:flex-col lg:items-center")}>
            <span
              className={cn(
                "mb-3 block text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50",
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
                    "group w-full justify-start gap-3 text-muted-foreground/70 transition-all",
                    "hover:bg-white/[0.05] hover:text-foreground",
                    activeDocument === type.id && "bg-white/[0.08] text-foreground",
                    !isOpen && "lg:w-10 lg:justify-center lg:p-0"
                  )}
                >
                  <div className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                    type.bgColor,
                    activeDocument === type.id && "ring-1 ring-white/10"
                  )}>
                    <type.icon className={cn("h-4 w-4", type.color)} />
                  </div>
                  <span className={cn(!isOpen && "lg:hidden")}>{type.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <Separator className={cn("mb-5 bg-white/[0.06]", !isOpen && "lg:hidden")} />

          {/* Quick Access */}
          <div className={cn("flex-1 overflow-auto", !isOpen && "lg:flex lg:flex-col lg:items-center")}>
            <span
              className={cn(
                "mb-3 block text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50",
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
                    "w-full justify-start gap-3 text-muted-foreground/70 transition-all",
                    "hover:bg-white/[0.05] hover:text-foreground",
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
              "mt-auto rounded-xl border border-white/[0.06] bg-white/[0.02] p-4",
              !isOpen && "lg:hidden"
            )}
          >
            <div className="mb-3 flex items-center gap-2">
              <Cloud className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Cloud Storage</span>
            </div>
            <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full w-[16%] rounded-full bg-gradient-to-r from-primary to-primary/60" />
            </div>
            <p className="text-xs text-muted-foreground/60">2.4 GB of 15 GB used</p>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/60 backdrop-blur-md lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}
