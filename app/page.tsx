"use client";

import { useState } from "react";
import { Sidebar } from "@/components/document-studio/sidebar";
import { Toolbar } from "@/components/document-studio/toolbar";
import { DocumentWorkspace } from "@/components/document-studio/document-workspace";
import { RightPanel } from "@/components/document-studio/right-panel";
import { MobileNav } from "@/components/document-studio/mobile-nav";

export default function DocumentStudio() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [activeDocument, setActiveDocument] = useState<"docx" | "pptx" | "xlsx">("docx");
  const [rightPanelTab, setRightPanelTab] = useState<"files" | "settings" | "ai">("ai");

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Ambient background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Primary glow */}
        <div className="absolute -left-64 -top-64 h-[600px] w-[600px] rounded-full bg-primary/[0.08] blur-[120px]" />
        {/* Secondary glow */}
        <div className="absolute -bottom-64 -right-64 h-[600px] w-[600px] rounded-full bg-chart-2/[0.06] blur-[120px]" />
        {/* Center subtle glow */}
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-chart-3/[0.03] blur-[100px]" />
        {/* Noise texture overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wMyIvPjwvc3ZnPg==')] opacity-50" />
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        rightPanelOpen={rightPanelOpen}
        setRightPanelOpen={setRightPanelOpen}
      />

      {/* Left Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeDocument={activeDocument}
        setActiveDocument={setActiveDocument}
      />

      {/* Main Content Area */}
      <main className="relative flex flex-1 flex-col overflow-hidden">
        {/* Toolbar */}
        <Toolbar
          activeDocument={activeDocument}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          rightPanelOpen={rightPanelOpen}
          setRightPanelOpen={setRightPanelOpen}
        />

        {/* Document Workspace */}
        <DocumentWorkspace activeDocument={activeDocument} />
      </main>

      {/* Right Panel */}
      <RightPanel
        isOpen={rightPanelOpen}
        onToggle={() => setRightPanelOpen(!rightPanelOpen)}
        activeTab={rightPanelTab}
        setActiveTab={setRightPanelTab}
      />
    </div>
  );
}
