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
  MoreVertical,
  Search,
  Clock,
  Star,
  Send,
  Wand2,
  PenLine,
  Languages,
  CheckCircle,
  ListChecks,
  Lightbulb,
  X,
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
  { icon: PenLine, label: "Write content", description: "Generate text based on a prompt" },
  { icon: Wand2, label: "Improve writing", description: "Enhance clarity and tone" },
  { icon: Languages, label: "Translate", description: "Convert to another language" },
  { icon: CheckCircle, label: "Fix grammar", description: "Correct spelling and grammar" },
  { icon: ListChecks, label: "Summarize", description: "Create a brief summary" },
  { icon: Lightbulb, label: "Brainstorm", description: "Generate ideas and suggestions" },
];

const recentFiles = [
  { name: "Q4 Report.docx", type: "docx" as const, time: "2 hours ago", starred: true },
  { name: "Marketing Deck.pptx", type: "pptx" as const, time: "Yesterday", starred: false },
  { name: "Budget 2024.xlsx", type: "xlsx" as const, time: "2 days ago", starred: true },
  { name: "Meeting Notes.docx", type: "docx" as const, time: "3 days ago", starred: false },
  { name: "Product Roadmap.pptx", type: "pptx" as const, time: "Last week", starred: false },
];

const fileIcons = {
  docx: { icon: FileText, color: "text-blue-400" },
  pptx: { icon: Presentation, color: "text-orange-400" },
  xlsx: { icon: Table2, color: "text-green-400" },
};

export function RightPanel({ isOpen, onToggle, activeTab, setActiveTab }: RightPanelProps) {
  return (
    <>
      {/* Panel */}
      <aside
        className={cn(
          "fixed right-0 top-0 z-40 flex h-full flex-col border-l border-glass-border bg-glass backdrop-blur-xl transition-all duration-300 lg:relative",
          isOpen ? "w-80 translate-x-0" : "w-0 translate-x-full"
        )}
      >
        {/* Panel Header */}
        <div className="flex h-16 items-center justify-between border-b border-glass-border px-4">
          <div className="flex items-center gap-1 rounded-lg bg-secondary/50 p-1">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "gap-2 text-muted-foreground",
                  activeTab === tab.id && "bg-glass-hover text-foreground"
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
            className="text-muted-foreground hover:text-foreground lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Panel Content */}
        <ScrollArea className="flex-1">
          {activeTab === "ai" && <AIPanel />}
          {activeTab === "files" && <FilesPanel />}
          {activeTab === "settings" && <SettingsPanel />}
        </ScrollArea>
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

function AIPanel() {
  return (
    <div className="flex flex-col p-4">
      {/* AI Chat Input */}
      <div className="mb-6">
        <div className="relative">
          <Textarea
            placeholder="Ask AI to help you write, edit, or improve your document..."
            className="min-h-24 resize-none border-glass-border bg-secondary/50 pr-12 placeholder:text-muted-foreground focus-visible:ring-primary"
          />
          <Button
            size="icon"
            className="absolute bottom-2 right-2 h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-4">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {aiPrompts.map((prompt) => (
            <button
              key={prompt.label}
              className="flex flex-col items-start gap-1 rounded-lg border border-glass-border bg-secondary/30 p-3 text-left transition-all hover:border-primary/50 hover:bg-glass-hover"
            >
              <prompt.icon className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{prompt.label}</span>
              <span className="text-xs text-muted-foreground line-clamp-1">{prompt.description}</span>
            </button>
          ))}
        </div>
      </div>

      <Separator className="my-4 bg-glass-border" />

      {/* AI Suggestions */}
      <div>
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Suggestions
        </h3>
        <div className="space-y-2">
          <div className="rounded-lg border border-glass-border bg-secondary/30 p-3">
            <div className="mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-chart-3" />
              <span className="text-sm font-medium text-foreground">Add an introduction</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Your document could benefit from a brief introduction paragraph.
            </p>
          </div>
          <div className="rounded-lg border border-glass-border bg-secondary/30 p-3">
            <div className="mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-foreground">Improve readability</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Some sentences are quite long. Consider breaking them up.
            </p>
          </div>
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
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search files..."
          className="h-10 border-glass-border bg-secondary/50 pl-9 placeholder:text-muted-foreground focus-visible:ring-primary"
        />
      </div>

      {/* Quick Filters */}
      <div className="mb-4 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-1 border-glass-border bg-secondary/50 text-muted-foreground hover:bg-glass-hover hover:text-foreground"
        >
          <Clock className="h-3 w-3" />
          Recent
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1 border-glass-border bg-secondary/50 text-muted-foreground hover:bg-glass-hover hover:text-foreground"
        >
          <Star className="h-3 w-3" />
          Starred
        </Button>
      </div>

      {/* File List */}
      <div className="space-y-1">
        {recentFiles.map((file, index) => {
          const FileIcon = fileIcons[file.type];
          return (
            <button
              key={index}
              className="group flex w-full items-center gap-3 rounded-lg p-2 text-left transition-all hover:bg-glass-hover"
            >
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-glass-border bg-secondary/50",
                  FileIcon.color
                )}
              >
                <FileIcon.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">{file.time}</p>
              </div>
              <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                {file.starred && <Star className="h-3 w-3 fill-chart-3 text-chart-3" />}
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </button>
          );
        })}
      </div>

      <Separator className="my-4 bg-glass-border" />

      {/* Folders */}
      <div>
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Folders
        </h3>
        <div className="space-y-1">
          {["Projects", "Personal", "Shared", "Archive"].map((folder) => (
            <button
              key={folder}
              className="group flex w-full items-center gap-3 rounded-lg p-2 text-left transition-all hover:bg-glass-hover"
            >
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1 text-sm text-foreground">{folder}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
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
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Document Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-save" className="text-sm text-foreground">
              Auto-save
            </Label>
            <Switch id="auto-save" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="spell-check" className="text-sm text-foreground">
              Spell check
            </Label>
            <Switch id="spell-check" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="grammar-check" className="text-sm text-foreground">
              Grammar check
            </Label>
            <Switch id="grammar-check" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="word-count" className="text-sm text-foreground">
              Show word count
            </Label>
            <Switch id="word-count" />
          </div>
        </div>
      </div>

      <Separator className="mb-6 bg-glass-border" />

      {/* Page Setup */}
      <div className="mb-6">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Page Setup
        </h3>
        <div className="space-y-3">
          <div>
            <Label className="mb-1.5 block text-sm text-muted-foreground">Page Size</Label>
            <select className="w-full rounded-lg border border-glass-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-primary">
              <option>Letter (8.5 x 11 in)</option>
              <option>A4 (210 x 297 mm)</option>
              <option>Legal (8.5 x 14 in)</option>
              <option>Tabloid (11 x 17 in)</option>
            </select>
          </div>
          <div>
            <Label className="mb-1.5 block text-sm text-muted-foreground">Orientation</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-primary bg-primary/10 text-primary"
              >
                Portrait
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-glass-border text-muted-foreground hover:bg-glass-hover"
              >
                Landscape
              </Button>
            </div>
          </div>
          <div>
            <Label className="mb-1.5 block text-sm text-muted-foreground">Margins</Label>
            <select className="w-full rounded-lg border border-glass-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-primary">
              <option>Normal (1 in)</option>
              <option>Narrow (0.5 in)</option>
              <option>Wide (1.5 in)</option>
              <option>Custom</option>
            </select>
          </div>
        </div>
      </div>

      <Separator className="mb-6 bg-glass-border" />

      {/* AI Settings */}
      <div>
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          AI Assistant
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-suggestions" className="text-sm text-foreground">
              AI suggestions
            </Label>
            <Switch id="ai-suggestions" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-autocomplete" className="text-sm text-foreground">
              AI autocomplete
            </Label>
            <Switch id="ai-autocomplete" />
          </div>
          <div>
            <Label className="mb-1.5 block text-sm text-muted-foreground">Writing Style</Label>
            <select className="w-full rounded-lg border border-glass-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-primary">
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
