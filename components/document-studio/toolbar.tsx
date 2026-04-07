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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToolbarProps {
  activeDocument: "docx" | "pptx" | "xlsx";
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

export function Toolbar({ activeDocument, sidebarOpen, setSidebarOpen, rightPanelOpen, setRightPanelOpen }: ToolbarProps) {
  const info = documentInfo[activeDocument];
  const tools = documentTools[activeDocument];

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex flex-col border-b border-white/[0.06] bg-gradient-to-r from-white/[0.03] via-white/[0.02] to-white/[0.03] backdrop-blur-2xl">
        {/* Top Bar */}
        <div className="flex h-14 items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            {/* Panel Toggle - Desktop */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden text-muted-foreground/60 hover:bg-white/[0.05] hover:text-foreground lg:flex"
            >
              <PanelLeft className="h-4 w-4" />
            </Button>

            {/* Document Type Badge */}
            <div className={cn(
              "flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-1.5",
              info.bgColor
            )}>
              <info.icon className={cn("h-4 w-4", info.color)} />
              <span className="text-sm font-medium text-foreground">{info.label}</span>
            </div>

            {/* Document Title */}
            <div className="hidden md:block">
              <h1 className="text-sm font-medium text-foreground">Untitled</h1>
              <p className="text-xs text-muted-foreground/50">Ready to edit</p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* AI Assist Button */}
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "hidden gap-2 sm:flex",
                "border-primary/30 bg-primary/10 text-primary",
                "shadow-[0_0_15px_rgba(45,212,191,0.1)]",
                "hover:border-primary/50 hover:bg-primary/15 hover:shadow-[0_0_20px_rgba(45,212,191,0.2)]"
              )}
            >
              <Sparkles className="h-4 w-4" />
              <span>AI Assist</span>
            </Button>

            {/* Undo/Redo */}
            <div className="hidden items-center gap-1 md:flex">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground/60 hover:bg-white/[0.05] hover:text-foreground">
                    <Undo2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="border-white/10 bg-card/95 backdrop-blur-xl">Undo (Ctrl+Z)</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground/60 hover:bg-white/[0.05] hover:text-foreground">
                    <Redo2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="border-white/10 bg-card/95 backdrop-blur-xl">Redo (Ctrl+Shift+Z)</TooltipContent>
              </Tooltip>
            </div>

            <Separator orientation="vertical" className="hidden h-6 bg-white/[0.08] md:block" />

            {/* Share & Export */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground/60 hover:bg-white/[0.05] hover:text-foreground">
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="border-white/10 bg-card/95 backdrop-blur-xl">Share</TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground/60 hover:bg-white/[0.05] hover:text-foreground">
                  <Download className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-white/[0.08] bg-card/95 backdrop-blur-2xl">
                <DropdownMenuItem className="focus:bg-white/[0.05]">Download as .{activeDocument}</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/[0.05]">Download as PDF</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/[0.05]">Export to Cloud</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Right Panel Toggle - Desktop */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              className="hidden text-muted-foreground/60 hover:bg-white/[0.05] hover:text-foreground lg:flex"
            >
              <PanelRight className="h-4 w-4" />
            </Button>

            {/* More Options */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground/60 hover:bg-white/[0.05] hover:text-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-white/[0.08] bg-card/95 backdrop-blur-2xl">
                <DropdownMenuItem className="focus:bg-white/[0.05]">Print</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/[0.05]">Version History</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/[0.05]">Document Details</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/[0.05]">Keyboard Shortcuts</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Formatting Toolbar */}
        <div className="flex h-12 items-center gap-1 overflow-x-auto px-4 scrollbar-none">
          {/* Font Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hidden gap-1 text-muted-foreground/70 hover:bg-white/[0.05] hover:text-foreground md:flex"
              >
                <span className="w-24 truncate text-left">Inter</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-white/[0.08] bg-card/95 backdrop-blur-2xl">
              <DropdownMenuItem className="focus:bg-white/[0.05]">Inter</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-white/[0.05]">Arial</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-white/[0.05]">Times New Roman</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-white/[0.05]">Roboto</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-white/[0.05]">Open Sans</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Font Size */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hidden gap-1 text-muted-foreground/70 hover:bg-white/[0.05] hover:text-foreground md:flex"
              >
                <span>12</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-white/[0.08] bg-card/95 backdrop-blur-2xl">
              {[8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 72].map((size) => (
                <DropdownMenuItem key={size} className="focus:bg-white/[0.05]">{size}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Separator orientation="vertical" className="mx-1 hidden h-6 bg-white/[0.08] md:block" />

          {/* Tool Groups */}
          {tools.map((group, groupIndex) => (
            <div key={group.group} className="flex items-center">
              {groupIndex > 0 && (
                <Separator orientation="vertical" className="mx-1 h-6 bg-white/[0.08]" />
              )}
              <div className="flex items-center gap-0.5">
                {group.items.map((tool) => (
                  <Tooltip key={tool.label}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground/60 hover:bg-white/[0.08] hover:text-foreground"
                      >
                        <tool.icon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="border-white/10 bg-card/95 backdrop-blur-xl">
                      {tool.label}
                      {tool.shortcut && (
                        <span className="ml-2 text-muted-foreground/60">{tool.shortcut}</span>
                      )}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
