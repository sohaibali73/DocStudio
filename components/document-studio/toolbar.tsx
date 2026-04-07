"use client";

import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link2,
  Image,
  Table,
  Undo2,
  Redo2,
  Download,
  Share2,
  MoreHorizontal,
  ChevronDown,
  PanelLeft,
  PanelRight,
  Sparkles,
  FileText,
  Presentation,
  Table2,
  Palette,
  Type,
  Shapes,
  BarChart3,
  Grid3X3,
  Calculator,
  Filter,
  SortAsc,
  Shield,
  Loader2,
  CheckCircle2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { DocumentType, DocumentState } from "@/app/page";

interface ToolbarProps {
  activeDocument: DocumentType;
  document: DocumentState;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  rightPanelOpen: boolean;
  setRightPanelOpen: (open: boolean) => void;
}

const documentInfo = {
  docx: { label: "Document", icon: FileText, color: "text-blue-400", bgColor: "bg-blue-500/10" },
  pptx: { label: "Presentation", icon: Presentation, color: "text-orange-400", bgColor: "bg-orange-500/10" },
  xlsx: { label: "Spreadsheet", icon: Table2, color: "text-emerald-400", bgColor: "bg-emerald-500/10" },
};

const documentTools = {
  docx: [
    { group: "text", items: [
      { icon: Bold, label: "Bold", shortcut: "Ctrl+B" },
      { icon: Italic, label: "Italic", shortcut: "Ctrl+I" },
      { icon: Underline, label: "Underline", shortcut: "Ctrl+U" },
    ]},
    { group: "align", items: [
      { icon: AlignLeft, label: "Align Left" },
      { icon: AlignCenter, label: "Align Center" },
      { icon: AlignRight, label: "Align Right" },
      { icon: AlignJustify, label: "Justify" },
    ]},
    { group: "list", items: [
      { icon: List, label: "Bullet List" },
      { icon: ListOrdered, label: "Numbered List" },
    ]},
    { group: "insert", items: [
      { icon: Link2, label: "Insert Link", shortcut: "Ctrl+K" },
      { icon: Image, label: "Insert Image" },
      { icon: Table, label: "Insert Table" },
    ]},
  ],
  pptx: [
    { group: "text", items: [
      { icon: Bold, label: "Bold", shortcut: "Ctrl+B" },
      { icon: Italic, label: "Italic", shortcut: "Ctrl+I" },
      { icon: Underline, label: "Underline", shortcut: "Ctrl+U" },
    ]},
    { group: "design", items: [
      { icon: Type, label: "Text Box" },
      { icon: Shapes, label: "Shapes" },
      { icon: Image, label: "Insert Image" },
    ]},
    { group: "elements", items: [
      { icon: BarChart3, label: "Insert Chart" },
      { icon: Table, label: "Insert Table" },
      { icon: Palette, label: "Themes" },
    ]},
  ],
  xlsx: [
    { group: "text", items: [
      { icon: Bold, label: "Bold", shortcut: "Ctrl+B" },
      { icon: Italic, label: "Italic", shortcut: "Ctrl+I" },
      { icon: Underline, label: "Underline", shortcut: "Ctrl+U" },
    ]},
    { group: "cell", items: [
      { icon: Grid3X3, label: "Merge Cells" },
      { icon: Palette, label: "Cell Color" },
      { icon: AlignLeft, label: "Align" },
    ]},
    { group: "data", items: [
      { icon: Calculator, label: "Functions" },
      { icon: Filter, label: "Filter" },
      { icon: SortAsc, label: "Sort" },
      { icon: BarChart3, label: "Insert Chart" },
    ]},
  ],
};

export function Toolbar({ 
  activeDocument, 
  document,
  sidebarOpen, 
  setSidebarOpen, 
  rightPanelOpen, 
  setRightPanelOpen 
}: ToolbarProps) {
  const info = documentInfo[activeDocument];
  const tools = documentTools[activeDocument];

  return (
    <div className="flex flex-col border-b border-white/[0.04] bg-gradient-to-r from-white/[0.02] via-white/[0.015] to-white/[0.02] backdrop-blur-2xl overflow-hidden">
      {/* Top Bar */}
      <div className="flex h-14 items-center justify-between gap-2 px-4 overflow-x-auto flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0 flex-shrink-0">
          {/* Panel Toggle - Desktop */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden text-muted-foreground/50 hover:bg-white/[0.04] hover:text-foreground lg:flex flex-shrink-0"
              >
                <PanelLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="border-white/10 bg-card/95 backdrop-blur-xl">Toggle Sidebar</TooltipContent>
          </Tooltip>

          {/* Document Type Badge */}
          <div className={cn(
            "flex items-center gap-2 rounded-lg border border-white/[0.06] px-3 py-1.5 flex-shrink-0",
            info.bgColor
          )}>
            <info.icon className={cn("h-4 w-4", info.color)} />
            <span className="text-sm font-medium text-foreground whitespace-nowrap">{info.label}</span>
          </div>

          {/* Document Title */}
          <div className="hidden md:flex min-w-0 flex-col">
            <h1 className="text-sm font-medium text-foreground truncate">{document?.title || "Untitled"}</h1>
            <div className="flex items-center gap-2 text-xs text-muted-foreground/50 whitespace-nowrap">
              {document?.isProcessing ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin text-primary flex-shrink-0" />
                  <span>Processing...</span>
                </>
              ) : document?.lastSaved ? (
                <>
                  <CheckCircle2 className="h-3 w-3 text-emerald-400 flex-shrink-0" />
                  <span>Saved</span>
                </>
              ) : (
                <span>Ready</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 flex-shrink-0 ml-auto">
          {/* Compliance Score */}
          {document && document.complianceScore !== null && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={cn(
                  "hidden items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium md:flex flex-shrink-0",
                  document.complianceScore >= 90 
                    ? "bg-emerald-500/10 text-emerald-400" 
                    : document.complianceScore >= 70 
                    ? "bg-amber-500/10 text-amber-400"
                    : "bg-red-500/10 text-red-400"
                )}>
                  <Shield className="h-3.5 w-3.5" />
                  <span className="whitespace-nowrap">{document.complianceScore}%</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="border-white/10 bg-card/95 backdrop-blur-xl">
                Brand Compliance Score
              </TooltipContent>
            </Tooltip>
          )}

          {/* AI Assist Button - Hidden on narrow screens */}
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "hidden gap-1 xl:flex flex-shrink-0",
              "border-primary/30 bg-primary/5 text-primary",
              "shadow-lg shadow-primary/10",
              "hover:border-primary/50 hover:bg-primary/10 hover:shadow-primary/20",
              "transition-all duration-300 whitespace-nowrap"
            )}
          >
            <Sparkles className="h-4 w-4 flex-shrink-0" />
            <span className="text-xs">AI</span>
          </Button>

          {/* Undo/Redo - Hidden on md screens */}
          <div className="hidden items-center gap-0.5 xl:flex">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/50 hover:bg-white/[0.04] hover:text-foreground flex-shrink-0">
                  <Undo2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="border-white/10 bg-card/95 backdrop-blur-xl">Undo</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/50 hover:bg-white/[0.04] hover:text-foreground flex-shrink-0">
                  <Redo2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="border-white/10 bg-card/95 backdrop-blur-xl">Redo (Ctrl+Shift+Z)</TooltipContent>
            </Tooltip>
          </div>

          <Separator orientation="vertical" className="hidden h-6 bg-white/[0.06] xl:block" />

          {/* Collaborators Placeholder */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/50 hover:bg-white/[0.04] hover:text-foreground flex-shrink-0">
                <Users className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="border-white/10 bg-card/95 backdrop-blur-xl">Collaborators</TooltipContent>
          </Tooltip>

          {/* Share */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/50 hover:bg-white/[0.04] hover:text-foreground flex-shrink-0">
                <Share2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="border-white/10 bg-card/95 backdrop-blur-xl">Share</TooltipContent>
          </Tooltip>

          {/* Export Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/50 hover:bg-white/[0.04] hover:text-foreground flex-shrink-0">
                <Download className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 border-white/[0.06] bg-card/95 backdrop-blur-2xl">
              <DropdownMenuItem className="gap-2 focus:bg-white/[0.05]">
                <FileText className="h-4 w-4" />
                Download as .{activeDocument}
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 focus:bg-white/[0.05]">
                <FileText className="h-4 w-4" />
                Download as PDF
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/[0.06]" />
              <DropdownMenuItem className="gap-2 focus:bg-white/[0.05]">
                Export to Cloud Storage
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Right Panel Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setRightPanelOpen(!rightPanelOpen)}
                className="hidden h-8 w-8 text-muted-foreground/50 hover:bg-white/[0.04] hover:text-foreground lg:flex flex-shrink-0"
              >
                <PanelRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="border-white/10 bg-card/95 backdrop-blur-xl">Toggle Panel</TooltipContent>
          </Tooltip>

          {/* More Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/50 hover:bg-white/[0.04] hover:text-foreground flex-shrink-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 border-white/[0.06] bg-card/95 backdrop-blur-2xl">
              <DropdownMenuItem className="focus:bg-white/[0.05]">Print</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-white/[0.05]">Version History</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-white/[0.05]">Document Details</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/[0.06]" />
              <DropdownMenuItem className="focus:bg-white/[0.05]">Run Compliance Check</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-white/[0.05]">Keyboard Shortcuts</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Formatting Toolbar - Scrollable */}
      <div className="flex h-11 items-center gap-1 overflow-x-auto overflow-y-hidden border-t border-white/[0.03] px-4 scrollbar-hide flex-shrink-0">
        {/* Font Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="hidden h-8 gap-1 text-muted-foreground/60 hover:bg-white/[0.04] hover:text-foreground sm:flex flex-shrink-0"
            >
              <span className="w-16 truncate text-left text-xs">Inter</span>
              <ChevronDown className="h-3 w-3 flex-shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-white/[0.06] bg-card/95 backdrop-blur-2xl">
            <DropdownMenuItem className="focus:bg-white/[0.05]">Inter</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-white/[0.05]">Arial</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-white/[0.05]">Times New Roman</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-white/[0.05]">Roboto</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Font Size */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="hidden h-8 gap-1 text-muted-foreground/60 hover:bg-white/[0.04] hover:text-foreground sm:flex flex-shrink-0"
            >
              <span className="text-xs">12</span>
              <ChevronDown className="h-3 w-3 flex-shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-white/[0.06] bg-card/95 backdrop-blur-2xl">
            {[10, 11, 12, 14, 16, 18, 24, 30, 36, 48].map((size) => (
              <DropdownMenuItem key={size} className="focus:bg-white/[0.05]">{size}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="mx-1 hidden h-5 bg-white/[0.06] sm:block" />

        {/* Tool Groups */}
        {tools.map((group, groupIndex) => (
          <div key={group.group} className="flex items-center flex-shrink-0">
            {groupIndex > 0 && (
              <Separator orientation="vertical" className="mx-1 h-5 bg-white/[0.06]" />
            )}
            <div className="flex items-center gap-0.5">
              {group.items.map((tool) => (
                <Tooltip key={tool.label}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground/50 hover:bg-white/[0.06] hover:text-foreground flex-shrink-0"
                    >
                      <tool.icon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="border-white/10 bg-card/95 backdrop-blur-xl">
                    {tool.label}
                    {tool.shortcut && (
                      <span className="ml-2 text-muted-foreground/50">{tool.shortcut}</span>
                    )}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
