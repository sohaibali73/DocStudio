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
  Shield,
  AlertTriangle,
  CheckCircle2,
  Palette,
  Type,
  FileWarning,
  Command,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { DocumentType } from "@/app/page";

interface RightPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  activeTab: "files" | "settings" | "ai" | "compliance";
  setActiveTab: (tab: "files" | "settings" | "ai" | "compliance") => void;
  activeDocument: DocumentType;
}

const tabs = [
  { id: "ai" as const, label: "AI", icon: Sparkles },
  { id: "compliance" as const, label: "Compliance", icon: Shield },
  { id: "files" as const, label: "Files", icon: FolderOpen },
  { id: "settings" as const, label: "Settings", icon: Settings },
];

const aiCommands = [
  { command: "/write", icon: PenLine, label: "Write", description: "Generate content from prompt" },
  { command: "/improve", icon: Wand2, label: "Improve", description: "Enhance selected text" },
  { command: "/translate", icon: Languages, label: "Translate", description: "Convert to another language" },
  { command: "/fix", icon: CheckCircle, label: "Fix Grammar", description: "Correct errors" },
  { command: "/summarize", icon: ListChecks, label: "Summarize", description: "Create brief summary" },
  { command: "/brainstorm", icon: Lightbulb, label: "Brainstorm", description: "Generate ideas" },
];

const fileIcons = {
  docx: { icon: FileText, color: "text-blue-400", bgColor: "bg-blue-500/10" },
  pptx: { icon: Presentation, color: "text-orange-400", bgColor: "bg-orange-500/10" },
  xlsx: { icon: Table2, color: "text-emerald-400", bgColor: "bg-emerald-500/10" },
};

export function RightPanel({ isOpen, onToggle, activeTab, setActiveTab, activeDocument }: RightPanelProps) {
  return (
    <>
      <aside
        className={cn(
          "hidden lg:flex fixed lg:relative right-0 top-0 z-40 lg:z-0 flex-col transition-all duration-300",
          "border-l border-white/[0.04] backdrop-blur-2xl",
          "bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-transparent",
          "h-screen lg:h-full w-80",
          "flex-shrink-0"
        )}
      >
        {/* Inner glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-primary/[0.02] via-transparent to-transparent" />
        
        {/* Header */}
        <div className="relative flex h-16 items-center justify-between border-b border-white/[0.04] px-4 flex-shrink-0">
          <div className="flex items-center gap-1 rounded-lg bg-white/[0.03] p-1">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "gap-1.5 px-2 text-muted-foreground/50 hover:bg-white/[0.04] hover:text-foreground",
                  activeTab === tab.id && "bg-white/[0.06] text-foreground"
                )}
              >
                <tab.icon className="h-3.5 w-3.5" />
                <span className="hidden text-xs sm:inline">{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="relative flex-1 overflow-hidden">
          {activeTab === "ai" && <AIPanel />}
          {activeTab === "compliance" && <CompliancePanel />}
          {activeTab === "files" && <FilesPanel />}
          {activeTab === "settings" && <SettingsPanel />}
        </ScrollArea>
      </aside>

      {/* Mobile Right Panel Overlay */}
      {isOpen && (
        <aside
          className={cn(
            "fixed right-0 top-0 z-50 flex h-full flex-col lg:hidden transition-all duration-300",
            "border-l border-white/[0.04] backdrop-blur-2xl",
            "bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-transparent",
            "w-80"
          )}
        >
          {/* Inner glow */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-primary/[0.02] via-transparent to-transparent" />
          
          {/* Header */}
          <div className="relative flex h-16 items-center justify-between border-b border-white/[0.04] px-4 flex-shrink-0">
            <div className="flex items-center gap-1 rounded-lg bg-white/[0.03] p-1">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "gap-1.5 px-2 text-muted-foreground/50 hover:bg-white/[0.04] hover:text-foreground",
                    activeTab === tab.id && "bg-white/[0.06] text-foreground"
                  )}
                >
                  <tab.icon className="h-3.5 w-3.5" />
                  <span className="hidden text-xs sm:inline">{tab.label}</span>
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8 text-muted-foreground/50 hover:bg-white/[0.04] hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <ScrollArea className="relative flex-1 overflow-hidden">
            {activeTab === "ai" && <AIPanel />}
            {activeTab === "compliance" && <CompliancePanel />}
            {activeTab === "files" && <FilesPanel />}
            {activeTab === "settings" && <SettingsPanel />}
          </ScrollArea>
        </aside>
      )}

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}

function AIPanel() {
  return (
    <div className="flex flex-col p-4">
      {/* AI Command Input */}
      <div className="mb-6">
        <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-center gap-2 border-b border-white/[0.04] px-3 py-2">
            <Command className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground/50">AI Command</span>
          </div>
          <Textarea
            placeholder="Type a command like /write, /improve, or describe what you need..."
            className="min-h-20 resize-none border-0 bg-transparent pr-12 text-sm placeholder:text-muted-foreground/30 focus-visible:ring-0"
          />
          <Button
            size="icon"
            className={cn(
              "absolute bottom-3 right-3 h-8 w-8",
              "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
              "shadow-lg shadow-primary/20 hover:shadow-primary/30",
              "transition-all duration-300"
            )}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Quick Commands */}
      <div className="mb-4">
        <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/40">
          Commands
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {aiCommands.map((cmd) => (
            <button
              key={cmd.command}
              className={cn(
                "group flex flex-col items-start gap-1.5 rounded-xl p-3 text-left transition-all",
                "border border-white/[0.04] bg-white/[0.01]",
                "hover:border-primary/20 hover:bg-white/[0.03]"
              )}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                  <cmd.icon className="h-3.5 w-3.5" />
                </div>
                <code className="text-xs text-primary">{cmd.command}</code>
              </div>
              <span className="text-[10px] leading-tight text-muted-foreground/40">{cmd.description}</span>
            </button>
          ))}
        </div>
      </div>

      <Separator className="my-4 bg-white/[0.04]" />

      {/* AI Response Area - Empty State */}
      <div>
        <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/40">
          Response
        </h3>
        <div className="rounded-xl border border-dashed border-white/[0.06] bg-white/[0.01] p-6 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground/50">
            AI responses will appear here when you run a command.
          </p>
        </div>
      </div>
    </div>
  );
}

function CompliancePanel() {
  return (
    <div className="flex flex-col p-4">
      {/* Compliance Overview */}
      <div className="mb-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">Brand Compliance</h3>
          <span className="text-[10px] text-muted-foreground/50">Potomac Standards</span>
        </div>
        
        {/* Score - Empty State */}
        <div className="flex items-center justify-center py-6">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-white/[0.1]">
              <Shield className="h-6 w-6 text-muted-foreground/30" />
            </div>
            <p className="text-xs text-muted-foreground/50">Run compliance check</p>
          </div>
        </div>

        <Button
          className={cn(
            "w-full gap-2",
            "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
            "shadow-lg shadow-primary/20 hover:shadow-primary/30"
          )}
        >
          <Shield className="h-4 w-4" />
          Check Compliance
        </Button>
      </div>

      {/* Compliance Rules */}
      <div className="mb-4">
        <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/40">
          Compliance Rules
        </h3>
        <div className="space-y-2">
          {[
            { icon: Palette, label: "Color Palette", description: "Potomac brand colors" },
            { icon: Type, label: "Typography", description: "Approved fonts only" },
            { icon: FileWarning, label: "Disclaimers", description: "Required legal text" },
            { icon: Shield, label: "Terminology", description: "Brand-approved language" },
          ].map((rule) => (
            <div
              key={rule.label}
              className="flex items-center gap-3 rounded-lg border border-white/[0.04] bg-white/[0.01] p-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04]">
                <rule.icon className="h-4 w-4 text-muted-foreground/60" />
              </div>
              <div className="flex-1">
                <span className="block text-xs font-medium text-foreground">{rule.label}</span>
                <span className="block text-[10px] text-muted-foreground/40">{rule.description}</span>
              </div>
              <div className="h-2 w-2 rounded-full bg-muted-foreground/20" />
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-4 bg-white/[0.04]" />

      {/* Issues - Empty State */}
      <div>
        <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/40">
          Issues
        </h3>
        <div className="rounded-xl border border-dashed border-white/[0.06] bg-white/[0.01] p-6 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="text-xs text-muted-foreground/50">
            No compliance issues detected.
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
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/30" />
        <Input
          placeholder="Search files..."
          className="h-9 border-white/[0.06] bg-white/[0.02] pl-9 text-sm placeholder:text-muted-foreground/30 focus-visible:border-primary/30 focus-visible:ring-primary/20"
        />
      </div>

      {/* Create New */}
      <div className="mb-4">
        <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/40">
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
                  "border border-white/[0.04] bg-white/[0.01]",
                  "hover:border-primary/20 hover:bg-white/[0.03]"
                )}
              >
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", config.bgColor)}>
                  <Icon className={cn("h-4 w-4", config.color)} />
                </div>
                <span className="text-[10px] capitalize text-muted-foreground/60">{type}</span>
              </button>
            );
          })}
        </div>
      </div>

      <Separator className="my-4 bg-white/[0.04]" />

      {/* Recent Files - Empty State */}
      <div className="mb-4">
        <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/40">
          Recent Files
        </h3>
        <div className="rounded-xl border border-dashed border-white/[0.06] bg-white/[0.01] p-6 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.04]">
            <FolderOpen className="h-5 w-5 text-muted-foreground/40" />
          </div>
          <p className="mb-3 text-xs text-muted-foreground/50">No recent files</p>
          <Button
            size="sm"
            variant="outline"
            className="gap-2 border-white/[0.08] bg-white/[0.02] text-xs text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" />
            Create Document
          </Button>
        </div>
      </div>

      {/* Folders */}
      <div>
        <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/40">
          Folders
        </h3>
        <div className="space-y-1">
          {["Projects", "Templates", "Shared", "Archive"].map((folder) => (
            <button
              key={folder}
              className="group flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition-all hover:bg-white/[0.03]"
            >
              <FolderOpen className="h-4 w-4 text-muted-foreground/40" />
              <span className="flex-1 text-xs text-muted-foreground/60">{folder}</span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/20 opacity-0 transition-opacity group-hover:opacity-100" />
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
        <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/40">
          Document
        </h3>
        <div className="space-y-3">
          {[
            { id: "auto-save", label: "Auto-save", checked: true },
            { id: "spell-check", label: "Spell check", checked: true },
            { id: "grammar-check", label: "Grammar check", checked: true },
          ].map((setting) => (
            <div key={setting.id} className="flex items-center justify-between">
              <Label htmlFor={setting.id} className="text-xs text-muted-foreground/70">
                {setting.label}
              </Label>
              <Switch id={setting.id} defaultChecked={setting.checked} />
            </div>
          ))}
        </div>
      </div>

      <Separator className="mb-6 bg-white/[0.04]" />

      {/* Page Setup */}
      <div className="mb-6">
        <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/40">
          Page Setup
        </h3>
        <div className="space-y-3">
          <div>
            <Label className="mb-1.5 block text-[10px] text-muted-foreground/50">Page Size</Label>
            <select className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs text-foreground focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option>Letter (8.5 x 11 in)</option>
              <option>A4 (210 x 297 mm)</option>
              <option>Legal (8.5 x 14 in)</option>
            </select>
          </div>
          <div>
            <Label className="mb-1.5 block text-[10px] text-muted-foreground/50">Orientation</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-primary/40 bg-primary/10 text-xs text-primary hover:bg-primary/15"
              >
                Portrait
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-white/[0.08] text-xs text-muted-foreground/60 hover:bg-white/[0.04] hover:text-foreground"
              >
                Landscape
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="mb-6 bg-white/[0.04]" />

      {/* AI Settings */}
      <div className="mb-6">
        <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/40">
          AI Assistant
        </h3>
        <div className="space-y-3">
          {[
            { id: "ai-suggestions", label: "AI suggestions", checked: true },
            { id: "ai-autocomplete", label: "AI autocomplete", checked: false },
            { id: "compliance-auto", label: "Auto compliance check", checked: true },
          ].map((setting) => (
            <div key={setting.id} className="flex items-center justify-between">
              <Label htmlFor={setting.id} className="text-xs text-muted-foreground/70">
                {setting.label}
              </Label>
              <Switch id={setting.id} defaultChecked={setting.checked} />
            </div>
          ))}
        </div>
      </div>

      <Separator className="mb-6 bg-white/[0.04]" />

      {/* Brand Compliance */}
      <div>
        <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/40">
          Brand Compliance
        </h3>
        <div className="space-y-3">
          <div>
            <Label className="mb-1.5 block text-[10px] text-muted-foreground/50">Compliance Level</Label>
            <select className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs text-foreground focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option>Strict (Potomac Standards)</option>
              <option>Moderate</option>
              <option>Relaxed</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
