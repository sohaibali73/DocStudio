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
          "hidden lg:flex fixed left-0 top-0 z-40 lg:z-0 lg:relative flex-col transition-all duration-300",
          "border-r border-white/[0.06] backdrop-blur-2xl",
          "bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-transparent",
          "h-screen lg:h-full w-72 lg:w-16 flex-shrink-0 overflow-hidden hover:lg:w-72",
          "lg:group"
        )}
      >
        {/* Inner glow effect */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent" />
        
        {/* Logo & Brand */}
        <div className="relative flex h-16 items-center justify-between px-4 flex-shrink-0">
          <div className={cn("flex items-center gap-3 overflow-hidden")}>
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
              {/* Logo glow */}
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md" />
              {/* Logo container */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/40 to-primary/10 backdrop-blur-sm" />
              <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-br from-white/20 to-transparent" />
              <Zap className="relative h-5 w-5 text-primary" />
            </div>
            <div className={cn("overflow-hidden transition-opacity hidden lg:block")}>
              <span className="block bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-lg font-bold tracking-tight text-transparent">
                Potomac
              </span>
              <span className="block text-[10px] font-medium uppercase tracking-widest text-muted-foreground/50">
                Studio
              </span>
            </div>
          </div>
        </div>
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

        <div className="relative flex flex-1 flex-col overflow-hidden px-3">
          {/* Search */}
          <div className="relative mb-4 hidden lg:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
            <Input
              placeholder="Search documents..."
              className="h-10 border-white/[0.06] bg-white/[0.02] pl-9 placeholder:text-muted-foreground/40 focus-visible:border-primary/40 focus-visible:bg-white/[0.04] focus-visible:ring-primary/20"
            />
          </div>

          {/* New Document Button */}
          <Button
            className={cn(
              "relative mb-5 overflow-hidden hidden lg:flex",
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

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <aside
          className={cn(
            "fixed left-0 top-0 z-50 flex h-screen flex-col lg:hidden transition-all duration-300",
            "border-r border-white/[0.06] backdrop-blur-2xl",
            "bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-transparent",
            "w-72 overflow-y-auto"
          )}
        >
          {/* Inner glow effect */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent" />
          
          {/* Logo & Brand */}
          <div className="relative flex h-16 items-center justify-between px-4 flex-shrink-0">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/40 to-primary/10 backdrop-blur-sm" />
                <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-br from-white/20 to-transparent" />
                <Zap className="relative h-5 w-5 text-primary" />
              </div>
              <div className="overflow-hidden">
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
              className="shrink-0 text-muted-foreground/50 hover:bg-white/[0.05] hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative flex flex-1 flex-col overflow-y-auto px-3">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
              <Input
                placeholder="Search documents..."
                className="h-10 border-white/[0.06] bg-white/[0.02] pl-9 placeholder:text-muted-foreground/40 focus-visible:border-primary/40 focus-visible:bg-white/[0.04] focus-visible:ring-primary/20"
              />
            </div>

            {/* Mobile content mirror - same as desktop */}
            <Button
              className={cn(
                "relative mb-5 overflow-hidden",
                "bg-gradient-to-r from-primary via-primary to-primary/80 text-primary-foreground",
                "shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30",
                "hover:from-primary/90 hover:to-primary/70",
                "transition-all duration-300",
              )}
            >
              <Plus className="h-4 w-4" />
              <span>New Document</span>
            </Button>

            {/* Document Types */}
            <div className="mb-6">
              <span className="block px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/40 mb-3">
                Create
              </span>
              <div className="flex flex-col gap-2">
                {documentTypes.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      setActiveDocument(doc.id);
                      onToggle();
                    }}
                    className={cn(
                      "group relative overflow-hidden rounded-lg border px-3 py-2 text-left transition-all",
                      activeDocument === doc.id
                        ? `border-primary/40 ${doc.bgColor} shadow-lg ${doc.glowColor}`
                        : "border-white/[0.06] hover:border-white/[0.08] hover:bg-white/[0.02]"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn("mt-0.5 flex h-6 w-6 items-center justify-center flex-shrink-0", doc.color)}>
                        <doc.icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-foreground">{doc.label}</div>
                        <div className="text-xs text-muted-foreground/50">{doc.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Separator className="mb-6 bg-white/[0.04]" />

            {/* Quick Access */}
            <div className="mb-6">
              <span className="block px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/40 mb-3">
                Quick Access
              </span>
              <div className="flex flex-col gap-1.5">
                {quickAccess.map((item) => (
                  <button
                    key={item.id}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground/60 transition-colors hover:bg-white/[0.04] hover:text-foreground"
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-auto border-t border-white/[0.04] pt-4">
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                <div className="flex items-start gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-foreground">Brand Compliance</span>
                    <span className="block text-[10px] text-muted-foreground/50">Potomac Standards</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Mobile Overlay Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}
