import { FileText, Calendar, Search, Globe } from 'lucide-react'

// 报告数据接口
interface ReportData {
  title: string
  subtitle: string
  date: string
  findingsCount: number
  sources: number
  period: string
  sections: Section[]
}

interface Section {
  id: string
  title: string
  content: string
  findings?: Finding[]
}

interface Finding {
  number: string
  title: string
  description: string
}

// 示例数据
const sampleReport: ReportData = {
  title: "香港賽馬會馬場",
  subtitle: "投注體驗調研報告",
  date: "2026年2月27日",
  findingsCount: 12,
  sources: 7,
  period: "近兩年",
  sections: [
    {
      id: "payment",
      title: "支付方式不便",
      content: "內地遊客反映馬場不支持支付寶或微信支付，需要現金或香港銀行賬戶。",
      findings: [
        { number: "01", title: "支付方式受限", description: "馬場櫃檯僅接受現金和八達通，缺乏內地主流行動支付" },
        { number: "02", title: "兌換不便", description: "需要先行兌換港幣，增加遊客不便" },
      ]
    },
    {
      id: "rules",
      title: "投注規則複雜",
      content: "新手不懂規則，缺乏簡易引導，投注單填寫困難。",
      findings: [
        { number: "03", title: "規則説明不足", description: "缺乏針對內地遊客的簡體字規則解説" },
        { number: "04", title: "投注單複雜", description: "投注單選項眾多，新手容易填寫錯誤" },
      ]
    },
    {
      id: "crowd",
      title: "場內人潮擁擠",
      content: "新年等重大賽日排長龍，擠不進投注大堂。",
      findings: [
        { number: "05", title: "高峰時段擁擠", description: "重要賽事日人流量極大，體驗欠佳" },
        { number: "06", title: "排隊時間長", description: "排隊輪候時間可達30分鐘以上" },
      ]
    }
  ]
}

interface ReportProps {
  data?: ReportData
}

export default function Report({ data = sampleReport }: ReportProps) {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <header
        className="relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(175deg, oklch(0.22 0.04 160) 0%, oklch(0.28 0.05 155) 50%, oklch(0.32 0.06 160) 100%)' 
        }}
      >
        {/* Texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-3xl mx-auto px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
          {/* Title */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6"
            style={{ fontFamily: "'Noto Serif TC', serif", color: 'oklch(0.96 0.005 80)' }}
          >
            {data.title}
            <br />
            <span style={{ color: 'oklch(0.82 0.1 80)' }}>{data.subtitle}</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
            style={{ fontFamily: "'Noto Sans TC', sans-serif", color: 'oklch(0.75 0.02 80)' }}
          >
            基於各大中文討論區的用戶真實反饋，聚焦內地遊客在香港馬場的投注體驗痛點，涵蓋支付方式、規則理解、人潮管理及整體體驗等方面。
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs" style={{ color: 'oklch(0.6 0.02 80)' }}>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {data.date}
            </span>
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              {data.findingsCount} 條發現
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              {data.sources} 個來源
            </span>
            <span className="flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" />
              {data.period}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
        {/* Executive Summary */}
        <section className="mb-16">
          <h2 
            className="text-2xl font-bold text-stone-800 mb-6"
            style={{ fontFamily: "'Noto Serif TC', serif" }}
          >
            報告摘要
          </h2>
          <div className="prose prose-stone max-w-none text-stone-600 leading-relaxed space-y-4" style={{ fontFamily: "'Noto Sans TC', sans-serif", fontSize: '0.9375rem' }}>
            <p>
              本報告匯集了來自<strong>知乎、小紅書、香港討論區、Threads、Facebook</strong>等多個中文討論區及新聞平台的用戶真實反饋，聚焦內地遊客在香港賽馬會馬場的投注體驗痛點。
            </p>
            
        {/* Key findings grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose my-6 avoid-break">
              {[
                { num: "01", title: "支付方式不便", desc: "不支持支付寶/微信支付，需現金或香港銀行賬戶" },
                { num: "02", title: "投注規則複雜", desc: "新手不懂規則，缺乏簡易引導，投注單填寫困難" },
                { num: "03", title: "場內人潮擁擠", desc: "新年等重大賽日排長龍，擠不進投注大堂" },
              ].map((item) => (
                <div
                  key={item.num}
                  className="bg-white border-l-4 border-forest p-4 shadow-sm card avoid-break"
                >
                  <div className="text-2xl font-bold text-forest mb-1" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                    {item.num}
                  </div>
                  <div className="font-semibold text-stone-800 mb-1">{item.title}</div>
                  <div className="text-sm text-stone-500">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detail Sections */}
        {data.sections.map((section, idx) => (
          <section key={section.id} className="mb-16 avoid-break">
            <h2 
              className="text-2xl font-bold text-stone-800 mb-4"
              style={{ fontFamily: "'Noto Serif TC', serif" }}
            >
              {idx + 1}. {section.title}
            </h2>
            <p className="text-stone-600 leading-relaxed mb-6" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
              {section.content}
            </p>
            
            {section.findings && (
              <div className="space-y-4">
                {section.findings.map((finding) => (
                  <div
                    key={finding.number}
                    className="bg-white border border-stone-200 p-5 shadow-sm hover:shadow-md transition-shadow card avoid-break"
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="text-xl font-bold text-forest flex-shrink-0"
                        style={{ fontFamily: "'Noto Serif TC', serif" }}
                      >
                        {finding.number}
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-800 mb-1">{finding.title}</h3>
                        <p className="text-sm text-stone-500">{finding.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* Footer */}
        <footer className="pt-8 border-t border-stone-200 text-center text-sm text-stone-400">
          <p>Generated with AI Report Generator</p>
        </footer>
      </main>
    </div>
  )
}
