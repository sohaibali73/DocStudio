"use client";

import { useState } from "react";
import { Sidebar } from "@/components/document-studio/sidebar";
import { Toolbar } from "@/components/document-studio/toolbar";
import { DocumentWorkspace } from "@/components/document-studio/document-workspace";
import { RightPanel } from "@/components/document-studio/right-panel";
import { MobileNav } from "@/components/document-studio/mobile-nav";
import { TooltipProvider } from "@/components/ui/tooltip";

export type DocumentType = "docx" | "pptx" | "xlsx";

export interface DocumentState {
  id: string;
  type: DocumentType;
  title: string;
  content: string;
  complianceScore: number | null;
  lastSaved: Date | null;
  isProcessing: boolean;
}

export default function PotomacStudio() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [activeDocument, setActiveDocument] = useState<DocumentType>("docx");
  const [rightPanelTab, setRightPanelTab] = useState<"files" | "settings" | "ai" | "compliance">("ai");

  // Document state (ready for backend integration)
  const [document, setDocument] = useState<DocumentState>({
    id: "",
    type: "docx",
    title: "Untitled",
    content: "",
    complianceScore: null,
    lastSaved: null,
    isProcessing: false,
  });

  const updateDocument = (updates: Partial<DocumentState>) => {
    setDocument((prev) => ({ ...prev, ...updates }));
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        {/* Ambient background effects */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
          {/* Primary glow - Potomac teal */}
          <div className="absolute -left-64 -top-64 h-[700px] w-[700px] rounded-full bg-primary/[0.07] blur-[150px]" />
          {/* Secondary glow */}
          <div className="absolute -bottom-64 -right-64 h-[700px] w-[700px] rounded-full bg-chart-2/[0.05] blur-[150px]" />
          {/* Accent glow */}
          <div className="absolute left-1/3 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-chart-5/[0.03] blur-[120px]" />
          {/* Noise texture overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wMjUiLz48L3N2Zz4=')] opacity-60" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex h-full w-full overflow-hidden">

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
          setActiveDocument={(type) => {
            setActiveDocument(type);
            updateDocument({ type });
          }}
        />

        {/* Main Content Area */}
        <main className="relative flex flex-1 flex-col overflow-hidden">
          {/* Toolbar */}
          <Toolbar
            activeDocument={activeDocument}
            document={document}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            rightPanelOpen={rightPanelOpen}
            setRightPanelOpen={setRightPanelOpen}
          />

          {/* Document Workspace */}
          <DocumentWorkspace
            activeDocument={activeDocument}
            document={document}
            updateDocument={updateDocument}
          />
        </main>

        {/* Right Panel */}
        <RightPanel
          isOpen={rightPanelOpen}
          onToggle={() => setRightPanelOpen(!rightPanelOpen)}
          activeTab={rightPanelTab}
          setActiveTab={setRightPanelTab}
          activeDocument={activeDocument}
        />
        </div>
      </div>
    </TooltipProvider>
  );
}
