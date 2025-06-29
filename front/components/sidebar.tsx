"use client"

import { MessageCircle, FileText, Upload, Settings, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    {
      id: "chat",
      label: "Customs Chat",
      icon: MessageCircle,
      description: "관세 상담 챗봇",
    },
    {
      id: "briefing",
      label: "Briefing Bot",
      icon: FileText,
      description: "최신 정보 브리핑",
    },
    {
      id: "extractor",
      label: "Smart Extractor",
      icon: Upload,
      description: "PDF → Excel 변환",
    },
  ]

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">CustomBot</h1>
            <p className="text-sm text-gray-500">관세사 전용 AI 어시스턴트</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-auto p-4 text-left",
                activeTab === item.id ? "bg-blue-600 text-white hover:bg-blue-700" : "hover:bg-gray-100",
              )}
              onClick={() => onTabChange(item.id)}
            >
              <div className="flex items-start space-x-3">
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className={cn("text-sm", activeTab === item.id ? "text-blue-100" : "text-gray-500")}>
                    {item.description}
                  </div>
                </div>
              </div>
            </Button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="w-4 h-4 mr-2" />
          설정
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <HelpCircle className="w-4 h-4 mr-2" />
          도움말
        </Button>
      </div>
    </div>
  )
}
