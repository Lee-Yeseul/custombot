"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ChatInterface } from "@/components/chat-interface"
import { BriefingInterface } from "@/components/briefing-interface"
import { ExtractorInterface } from "@/components/extractor-interface"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function CustomBotApp() {
  const [activeTab, setActiveTab] = useState("chat")

  const renderContent = () => {
    switch (activeTab) {
      case "chat":
        return <ChatInterface />
      case "briefing":
        return <BriefingInterface />
      case "extractor":
        return <ExtractorInterface />
      default:
        return <ChatInterface />
    }
  }

  const getPageTitle = () => {
    switch (activeTab) {
      case "chat":
        return "Customs Chat"
      case "briefing":
        return "Briefing Bot"
      case "extractor":
        return "Smart Extractor"
      default:
        return "CustomBot"
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">CustomBot</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{getPageTitle()}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col">{renderContent()}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
