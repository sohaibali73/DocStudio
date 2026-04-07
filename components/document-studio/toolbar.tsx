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
  docx: { label: "Document", icon: FileText, color: "text-blue-400" },
  pptx: { label: "Presentation", icon: Presentation, color: "text-orange-400" },
  xlsx: { label: "Spreadsheet", icon: Table2, color: "text-green-400" },
};

const documentTools = {
  docx: [
    { group: "text", items: [
      { icon: Bold, label: "Bold", shortcut: "⌘B" },
      { icon: Italic, label: "Italic", shortcut: "⌘I" },
      { icon: Underline, label: "Underline", shortcut: "⌘U" },
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
      { icon: Link2, label: "Insert Link", shortcut: "⌘K" },
      { icon: Image, label: "Insert Image" },
      { icon: Table, label: "Insert Table" },
    ]},
  ],
  pptx: [
    { group: "text", items: [
      { icon: Bold, label: "Bold", shortcut: "⌘B" },
      { icon: Italic, label: "Italic", shortcut: "⌘I" },
      { icon: Underline, label: "Underline", shortcut: "⌘U" },
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
      { icon: Bold, label: "Bold", shortcut: "⌘B" },
      { icon: Italic, label: "Italic", shortcut: "⌘I" },
      { icon: Underline, label: "Underline", shortcut: "⌘U" },
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
      <div className="flex flex-col border-b border-glass-border bg-glass/50 backdrop-blur-xl">
        {/* Top Bar */}
        <div className="flex h-14 items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            {/* Panel Toggle - Desktop */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden text-muted-foreground hover:text-foreground lg:flex"
            >
              <PanelLeft className="h-4 w-4" />
            </Button>

            {/* Document Type Badge */}
            <div className="flex items-center gap-2 rounded-lg border border-glass-border bg-secondary/50 px-3 py-1.5">
              <info.icon className={cn("h-4 w-4", info.color)} />
              <span className="text-sm font-medium text-foreground">{info.label}</span>
            </div>

            {/* Document Title */}
            <div className="hidden md:block">
              <h1 className="text-sm font-medium text-foreground">Untitled Document</h1>
              <p className="text-xs text-muted-foreground">Edited just now</p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* AI Assist Button */}
            <Button
              variant="outline"
              size="sm"
              className="hidden gap-2 border-primary/50 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary sm:flex"
            >
              <Sparkles className="h-4 w-4" />
              <span>AI Assist</span>
            </Button>

            {/* Undo/Redo */}
            <div className="hidden items-center gap-1 md:flex">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Undo2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Undo (⌘Z)</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Redo2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Redo (⌘⇧Z)</TooltipContent>
              </Tooltip>
            </div>

            <Separator orientation="vertical" className="hidden h-6 bg-glass-border md:block" />

            {/* Share & Export */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share</TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Download className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-glass-border bg-popover/95 backdrop-blur-xl">
                <DropdownMenuItem>Download as .{activeDocument}</DropdownMenuItem>
                <DropdownMenuItem>Download as PDF</DropdownMenuItem>
                <DropdownMenuItem>Export to Google Drive</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Right Panel Toggle - Desktop */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              className="hidden text-muted-foreground hover:text-foreground lg:flex"
            >
              <PanelRight className="h-4 w-4" />
            </Button>

            {/* More Options */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-glass-border bg-popover/95 backdrop-blur-xl">
                <DropdownMenuItem>Print</DropdownMenuItem>
                <DropdownMenuItem>Version History</DropdownMenuItem>
                <DropdownMenuItem>Document Details</DropdownMenuItem>
                <DropdownMenuItem>Keyboard Shortcuts</DropdownMenuItem>
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
                className="hidden gap-1 text-muted-foreground hover:text-foreground md:flex"
              >
                <span className="w-24 truncate text-left">Inter</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-glass-border bg-popover/95 backdrop-blur-xl">
              <DropdownMenuItem>Inter</DropdownMenuItem>
              <DropdownMenuItem>Arial</DropdownMenuItem>
              <DropdownMenuItem>Times New Roman</DropdownMenuItem>
              <DropdownMenuItem>Roboto</DropdownMenuItem>
              <DropdownMenuItem>Open Sans</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Font Size */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hidden gap-1 text-muted-foreground hover:text-foreground md:flex"
              >
                <span>12</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-glass-border bg-popover/95 backdrop-blur-xl">
              {[8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 72].map((size) => (
                <DropdownMenuItem key={size}>{size}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Separator orientation="vertical" className="mx-1 hidden h-6 bg-glass-border md:block" />

          {/* Tool Groups */}
          {tools.map((group, groupIndex) => (
            <div key={group.group} className="flex items-center">
              {groupIndex > 0 && (
                <Separator orientation="vertical" className="mx-1 h-6 bg-glass-border" />
              )}
              <div className="flex items-center gap-0.5">
                {group.items.map((tool) => (
                  <Tooltip key={tool.label}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:bg-glass-hover hover:text-foreground"
                      >
                        <tool.icon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {tool.label}
                      {tool.shortcut && (
                        <span className="ml-2 text-muted-foreground">{tool.shortcut}</span>
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
