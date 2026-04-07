"use client";

import { cn } from "@/lib/utils";
import { FileText, Presentation, Table2, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface DocumentWorkspaceProps {
  activeDocument: "docx" | "pptx" | "xlsx";
}

export function DocumentWorkspace({ activeDocument }: DocumentWorkspaceProps) {
  const [zoom, setZoom] = useState([100]);

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-background/50">
      {/* Document Canvas Area */}
      <div className="flex-1 overflow-auto p-4 md:p-8">
        <div className="mx-auto flex min-h-full items-start justify-center">
          {activeDocument === "docx" && <DocumentCanvas zoom={zoom[0]} />}
          {activeDocument === "pptx" && <PresentationCanvas zoom={zoom[0]} />}
          {activeDocument === "xlsx" && <SpreadsheetCanvas zoom={zoom[0]} />}
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-glass-border bg-glass/80 px-4 py-2 backdrop-blur-xl">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-foreground"
          onClick={() => setZoom([Math.max(25, zoom[0] - 25)])}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Slider
          value={zoom}
          onValueChange={setZoom}
          min={25}
          max={200}
          step={25}
          className="w-24"
        />
        <span className="w-12 text-center text-sm text-muted-foreground">{zoom[0]}%</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-foreground"
          onClick={() => setZoom([Math.min(200, zoom[0] + 25)])}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <div className="h-4 w-px bg-glass-border" />
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-foreground"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function DocumentCanvas({ zoom }: { zoom: number }) {
  return (
    <div
      className="relative rounded-lg border border-glass-border bg-card shadow-2xl shadow-black/20 transition-transform"
      style={{
        width: `${(8.5 * 96 * zoom) / 100}px`,
        minHeight: `${(11 * 96 * zoom) / 100}px`,
        transform: `scale(${zoom / 100})`,
        transformOrigin: "top center",
      }}
    >
      {/* Document Paper */}
      <div className="absolute inset-0 rounded-lg bg-[linear-gradient(to_bottom,transparent_0px,transparent_23px,rgba(255,255,255,0.03)_24px)] bg-[length:100%_24px]" />
      
      {/* Empty State */}
      <div className="flex min-h-[800px] flex-col items-center justify-center p-16 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-glass-border bg-glass">
          <FileText className="h-10 w-10 text-blue-400" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-foreground">Start typing your document</h3>
        <p className="mb-6 max-w-sm text-sm text-muted-foreground">
          Create rich documents with formatting, images, tables, and more. Use AI Assist to help write faster.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          <kbd className="rounded border border-glass-border bg-secondary px-2 py-1">⌘ + B</kbd>
          <span>Bold</span>
          <span className="mx-2">·</span>
          <kbd className="rounded border border-glass-border bg-secondary px-2 py-1">⌘ + I</kbd>
          <span>Italic</span>
          <span className="mx-2">·</span>
          <kbd className="rounded border border-glass-border bg-secondary px-2 py-1">/</kbd>
          <span>AI Commands</span>
        </div>
      </div>
    </div>
  );
}

function PresentationCanvas({ zoom }: { zoom: number }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Main Slide */}
      <div
        className="relative overflow-hidden rounded-xl border border-glass-border bg-card shadow-2xl shadow-black/20"
        style={{
          width: `${(960 * zoom) / 100}px`,
          height: `${(540 * zoom) / 100}px`,
        }}
      >
        {/* Slide Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(251,146,60,0.1),transparent_50%)]" />
        
        {/* Empty State */}
        <div className="flex h-full flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-glass-border bg-glass">
            <Presentation className="h-8 w-8 text-orange-400" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Design your presentation</h3>
          <p className="mb-4 max-w-xs text-sm text-muted-foreground">
            Add slides, text, images, and charts. AI can help generate slide content and layouts.
          </p>
        </div>
      </div>

      {/* Slide Thumbnails */}
      <div className="flex items-center justify-center gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "relative flex h-16 w-28 items-center justify-center rounded-lg border bg-card text-xs text-muted-foreground transition-all hover:border-primary/50",
              i === 1 ? "border-primary ring-2 ring-primary/20" : "border-glass-border"
            )}
          >
            <span>Slide {i}</span>
          </div>
        ))}
        <button className="flex h-16 w-28 items-center justify-center rounded-lg border border-dashed border-glass-border text-muted-foreground transition-all hover:border-primary/50 hover:bg-glass-hover hover:text-foreground">
          <span className="text-lg">+</span>
        </button>
      </div>
    </div>
  );
}

function SpreadsheetCanvas({ zoom }: { zoom: number }) {
  const columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const rows = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div
      className="overflow-hidden rounded-lg border border-glass-border bg-card shadow-2xl shadow-black/20"
      style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
    >
      {/* Formula Bar */}
      <div className="flex h-10 items-center gap-2 border-b border-glass-border bg-secondary/30 px-3">
        <span className="flex h-6 w-12 items-center justify-center rounded border border-glass-border bg-secondary/50 text-xs text-muted-foreground">
          A1
        </span>
        <span className="text-muted-foreground">=</span>
        <div className="flex-1 rounded border border-glass-border bg-input px-2 py-1 text-sm text-foreground">
          Enter formula or value...
        </div>
      </div>

      {/* Spreadsheet Grid */}
      <div className="overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 top-0 z-20 h-8 w-12 border-b border-r border-glass-border bg-secondary/50 text-xs font-medium text-muted-foreground" />
              {columns.map((col) => (
                <th
                  key={col}
                  className="sticky top-0 z-10 h-8 w-24 border-b border-r border-glass-border bg-secondary/50 text-xs font-medium text-muted-foreground"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row}>
                <td className="sticky left-0 z-10 h-8 w-12 border-b border-r border-glass-border bg-secondary/50 text-center text-xs font-medium text-muted-foreground">
                  {row}
                </td>
                {columns.map((col) => (
                  <td
                    key={`${col}${row}`}
                    className="h-8 w-24 border-b border-r border-glass-border bg-transparent text-sm hover:bg-primary/5"
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm">
        <div className="text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-glass-border bg-glass mx-auto">
            <Table2 className="h-8 w-8 text-green-400" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Build your spreadsheet</h3>
          <p className="mb-4 max-w-xs text-sm text-muted-foreground">
            Enter data, create formulas, and visualize with charts. AI can help with complex calculations.
          </p>
        </div>
      </div>
    </div>
  );
}
