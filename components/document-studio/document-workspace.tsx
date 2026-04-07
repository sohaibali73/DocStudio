"use client";

import { cn } from "@/lib/utils";
import { FileText, Presentation, Table2, ZoomIn, ZoomOut, Maximize2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface DocumentWorkspaceProps {
  activeDocument: "docx" | "pptx" | "xlsx";
}

export function DocumentWorkspace({ activeDocument }: DocumentWorkspaceProps) {
  const [zoom, setZoom] = useState([100]);

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Document Canvas Area */}
      <div className="relative flex-1 overflow-auto p-4 md:p-8">
        <div className="mx-auto flex min-h-full items-start justify-center">
          {activeDocument === "docx" && <DocumentCanvas zoom={zoom[0]} />}
          {activeDocument === "pptx" && <PresentationCanvas zoom={zoom[0]} />}
          {activeDocument === "xlsx" && <SpreadsheetCanvas zoom={zoom[0]} />}
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-2 backdrop-blur-2xl">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground/60 hover:bg-white/[0.08] hover:text-foreground"
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
        <span className="w-12 text-center text-sm text-muted-foreground/70">{zoom[0]}%</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground/60 hover:bg-white/[0.08] hover:text-foreground"
          onClick={() => setZoom([Math.min(200, zoom[0] + 25)])}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <div className="h-4 w-px bg-white/[0.08]" />
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground/60 hover:bg-white/[0.08] hover:text-foreground"
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
      className="relative overflow-hidden rounded-xl transition-transform"
      style={{
        width: `${(8.5 * 96 * zoom) / 100}px`,
        minHeight: `${(11 * 96 * zoom) / 100}px`,
        transform: `scale(${zoom / 100})`,
        transformOrigin: "top center",
      }}
    >
      {/* Glass card effect */}
      <div className="absolute inset-0 rounded-xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] to-white/[0.03] backdrop-blur-sm" />
      <div className="absolute inset-[1px] rounded-[11px] bg-gradient-to-b from-white/[0.05] to-transparent" />
      
      {/* Document lines pattern */}
      <div className="absolute inset-0 rounded-xl bg-[linear-gradient(to_bottom,transparent_0px,transparent_31px,rgba(255,255,255,0.03)_32px)] bg-[length:100%_32px]" />
      
      {/* Empty State */}
      <div className="relative flex min-h-[800px] flex-col items-center justify-center p-16 text-center">
        <div className="relative mb-6">
          <div className="absolute -inset-4 rounded-3xl bg-blue-500/10 blur-2xl" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.1] to-white/[0.02]">
            <FileText className="h-10 w-10 text-blue-400" />
          </div>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-foreground">Start your document</h3>
        <p className="mb-8 max-w-sm text-sm text-muted-foreground/60">
          Create rich documents with formatting, images, tables, and AI-powered writing assistance.
        </p>
        <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
          <Sparkles className="h-4 w-4" />
          <span>Press / for AI commands</span>
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
        className="relative overflow-hidden rounded-2xl"
        style={{
          width: `${(960 * zoom) / 100}px`,
          height: `${(540 * zoom) / 100}px`,
        }}
      >
        {/* Glass card effect */}
        <div className="absolute inset-0 rounded-2xl border border-white/[0.1] bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm" />
        <div className="absolute inset-[1px] rounded-[15px] bg-gradient-to-br from-white/[0.05] to-transparent" />
        
        {/* Ambient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(251,146,60,0.08),transparent_50%),radial-gradient(ellipse_at_70%_70%,rgba(59,130,246,0.08),transparent_50%)]" />
        
        {/* Empty State */}
        <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">
          <div className="relative mb-4">
            <div className="absolute -inset-4 rounded-3xl bg-orange-500/10 blur-2xl" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.1] to-white/[0.02]">
              <Presentation className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Design your slide</h3>
          <p className="mb-4 max-w-xs text-sm text-muted-foreground/60">
            Add content, images, and charts. AI can help generate layouts and content.
          </p>
        </div>
      </div>

      {/* Slide Thumbnails */}
      <div className="flex items-center justify-center gap-3">
        <div className="relative flex h-16 w-28 items-center justify-center overflow-hidden rounded-lg border border-primary/50 ring-2 ring-primary/20">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-white/[0.02]" />
          <span className="relative text-xs text-muted-foreground">Slide 1</span>
        </div>
        <button className="flex h-16 w-28 items-center justify-center rounded-lg border border-dashed border-white/[0.1] text-muted-foreground/50 transition-all hover:border-primary/30 hover:bg-white/[0.02] hover:text-primary">
          <span className="text-2xl font-light">+</span>
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
      className="relative overflow-hidden rounded-xl"
      style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
    >
      {/* Glass card effect */}
      <div className="absolute inset-0 rounded-xl border border-white/[0.1] bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-sm" />
      
      {/* Formula Bar */}
      <div className="relative flex h-10 items-center gap-2 border-b border-white/[0.06] px-3">
        <span className="flex h-6 w-12 items-center justify-center rounded border border-white/[0.08] bg-white/[0.03] text-xs text-muted-foreground">
          A1
        </span>
        <span className="text-muted-foreground/50">=</span>
        <div className="flex-1 rounded border border-white/[0.06] bg-white/[0.02] px-2 py-1 text-sm text-muted-foreground/50">
          Enter formula or value...
        </div>
      </div>

      {/* Spreadsheet Grid */}
      <div className="relative overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 top-0 z-20 h-8 w-12 border-b border-r border-white/[0.06] bg-white/[0.04] text-xs font-medium text-muted-foreground/60" />
              {columns.map((col) => (
                <th
                  key={col}
                  className="sticky top-0 z-10 h-8 w-24 border-b border-r border-white/[0.06] bg-white/[0.04] text-xs font-medium text-muted-foreground/60"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row}>
                <td className="sticky left-0 z-10 h-8 w-12 border-b border-r border-white/[0.06] bg-white/[0.04] text-center text-xs font-medium text-muted-foreground/60">
                  {row}
                </td>
                {columns.map((col) => (
                  <td
                    key={`${col}${row}`}
                    className="h-8 w-24 border-b border-r border-white/[0.06] bg-transparent text-sm hover:bg-primary/5"
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
        <div className="text-center">
          <div className="relative mx-auto mb-4">
            <div className="absolute -inset-4 rounded-3xl bg-emerald-500/10 blur-2xl" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.1] to-white/[0.02]">
              <Table2 className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Build your spreadsheet</h3>
          <p className="mb-4 max-w-xs text-sm text-muted-foreground/60">
            Enter data, create formulas, and visualize with charts.
          </p>
          <div className="flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span>AI can help with formulas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
