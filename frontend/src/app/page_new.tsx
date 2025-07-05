"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, CheckCircle, XCircle, FileText, Settings, Zap, Target, Search, Share2, MapPin, DollarSign, Clock, Wrench, List, Calendar, BarChart, Tags, Save, Send } from "lucide-react"

export default function SEOArticleGenerator() {
  const [activeTab, setActiveTab] = useState("keyword-settings")
  const [topic, setTopic] = useState("")
  const [keywords, setKeywords] = useState("")
  const [article, setArticle] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">SEO記事自動生成ツール</h1>
        </div>
      </div>

      {/* サイドバー（縦タブ） */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex pt-20 w-full">
        <TabsList className="flex flex-col w-64 p-4 bg-white shadow-sm border-r border-gray-200 gap-1 fixed left-0 top-20 bottom-0 overflow-y-auto">
          <TabsTrigger
            value="keyword-settings"
            className="w-full justify-start px-4 py-3 text-sm font-medium rounded-lg bg-gray-50 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 data-[state=active]:border-l-4 data-[state=active]:border-blue-600 transition-all duration-200"
          >
            キーワード設定
          </TabsTrigger>
          <TabsTrigger
            value="outline"
            className="w-full justify-start px-4 py-3 text-sm font-medium rounded-lg bg-gray-50 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 data-[state=active]:border-l-4 data-[state=active]:border-blue-600 transition-all duration-200"
          >
            構成提案
          </TabsTrigger>
          <TabsTrigger
            value="template-settings"
            className="w-full justify-start px-4 py-3 text-sm font-medium rounded-lg bg-gray-50 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 data-[state=active]:border-l-4 data-[state=active]:border-blue-600 transition-all duration-200"
          >
            テンプレート設定
          </TabsTrigger>
          <TabsTrigger
            value="article-generation"
            className="w-full justify-start px-4 py-3 text-sm font-medium rounded-lg bg-gray-50 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 data-[state=active]:border-l-4 data-[state=active]:border-blue-600 transition-all duration-200"
          >
            記事生成
          </TabsTrigger>
          <TabsTrigger
            value="article-preview-edit"
            className="w-full justify-start px-4 py-3 text-sm font-medium rounded-lg bg-gray-50 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 data-[state=active]:border-l-4 data-[state=active]:border-blue-600 transition-all duration-200"
          >
            記事確認・編集
          </TabsTrigger>
          <TabsTrigger
            value="seo-check"
            className="w-full justify-start px-4 py-3 text-sm font-medium rounded-lg bg-gray-50 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 data-[state=active]:border-l-4 data-[state=active]:border-blue-600 transition-all duration-200"
          >
            SEOチェック
          </TabsTrigger>
          <TabsTrigger
            value="external-post"
            className="w-full justify-start px-4 py-3 text-sm font-medium rounded-lg bg-gray-50 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 data-[state=active]:border-l-4 data-[state=active]:border-blue-600 transition-all duration-200"
          >
            外部投稿
          </TabsTrigger>
          <TabsTrigger
            value="sns-post"
            className="w-full justify-start px-4 py-3 text-sm font-medium rounded-lg bg-gray-50 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 data-[state=active]:border-l-4 data-[state=active]:border-blue-600 transition-all duration-200"
          >
            SNS投稿
          </TabsTrigger>
          <TabsTrigger
            value="meo-post"
            className="w-full justify-start px-4 py-3 text-sm font-medium rounded-lg bg-gray-50 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 data-[state=active]:border-l-4 data-[state=active]:border-blue-600 transition-all duration-200"
          >
            MEO投稿
          </TabsTrigger>
          <TabsTrigger
            value="summary-highlight-generation"
            className="w-full justify-start px-4 py-3 text-sm font-medium rounded-lg bg-gray-50 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 data-[state=active]:border-l-4 data-[state=active]:border-blue-600 transition-all duration-200"
          >
            記事要約
          </TabsTrigger>
          <TabsTrigger
            value="article-list"
            className="w-full justify-start px-4 py-3 text-sm font-medium rounded-lg bg-gray-50 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 data-[state=active]:border-l-4 data-[state=active]:border-blue-600 transition-all duration-200"
          >
            記事一覧
          </TabsTrigger>
          <TabsTrigger
            value="publish-schedule"
            className="w-full justify-start px-4 py-3 text-sm font-medium rounded-lg bg-gray-50 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 data-[state=active]:border-l-4 data-[state=active]:border-blue-600 transition-all duration-200"
          >
            投稿スケジュール
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="w-full justify-start px-4 py-3 text-sm font-medium rounded-lg bg-gray-50 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 data-[state=active]:border-l-4 data-[state=active]:border-blue-600 transition-all duration-200"
          >
            分析・改善
          </TabsTrigger>
          <TabsTrigger
            value="tag-management"
            className="w-full justify-start px-4 py-3 text-sm font-medium rounded-lg bg-gray-50 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 data-[state=active]:border-l-4 data-[state=active]:border-blue-600 transition-all duration-200"
          >
            タグ管理
          </TabsTrigger>
          <TabsTrigger
            value="backup-restore"
            className="w-full justify-start px-4 py-3 text-sm font-medium rounded-lg bg-gray-50 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 data-[state=active]:border-l-4 data-[state=active]:border-blue-600 transition-all duration-200"
          >
            バックアップ
          </TabsTrigger>
          <TabsTrigger
            value="affiliate-settings"
            className="w-full justify-start px-4 py-3 text-sm font-medium rounded-lg bg-gray-50 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 data-[state=active]:border-l-4 data-[state=active]:border-blue-600 transition-all duration-200"
          >
            アフィリエイト設定
          </TabsTrigger>
          <TabsTrigger
            value="schedule"
            className="w-full justify-start px-4 py-3 text-sm font-medium rounded-lg bg-gray-50 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 data-[state=active]:border-l-4 data-[state=active]:border-blue-600 transition-all duration-200"
          >
            スケジュール
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="w-full justify-start px-4 py-3 text-sm font-medium rounded-lg bg-gray-50 hover:bg-blue-50 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 data-[state=active]:border-l-4 data-[state=active]:border-blue-600 transition-all duration-200"
          >
            設定
          </TabsTrigger>
        </TabsList>

        {/* コンテンツエリア */}
        <div className="flex-1 ml-64 p-6 overflow-y-auto">
          {/* キーワード設定タブ */}
          <TabsContent value="keyword-settings">
            <Card className="shadow-sm bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">キーワード設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="main-keywords" className="text-sm font-medium text-gray-700">メインキーワード</Label>
                  <Input
                    id="main-keywords"
                    placeholder="例: SEO, 記事作成, AI"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="related-keywords" className="text-sm font-medium text-gray-700">関連キーワード</Label>
                  <Textarea
                    id="related-keywords"
                    placeholder="例: コンテンツマーケティング, 検索エンジン最適化, ブログ運営"
                    rows={3}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-200 resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-audience" className="text-sm font-medium text-gray-700">ターゲット読者</Label>
                  <Input
                    id="target-audience"
                    placeholder="例: 初心者ブロガー, マーケティング担当者"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                  キーワード設定を保存
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 構成提案タブ */}
          <TabsContent value="outline">
            <Card className="shadow-sm bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">構成提案</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="outline-topic" className="text-sm font-medium text-gray-700">記事のトピック</Label>
                  <Textarea
                    id="outline-topic"
                    placeholder="例: AIを活用したコンテンツマーケティングの未来について"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    rows={3}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-200 resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">記事の長さ</Label>
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="outline" size="sm" className="border-gray-300 hover:border-blue-500 hover:bg-blue-50">
                      短文 (1000文字)
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300 hover:border-blue-500 hover:bg-blue-50">
                      標準 (2000文字)
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300 hover:border-blue-500 hover:bg-blue-50">
                      長文 (3000文字以上)
                    </Button>
                  </div>
                </div>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      構成を生成中...
                    </>
                  ) : (
                    <>
                      構成を提案する
                    </>
                  )}
                </Button>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-base mb-2 text-gray-800">提案された構成</h3>
                  <div className="text-sm text-gray-600 bg-white p-3 rounded border">
                    <p>構成が生成されるとここに表示されます</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* その他のタブ */}
          <TabsContent value="template-settings">
            <Card className="shadow-sm bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">テンプレート設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>テンプレート設定機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="article-generation">
            <Card className="shadow-sm bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">記事生成</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>記事生成機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="article-preview-edit">
            <Card className="shadow-sm bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">記事確認・編集</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>記事の確認・編集機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo-check">
            <Card className="shadow-sm bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">SEOチェック</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>SEOチェック機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="external-post">
            <Card className="shadow-sm bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">外部投稿</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>外部投稿機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sns-post">
            <Card className="shadow-sm bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">SNS投稿</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>SNS投稿機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="meo-post">
            <Card className="shadow-sm bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">MEO投稿</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>MEO投稿機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary-highlight-generation">
            <Card className="shadow-sm bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">記事要約</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>記事要約機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="article-list">
            <Card className="shadow-sm bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">記事一覧</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>記事一覧機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publish-schedule">
            <Card className="shadow-sm bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">投稿スケジュール</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>投稿スケジュール機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="shadow-sm bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">分析・改善</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>分析・改善機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tag-management">
            <Card className="shadow-sm bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">タグ管理</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>タグ管理機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backup-restore">
            <Card className="shadow-sm bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">バックアップ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>バックアップ機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="affiliate-settings">
            <Card className="shadow-sm bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">アフィリエイト設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>アフィリエイト設定機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card className="shadow-sm bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">スケジュール</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>スケジュール機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="shadow-sm bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>設定機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
