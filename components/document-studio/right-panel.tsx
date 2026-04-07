"use client";

import { cn } from "@/lib/utils";
import {
  FolderOpen,
  Settings,
  Sparkles,
  ChevronRight,
  FileText,
  Presentation,
  Table2,
  Search,
  Send,
  Wand2,
  PenLine,
  Languages,
  CheckCircle,
  ListChecks,
  Lightbulb,
  X,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RightPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  activeTab: "files" | "settings" | "ai";
  setActiveTab: (tab: "files" | "settings" | "ai") => void;
}

const tabs = [
  { id: "ai" as const, label: "AI", icon: Sparkles },
  { id: "files" as const, label: "Files", icon: FolderOpen },
  { id: "settings" as const, label: "Settings", icon: Settings },
];

const aiPrompts = [
  { icon: PenLine, label: "Write", description: "Generate content" },
  { icon: Wand2, label: "Improve", description: "Enhance writing" },
  { icon: Languages, label: "Translate", description: "Change language" },
  { icon: CheckCircle, label: "Fix", description: "Grammar check" },
  { icon: ListChecks, label: "Summarize", description: "Brief summary" },
  { icon: Lightbulb, label: "Ideas", description: "Brainstorm" },
];

const fileIcons = {
  docx: { icon: FileText, color: "text-blue-400", bgColor: "bg-blue-500/10" },
  pptx: { icon: Presentation, color: "text-orange-400", bgColor: "bg-orange-500/10" },
  xlsx: { icon: Table2, color: "text-emerald-400", bgColor: "bg-emerald-500/10" },
};

export function RightPanel({ isOpen, onToggle, activeTab, setActiveTab }: RightPanelProps) {
  return (
    <>
      {/* Panel */}
      <aside
        className={cn(
          "fixed right-0 top-0 z-40 flex h-full flex-col transition-all duration-300 lg:relative",
          "border-l border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.02] backdrop-blur-2xl",
          isOpen ? "w-80 translate-x-0" : "w-0 translate-x-full"
        )}
      >
        {/* Subtle inner glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-primary/[0.03] via-transparent to-transparent" />
        
        {/* Panel Header */}
        <div className="relative flex h-16 items-center justify-between border-b border-white/[0.06] px-4">
          <div className="flex items-center gap-1 rounded-lg bg-white/[0.04] p-1">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "gap-2 text-muted-foreground/60 hover:bg-white/[0.06] hover:text-foreground",
                  activeTab === tab.id && "bg-white/[0.08] text-foreground"
                )}
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-muted-foreground/60 hover:bg-white/[0.05] hover:text-foreground lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Panel Content */}
        <ScrollArea className="relative flex-1">
          {activeTab === "ai" && <AIPanel />}
          {activeTab === "files" && <FilesPanel />}
          {activeTab === "settings" && <SettingsPanel />}
        </ScrollArea>
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

function AIPanel() {
  return (
    <div className="flex flex-col p-4">
      {/* AI Chat Input */}
      <div className="mb-6">
        <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03]">
          <Textarea
            placeholder="Ask AI to help you write, edit, or improve..."
            className="min-h-24 resize-none border-0 bg-transparent pr-12 placeholder:text-muted-foreground/40 focus-visible:ring-0"
          />
          <Button
            size="icon"
            className={cn(
              "absolute bottom-2 right-2 h-8 w-8",
              "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
              "shadow-[0_0_15px_rgba(45,212,191,0.2)] hover:shadow-[0_0_20px_rgba(45,212,191,0.3)]"
            )}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground/40">
          Press Enter to send
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-4">
        <h3 className="mb-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {aiPrompts.map((prompt) => (
            <button
              key={prompt.label}
              className={cn(
                "group flex flex-col items-start gap-1 rounded-xl p-3 text-left transition-all",
                "border border-white/[0.06] bg-white/[0.02]",
                "hover:border-primary/30 hover:bg-white/[0.04]"
              )}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <prompt.icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-foreground">{prompt.label}</span>
              <span className="text-[11px] text-muted-foreground/50">{prompt.description}</span>
            </button>
          ))}
        </div>
      </div>

      <Separator className="my-4 bg-white/[0.06]" />

      {/* AI Suggestions - Empty State */}
      <div>
        <h3 className="mb-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50">
          Suggestions
        </h3>
        <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.01] p-6 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground/60">
            AI suggestions will appear here as you work on your document.
          </p>
        </div>
      </div>
    </div>
  );
}

function FilesPanel() {
  return (
    <div className="flex flex-col p-4">
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
        <Input
          placeholder="Search files..."
          className="h-10 border-white/[0.08] bg-white/[0.03] pl-9 placeholder:text-muted-foreground/40 focus-visible:border-primary/50 focus-visible:ring-primary/20"
        />
      </div>

      {/* Document Types */}
      <div className="mb-4">
        <h3 className="mb-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50">
          Create New
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(fileIcons).map(([type, config]) => {
            const Icon = config.icon;
            return (
              <button
                key={type}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl p-3 transition-all",
                  "border border-white/[0.06] bg-white/[0.02]",
                  "hover:border-primary/30 hover:bg-white/[0.04]"
                )}
              >
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", config.bgColor)}>
                  <Icon className={cn("h-5 w-5", config.color)} />
                </div>
                <span className="text-xs text-muted-foreground/70 capitalize">{type}</span>
              </button>
            );
          })}
        </div>
      </div>

      <Separator className="my-4 bg-white/[0.06]" />

      {/* Empty Files State */}
      <div>
        <h3 className="mb-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50">
          Recent Files
        </h3>
        <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.01] p-6 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05]">
            <FolderOpen className="h-5 w-5 text-muted-foreground/50" />
          </div>
          <p className="mb-3 text-sm text-muted-foreground/60">
            No recent files yet
          </p>
          <Button
            size="sm"
            variant="outline"
            className="gap-2 border-white/[0.1] bg-white/[0.02] text-muted-foreground hover:bg-white/[0.05] hover:text-foreground"
          >
            <Plus className="h-4 w-4" />
            Create your first document
          </Button>
        </div>
      </div>

      <Separator className="my-4 bg-white/[0.06]" />

      {/* Folders */}
      <div>
        <h3 className="mb-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50">
          Folders
        </h3>
        <div className="space-y-1">
          {["Projects", "Personal", "Shared", "Archive"].map((folder) => (
            <button
              key={folder}
              className="group flex w-full items-center gap-3 rounded-lg p-2 text-left transition-all hover:bg-white/[0.05]"
            >
              <FolderOpen className="h-4 w-4 text-muted-foreground/50" />
              <span className="flex-1 text-sm text-muted-foreground/70">{folder}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/30 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsPanel() {
  return (
    <div className="flex flex-col p-4">
      {/* Document Settings */}
      <div className="mb-6">
        <h3 className="mb-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50">
          Document Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-save" className="text-sm text-muted-foreground/80">
              Auto-save
            </Label>
            <Switch id="auto-save" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="spell-check" className="text-sm text-muted-foreground/80">
              Spell check
            </Label>
            <Switch id="spell-check" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="grammar-check" className="text-sm text-muted-foreground/80">
              Grammar check
            </Label>
            <Switch id="grammar-check" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="word-count" className="text-sm text-muted-foreground/80">
              Show word count
            </Label>
            <Switch id="word-count" />
          </div>
        </div>
      </div>

      <Separator className="mb-6 bg-white/[0.06]" />

      {/* Page Setup */}
      <div className="mb-6">
        <h3 className="mb-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50">
          Page Setup
        </h3>
        <div className="space-y-3">
          <div>
            <Label className="mb-1.5 block text-sm text-muted-foreground/60">Page Size</Label>
            <select className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option>Letter (8.5 x 11 in)</option>
              <option>A4 (210 x 297 mm)</option>
              <option>Legal (8.5 x 14 in)</option>
              <option>Tabloid (11 x 17 in)</option>
            </select>
          </div>
          <div>
            <Label className="mb-1.5 block text-sm text-muted-foreground/60">Orientation</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-primary/50 bg-primary/10 text-primary hover:bg-primary/15"
              >
                Portrait
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-white/[0.1] text-muted-foreground/70 hover:bg-white/[0.05] hover:text-foreground"
              >
                Landscape
              </Button>
            </div>
          </div>
          <div>
            <Label className="mb-1.5 block text-sm text-muted-foreground/60">Margins</Label>
            <select className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option>Normal (1 in)</option>
              <option>Narrow (0.5 in)</option>
              <option>Wide (1.5 in)</option>
              <option>Custom</option>
            </select>
          </div>
        </div>
      </div>

      <Separator className="mb-6 bg-white/[0.06]" />

      {/* AI Settings */}
      <div>
        <h3 className="mb-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/50">
          AI Assistant
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-suggestions" className="text-sm text-muted-foreground/80">
              AI suggestions
            </Label>
            <Switch id="ai-suggestions" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-autocomplete" className="text-sm text-muted-foreground/80">
              AI autocomplete
            </Label>
            <Switch id="ai-autocomplete" />
          </div>
          <div>
            <Label className="mb-1.5 block text-sm text-muted-foreground/60">Writing Style</Label>
            <select className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option>Professional</option>
              <option>Casual</option>
              <option>Academic</option>
              <option>Creative</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
