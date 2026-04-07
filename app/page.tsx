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
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-chart-2/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chart-3/5 blur-3xl" />
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
