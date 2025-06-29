"use client"

import { MessageCircle, FileText, Upload, Settings, HelpCircle, Sparkles } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

interface AppSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const menuItems = [
    {
      id: "chat",
      title: "Customs Chat",
      description: "관세 상담 챗봇",
      icon: MessageCircle,
      badge: "AI",
    },
    {
      id: "briefing",
      title: "Briefing Bot",
      description: "최신 정보 브리핑",
      icon: FileText,
      badge: "NEW",
    },
    {
      id: "extractor",
      title: "Smart Extractor",
      description: "PDF → Excel 변환",
      icon: Upload,
    },
  ]

  const settingsItems = [
    {
      id: "settings",
      title: "설정",
      icon: Settings,
    },
    {
      id: "help",
      title: "도움말",
      icon: HelpCircle,
    },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-sidebar-primary-foreground">
                <MessageCircle className="size-4 text-white" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">CustomBot</span>
                <span className="truncate text-xs text-sidebar-foreground/70">관세사 전용 AI 어시스턴트</span>
              </div>
              <Badge variant="secondary" className="ml-auto">
                <Sparkles className="size-3 mr-1" />
                Pro
              </Badge>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>AI 도구</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      tooltip={`${item.title} - ${item.description}`}
                      onClick={() => onTabChange(item.id)}
                      isActive={activeTab === item.id}
                      className="h-12"
                    >
                      <Icon className="size-4" />
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">{item.title}</span>
                        <span className="truncate text-xs text-sidebar-foreground/70">{item.description}</span>
                      </div>
                      {item.badge && (
                        <Badge variant={item.badge === "AI" ? "default" : "secondary"} className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => {
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton tooltip={item.title}>
                      <Icon className="size-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gray-200 text-sidebar-primary-foreground">
                <span className="text-sm font-medium text-gray-700">관</span>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">관세사 김철수</span>
                <span className="truncate text-xs text-sidebar-foreground/70">premium@custombot.com</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
