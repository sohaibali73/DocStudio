"use client";

import { cn } from "@/lib/utils";
import {
  FileText,
  Presentation,
  Table2,
  FolderOpen,
  Clock,
  Star,
  ChevronLeft,
  Search,
  Plus,
  Zap,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { DocumentType } from "@/app/page";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeDocument: DocumentType;
  setActiveDocument: (doc: DocumentType) => void;
}

const documentTypes = [
  { 
    id: "docx" as const, 
    label: "Document", 
    description: "Word documents with AI",
    icon: FileText, 
    color: "text-blue-400", 
    bgColor: "bg-blue-500/10",
    glowColor: "shadow-blue-500/20"
  },
  { 
    id: "pptx" as const, 
    label: "Presentation", 
    description: "Slides with AI design",
    icon: Presentation, 
    color: "text-orange-400", 
    bgColor: "bg-orange-500/10",
    glowColor: "shadow-orange-500/20"
  },
  { 
    id: "xlsx" as const, 
    label: "Spreadsheet", 
    description: "Excel with formulas",
    icon: Table2, 
    color: "text-emerald-400", 
    bgColor: "bg-emerald-500/10",
    glowColor: "shadow-emerald-500/20"
  },
];

const quickAccess = [
  { id: "recent", label: "Recent", icon: Clock },
  { id: "starred", label: "Starred", icon: Star },
  { id: "shared", label: "Shared", icon: FolderOpen },
];

export function Sidebar({ isOpen, onToggle, activeDocument, setActiveDocument }: SidebarProps) {
  return (
    <>
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-full flex-col transition-all duration-300 lg:relative",
          "border-r border-white/[0.06] backdrop-blur-2xl",
          "bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-transparent",
          isOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full lg:w-16 lg:translate-x-0"
        )}
      >
        {/* Inner glow effect */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent" />
        
        {/* Logo & Brand */}
        <div className="relative flex h-16 items-center justify-between px-4">
          <div className={cn("flex items-center gap-3 overflow-hidden", !isOpen && "lg:justify-center")}>
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
              {/* Logo glow */}
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md" />
              {/* Logo container */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/40 to-primary/10 backdrop-blur-sm" />
              <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-br from-white/20 to-transparent" />
              <Zap className="relative h-5 w-5 text-primary" />
            </div>
            <div className={cn("overflow-hidden transition-opacity", !isOpen && "lg:hidden")}>
              <span className="block bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-lg font-bold tracking-tight text-transparent">
                Potomac
              </span>
              <span className="block text-[10px] font-medium uppercase tracking-widest text-muted-foreground/50">
                Studio
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className={cn(
              "shrink-0 text-muted-foreground/50 hover:bg-white/[0.05] hover:text-foreground",
              !isOpen && "lg:hidden"
            )}
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", !isOpen && "rotate-180")} />
          </Button>
        </div>

        <div className={cn("relative flex flex-1 flex-col overflow-hidden px-3", !isOpen && "lg:items-center lg:px-2")}>
          {/* Search */}
          <div className={cn("relative mb-4", !isOpen && "lg:hidden")}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
            <Input
              placeholder="Search documents..."
              className="h-10 border-white/[0.06] bg-white/[0.02] pl-9 placeholder:text-muted-foreground/40 focus-visible:border-primary/40 focus-visible:bg-white/[0.04] focus-visible:ring-primary/20"
            />
          </div>

          {/* New Document Button */}
          <Button
            className={cn(
              "relative mb-5 overflow-hidden",
              "bg-gradient-to-r from-primary via-primary to-primary/80 text-primary-foreground",
              "shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30",
              "hover:from-primary/90 hover:to-primary/70",
              "transition-all duration-300",
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
                "mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/40",
                !isOpen && "lg:hidden"
              )}
            >
              Create
            </span>
            <div className="space-y-1.5">
              {documentTypes.map((type) => (
                <Button
                  key={type.id}
                  variant="ghost"
                  onClick={() => setActiveDocument(type.id)}
                  className={cn(
                    "group relative w-full justify-start gap-3 text-muted-foreground/70 transition-all duration-200",
                    "hover:bg-white/[0.04] hover:text-foreground",
                    activeDocument === type.id && [
                      "bg-white/[0.06] text-foreground",
                      "shadow-lg",
                      type.glowColor
                    ],
                    !isOpen && "lg:w-10 lg:justify-center lg:p-0"
                  )}
                >
                  <div className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all",
                    type.bgColor,
                    activeDocument === type.id && "ring-1 ring-white/10"
                  )}>
                    <type.icon className={cn("h-4 w-4", type.color)} />
                  </div>
                  <div className={cn("flex-1 text-left", !isOpen && "lg:hidden")}>
                    <span className="block text-sm font-medium">{type.label}</span>
                    <span className="block text-[10px] text-muted-foreground/50">{type.description}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <Separator className={cn("mb-5 bg-white/[0.04]", !isOpen && "lg:hidden")} />

          {/* Quick Access */}
          <div className={cn("flex-1", !isOpen && "lg:flex lg:flex-col lg:items-center")}>
            <span
              className={cn(
                "mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/40",
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
                    "w-full justify-start gap-3 text-muted-foreground/60 transition-all",
                    "hover:bg-white/[0.04] hover:text-foreground",
                    !isOpen && "lg:w-10 lg:justify-center lg:p-0"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className={cn(!isOpen && "lg:hidden")}>{item.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Brand Compliance Badge */}
          <div className={cn(
            "mt-auto rounded-xl border border-white/[0.04] bg-white/[0.02] p-3",
            !isOpen && "lg:hidden"
          )}>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <div>
                <span className="block text-xs font-medium text-foreground">Brand Compliance</span>
                <span className="block text-[10px] text-muted-foreground/50">Potomac Standards</span>
              </div>
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
