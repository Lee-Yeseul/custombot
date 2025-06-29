"use client"

import { useState } from "react"
import { Upload, FileText, Download, Settings, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function ExtractorInterface() {
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: "수입신고서_2024_001.pdf",
      size: "2.3 MB",
      status: "completed",
      extractedData: {
        items: 15,
        hsCode: "8471.30.0000",
        totalValue: "₩1,250,000",
      },
    },
    {
      id: 2,
      name: "거래명세서_ABC무역.pdf",
      size: "1.8 MB",
      status: "processing",
      progress: 65,
    },
  ])

  const extractionTemplates = [
    {
      id: "import-declaration",
      name: "수입신고서",
      description: "HS코드, 품목명, 수량, 금액 추출",
      fields: ["HS코드", "품목명", "수량", "단가", "총금액", "원산지"],
    },
    {
      id: "invoice",
      name: "거래명세서",
      description: "상품 정보 및 거래 조건 추출",
      fields: ["품목명", "모델명", "수량", "단가", "총액", "인코텀즈"],
    },
    {
      id: "certificate",
      name: "원산지증명서",
      description: "원산지 정보 및 인증 내용 추출",
      fields: ["원산지", "품목명", "HS코드", "인증번호", "발급일자"],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "processing":
        return <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <FileText className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">완료</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">처리중</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800">오류</Badge>
      default:
        return <Badge variant="outline">대기</Badge>
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">PDF 문서에서 관세 정보를 자동으로 추출하여 Excel로 변환합니다</p>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            추출 설정
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Area */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  파일 업로드
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">PDF 파일을 드래그하거나 클릭하여 업로드</p>
                  <p className="text-sm text-gray-500 mb-4">수입신고서, 거래명세서, 원산지증명서 등</p>
                  <Button>파일 선택</Button>
                </div>
              </CardContent>
            </Card>

            {/* Extraction Templates */}
            <Card>
              <CardHeader>
                <CardTitle>추출 템플릿</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {extractionTemplates.map((template) => (
                  <div key={template.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{template.name}</h4>
                      <Button variant="outline" size="sm">
                        선택
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {template.fields.map((field, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Processing Status */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  처리 현황
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(file.status)}
                        <span className="font-medium text-sm">{file.name}</span>
                      </div>
                      {getStatusBadge(file.status)}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span>{file.size}</span>
                      {file.status === "processing" && <span>{file.progress}% 완료</span>}
                    </div>

                    {file.status === "processing" && <Progress value={file.progress} className="mb-3" />}

                    {file.status === "completed" && file.extractedData && (
                      <div className="bg-gray-50 rounded p-3 mb-3">
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <span className="text-gray-500">추출 항목:</span>
                            <div className="font-medium">{file.extractedData.items}개</div>
                          </div>
                          <div>
                            <span className="text-gray-500">HS코드:</span>
                            <div className="font-medium">{file.extractedData.hsCode}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">총 금액:</span>
                            <div className="font-medium">{file.extractedData.totalValue}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {file.status === "completed" && (
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="w-3 h-3 mr-1" />
                          Excel 다운로드
                        </Button>
                        <Button size="sm" variant="ghost">
                          미리보기
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>처리 통계</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">24</div>
                    <div className="text-sm text-gray-600">이번 달 처리</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">98%</div>
                    <div className="text-sm text-gray-600">정확도</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
