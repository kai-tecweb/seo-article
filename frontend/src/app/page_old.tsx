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
          <p className="text-sm text-gray-600">AIを活用したSEO記事の自動生成・投稿ツール</p>
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

          {/* テンプレート設定タブ */}
          {/* その他のタブは簡素化されたバージョン */}
          <TabsContent value="template-settings">
            <Card className="shadow-lg bg-white border border-gray-200 rounded-xl">
              <CardHeader className="p-6 bg-purple-50 border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-center text-gray-800">テンプレート設定</CardTitle>
                <CardDescription className="text-center text-gray-600 mt-2">記事の冒頭文、CTA、締め文をカスタマイズできます</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>テンプレート設定機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="article-generation">
            <Card className="shadow-lg bg-white border border-gray-200 rounded-xl">
              <CardHeader className="p-6 bg-orange-50 border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-center text-gray-800">記事生成</CardTitle>
                <CardDescription className="text-center text-gray-600 mt-2">設定したキーワードとトピックから記事を自動生成します</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>記事生成機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="article-preview-edit">
            <Card className="shadow-lg bg-white border border-gray-200 rounded-xl">
              <CardHeader className="p-6 bg-teal-50 border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-center text-gray-800">記事確認・編集</CardTitle>
                <CardDescription className="text-center text-gray-600 mt-2">生成された記事を確認し、必要に応じて編集できます</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>記事の確認・編集機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo-check">
            <Card className="shadow-lg bg-white border border-gray-200 rounded-xl">
              <CardHeader className="p-6 bg-emerald-50 border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-center text-gray-800">SEOチェック</CardTitle>
                <CardDescription className="text-center text-gray-600 mt-2">記事のSEO最適化をチェックし、改善提案を行います</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>SEOチェック機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="external-post">
            <Card className="shadow-lg bg-white border border-gray-200 rounded-xl">
              <CardHeader className="p-6 bg-indigo-50 border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-center text-gray-800">外部サービス投稿</CardTitle>
                <CardDescription className="text-center text-gray-600 mt-2">note、はてなブログ、WordPressなどに投稿できます</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>外部サービス投稿機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sns-post">
            <Card className="shadow-lg bg-white border border-gray-200 rounded-xl">
              <CardHeader className="p-6 bg-sky-50 border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-center text-gray-800">SNS投稿</CardTitle>
                <CardDescription className="text-center text-gray-600 mt-2">X(Twitter)、Facebook、LinkedInなどに投稿できます</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>SNS投稿機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="meo-post">
            <Card className="shadow-lg bg-white border border-gray-200 rounded-xl">
              <CardHeader className="p-6 bg-amber-50 border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-center text-gray-800">MEO投稿</CardTitle>
                <CardDescription className="text-center text-gray-600 mt-2">Googleビジネスプロフィールに投稿できます</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>MEO投稿機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary-highlight-generation">
            <Card className="shadow-lg bg-white border border-gray-200 rounded-xl">
              <CardHeader className="p-6 bg-pink-50 border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-center text-gray-800">記事要約</CardTitle>
                <CardDescription className="text-center text-gray-600 mt-2">記事の要約とSNSハイライトを自動生成します</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>記事要約機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="article-list">
            <Card className="shadow-lg bg-white border border-gray-200 rounded-xl">
              <CardHeader className="p-6 bg-blue-50 border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-center text-gray-800">記事一覧</CardTitle>
                <CardDescription className="text-center text-gray-600 mt-2">作成した記事の一覧表示と管理</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>記事一覧機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publish-schedule">
            <Card className="shadow-lg bg-white border border-gray-200 rounded-xl">
              <CardHeader className="p-6 bg-purple-50 border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-center text-gray-800">投稿スケジュール</CardTitle>
                <CardDescription className="text-center text-gray-600 mt-2">記事の投稿予定を管理</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>投稿スケジュール機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="shadow-lg bg-white border border-gray-200 rounded-xl">
              <CardHeader className="p-6 bg-teal-50 border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-center text-gray-800">分析・改善</CardTitle>
                <CardDescription className="text-center text-gray-600 mt-2">記事のパフォーマンス分析と改善提案</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>分析・改善機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tag-management">
            <Card className="shadow-lg bg-white border border-gray-200 rounded-xl">
              <CardHeader className="p-6 bg-orange-50 border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-center text-gray-800">タグ管理</CardTitle>
                <CardDescription className="text-center text-gray-600 mt-2">記事のタグ分類と管理</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>タグ管理機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backup-restore">
            <Card className="shadow-lg bg-white border border-gray-200 rounded-xl">
              <CardHeader className="p-6 bg-emerald-50 border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-center text-gray-800">バックアップ</CardTitle>
                <CardDescription className="text-center text-gray-600 mt-2">記事データのバックアップと復元</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>バックアップ機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="affiliate-settings">
            <Card className="shadow-lg bg-white border border-gray-200 rounded-xl">
              <CardHeader className="p-6 bg-green-50 border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-center text-gray-800">アフィリエイト設定</CardTitle>
                <CardDescription className="text-center text-gray-600 mt-2">アフィリエイトリンクやタグを設定できます</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>アフィリエイト設定機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card className="shadow-lg bg-white border border-gray-200 rounded-xl">
              <CardHeader className="p-6 bg-violet-50 border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-center text-gray-800">スケジュール</CardTitle>
                <CardDescription className="text-center text-gray-600 mt-2">記事の自動生成・投稿スケジュールを設定できます</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>スケジュール機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="shadow-lg bg-white border border-gray-200 rounded-xl">
              <CardHeader className="p-6 bg-slate-50 border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-center text-gray-800">設定</CardTitle>
                <CardDescription className="text-center text-gray-600 mt-2">API連携やその他の設定を管理できます</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center text-gray-600 bg-gray-50 p-6 rounded-lg">
                  <p>設定機能がここに表示されます</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <Card className="shadow-xl bg-white border-2 border-gray-100 rounded-2xl overflow-hidden">
            <CardHeader className="p-8 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-gray-100">
              <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3 text-gray-800">
                <div className="p-2 bg-purple-500 text-white rounded-xl">
                  <Settings className="w-6 h-6" />
                </div>
                テンプレート設定
              </CardTitle>
              <CardDescription className="text-center text-gray-600 text-lg mt-2">
                記事の冒頭文、CTA、締め文をカスタマイズできます
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-3">
                <Label htmlFor="intro-text" className="text-base font-semibold text-gray-700">冒頭文（リード文）</Label>
                <Textarea
                  id="intro-text"
                  placeholder="【この記事のポイント】&#10;AI時代を生き抜くための情報をお届けします。"
                  rows={3}
                  className="text-base p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="cta-text" className="text-base font-semibold text-gray-700">CTA（コールトゥアクション）</Label>
                <Textarea
                  id="cta-text"
                  placeholder="▼今すぐチェック！無料AI活用ガイドはこちら → https://example.com/download"
                  rows={3}
                  className="text-base p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="outro-text" className="text-base font-semibold text-gray-700">締め文</Label>
                <Textarea
                  id="outro-text"
                  placeholder="最後まで読んでいただきありがとうございました。ぜひシェアやコメントもお願いします！"
                  rows={3}
                  className="text-base p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
                />
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105" size="lg">
                <CheckCircle className="w-5 h-5 mr-2" />
                テンプレート設定を保存
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 記事生成タブ */}
        <TabsContent value="article-generation" className="mt-6">
          <Card className="shadow-xl bg-white border-2 border-gray-100 rounded-2xl overflow-hidden">
            <CardHeader className="p-8 bg-gradient-to-r from-orange-50 to-red-50 border-b border-gray-100">
              <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3 text-gray-800">
                <div className="p-2 bg-orange-500 text-white rounded-xl">
                  <Zap className="w-6 h-6" />
                </div>
                記事生成
              </CardTitle>
              <CardDescription className="text-center text-gray-600 text-lg mt-2">
                設定したキーワードとトピックから記事を自動生成します
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-3">
                <Label htmlFor="generation-topic" className="text-base font-semibold text-gray-700">記事のトピック</Label>
                <Textarea
                  id="generation-topic"
                  placeholder="例: AIを活用したSEO対策の最新手法"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  rows={4}
                  className="text-base p-4 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all resize-none"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold text-gray-700">記事オプション</Label>
                <div className="flex gap-3 flex-wrap">
                  <Button variant="outline" size="sm" className="border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all">
                    <FileText className="w-4 h-4 mr-2" />
                    画像を含める
                  </Button>
                  <Button variant="outline" size="sm" className="border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all">
                    <Target className="w-4 h-4 mr-2" />
                    内部リンク追加
                  </Button>
                  <Button variant="outline" size="sm" className="border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all">
                    <Share2 className="w-4 h-4 mr-2" />
                    外部リンク追加
                  </Button>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                size="lg"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    記事を生成中...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    記事を生成する
                  </>
                )}
              </Button>

              {/* 生成された記事の表示エリア */}
              <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
                <h3 className="font-semibold text-lg mb-3 text-gray-800 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-600" />
                  生成された記事
                </h3>
                <div className="text-sm text-gray-600 bg-white p-4 rounded-lg">
                  <p>記事が生成されるとここに表示されます</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* その他のタブ */}
        <TabsContent value="article-preview-edit" className="mt-6">
          <Card className="shadow-xl bg-white border-2 border-gray-100 rounded-2xl overflow-hidden">
            <CardHeader className="p-8 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-gray-100">
              <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3 text-gray-800">
                <div className="p-2 bg-teal-500 text-white rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                記事確認・編集
              </CardTitle>
              <CardDescription className="text-center text-gray-600 text-lg mt-2">
                生成された記事を確認し、必要に応じて編集できます
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl">
                <p className="text-lg">記事の確認・編集機能がここに表示されます</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary-highlight-generation" className="mt-6">
          <Card className="shadow-xl bg-white border-2 border-gray-100 rounded-2xl overflow-hidden">
            <CardHeader className="p-8 bg-gradient-to-r from-pink-50 to-rose-50 border-b border-gray-100">
              <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3 text-gray-800">
                <div className="p-2 bg-pink-500 text-white rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                記事要約
              </CardTitle>
              <CardDescription className="text-center text-gray-600 text-lg mt-2">
                記事の要約とSNSハイライトを自動生成します
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl">
                <p className="text-lg">記事要約機能がここに表示されます</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo-check" className="mt-6">
          <Card className="shadow-xl bg-white border-2 border-gray-100 rounded-2xl overflow-hidden">
            <CardHeader className="p-8 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-gray-100">
              <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3 text-gray-800">
                <div className="p-2 bg-emerald-500 text-white rounded-xl">
                  <Search className="w-6 h-6" />
                </div>
                SEOチェック
              </CardTitle>
              <CardDescription className="text-center text-gray-600 text-lg mt-2">
                記事のSEO最適化をチェックし、改善提案を行います
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl">
                <p className="text-lg">SEOチェック機能がここに表示されます</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="external-post" className="mt-6">
          <Card className="shadow-xl bg-white border-2 border-gray-100 rounded-2xl overflow-hidden">
            <CardHeader className="p-8 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-100">
              <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3 text-gray-800">
                <div className="p-2 bg-indigo-500 text-white rounded-xl">
                  <Share2 className="w-6 h-6" />
                </div>
                外部サービス投稿
              </CardTitle>
              <CardDescription className="text-center text-gray-600 text-lg mt-2">
                note、はてなブログ、WordPressなどに投稿できます
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl">
                <p className="text-lg">外部サービス投稿機能がここに表示されます</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sns-post" className="mt-6">
          <Card className="shadow-xl bg-white border-2 border-gray-100 rounded-2xl overflow-hidden">
            <CardHeader className="p-8 bg-gradient-to-r from-sky-50 to-blue-50 border-b border-gray-100">
              <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3 text-gray-800">
                <div className="p-2 bg-sky-500 text-white rounded-xl">
                  <Share2 className="w-6 h-6" />
                </div>
                SNS投稿
              </CardTitle>
              <CardDescription className="text-center text-gray-600 text-lg mt-2">
                X(Twitter)、Facebook、LinkedInなどに投稿できます
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl">
                <p className="text-lg">SNS投稿機能がここに表示されます</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meo-post" className="mt-6">
          <Card className="shadow-xl bg-white border-2 border-gray-100 rounded-2xl overflow-hidden">
            <CardHeader className="p-8 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-gray-100">
              <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3 text-gray-800">
                <div className="p-2 bg-amber-500 text-white rounded-xl">
                  <MapPin className="w-6 h-6" />
                </div>
                MEO投稿
              </CardTitle>
              <CardDescription className="text-center text-gray-600 text-lg mt-2">
                Googleビジネスプロフィールに投稿できます
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl">
                <p className="text-lg">MEO投稿機能がここに表示されます</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="affiliate-settings" className="mt-6">
          <Card className="shadow-xl bg-white border-2 border-gray-100 rounded-2xl overflow-hidden">
            <CardHeader className="p-8 bg-gradient-to-r from-green-50 to-teal-50 border-b border-gray-100">
              <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3 text-gray-800">
                <div className="p-2 bg-green-500 text-white rounded-xl">
                  <DollarSign className="w-6 h-6" />
                </div>
                アフィリエイト設定
              </CardTitle>
              <CardDescription className="text-center text-gray-600 text-lg mt-2">
                アフィリエイトリンクやタグを設定できます
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl">
                <p className="text-lg">アフィリエイト設定機能がここに表示されます</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="mt-6">
          <Card className="shadow-xl bg-white border-2 border-gray-100 rounded-2xl overflow-hidden">
            <CardHeader className="p-8 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-gray-100">
              <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3 text-gray-800">
                <div className="p-2 bg-violet-500 text-white rounded-xl">
                  <Clock className="w-6 h-6" />
                </div>
                スケジュール
              </CardTitle>
              <CardDescription className="text-center text-gray-600 text-lg mt-2">
                記事の自動生成・投稿スケジュールを設定できます
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl">
                <p className="text-lg">スケジュール機能がここに表示されます</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card className="shadow-xl bg-white border-2 border-gray-100 rounded-2xl overflow-hidden">
            <CardHeader className="p-8 bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100">
              <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3 text-gray-800">
                <div className="p-2 bg-slate-500 text-white rounded-xl">
                  <Wrench className="w-6 h-6" />
                </div>
                設定
              </CardTitle>
              <CardDescription className="text-center text-gray-600 text-lg mt-2">
                API連携やその他の設定を管理できます
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl">
                <p className="text-lg">設定機能がここに表示されます</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
    </div>
      </Tabs >
    </div >
  )
}
