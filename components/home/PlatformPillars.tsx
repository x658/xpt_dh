import { Code2, Cpu, Globe2, ShieldCheck } from "lucide-react";
import React from "react";

interface PlatformPillarsProps {
  locale: string;
}

export default function PlatformPillars({ locale }: PlatformPillarsProps) {
  const isZh = locale === "zh";
  const isJa = locale === "ja";

  const pillars = [
    {
      icon: ShieldCheck,
      title: isZh ? "100% 客户端隐私零泄漏" : isJa ? "100% クライアント完結プライバシー" : "Zero-Knowledge Local Privacy",
      desc: isZh
        ? "所有加解密、JSON 格式化与哈希运算均在浏览器内存沙箱中执行，杜绝敏感密钥与业务数据网络上传。"
        : isJa
        ? "暗号化、ハッシュ、JSON 処理はすべてブラウザのローカルメモリ内で実行され、外部送信されません。"
        : "All cryptography, JSON formatting, and hash derivations run strictly in-memory client-side. Zero telemetry.",
      tag: isZh ? "Web Cryptography API" : isJa ? "Web Cryptography API" : "Web Crypto API",
    },
    {
      icon: Cpu,
      title: isZh ? "Edge 边缘原生极速响应" : isJa ? "エッジネイティブ超高速応答" : "Edge-Native Performance",
      desc: isZh
        ? "基于 Cloudflare 与 Vercel 全球边缘网络多区域节点分发，静态资源与轻量计算实现全球 50ms 级极速触达。"
        : isJa
        ? "Cloudflare と Vercel のグローバルエッジネットワークにより、世界中どこからでも 50ms 未満の爆速レスポンス。"
        : "Distributed across Cloudflare and Vercel global edge nodes ensuring sub-50ms TTFB worldwide.",
      tag: "Sub-50ms TTFB",
    },
    {
      icon: Code2,
      title: isZh ? "生产级实战工程架构" : isJa ? "実戦的プロダクション設計" : "Production-Grade Engineering",
      desc: isZh
        ? "提供经过高并发检验的 Docker 部署、PostgreSQL 索引优化、Webhook 防重放与现代全栈模板蓝图。"
        : isJa
        ? "本番運用で検証された Docker、PostgreSQL、Webhook、Next.js 全スタックの設計パターンを提供。"
        : "Battle-tested blueprints covering containerization, PostgreSQL query tuning, HMAC webhooks, and App Router.",
      tag: isZh ? "实战蓝图" : isJa ? "検証済み" : "Battle-Tested",
    },
    {
      icon: Globe2,
      title: isZh ? "多语种国际化支持" : isJa ? "完全多言語グローバル展開" : "Multilingual Global Reach",
      desc: isZh
        ? "原生支持中、英、日三语无缝切换与本地化 SEO 优化，助推独立开发者与工程团队高效触达全球受众。"
        : isJa
        ? "日本語・英語・中国語にネイティブ対応し、グローバル SEO に最適化された情報発信をサポート。"
        : "Seamless multilingual support across English, Chinese, and Japanese with hreflang SEO optimization.",
      tag: "i18n Ready",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200/60 dark:border-slate-800">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-gray-100 sm:text-4xl">
          {isZh ? "为什么选择 XPT Dev 开发者平台" : isJa ? "XPT Dev がエンジニアに選ばれる理由" : "Why Developers Build with XPT Dev"}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {isZh
            ? "融合极客实用主义与云原生安全理念，为现代工程师提供开箱即用的高价值工具与深度实战专栏。"
            : isJa
            ? "実践主義とクラウドネイティブのセキュリティを融合し、エンジニアに必要な高機能ツールと詳細な解説を提供します。"
            : "Combining developer pragmatism with cloud-native security principles to empower modern software creators."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between hover:shadow-lg hover:border-blue-500/50 transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {pillar.desc}
                </p>
              </div>
              <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 self-start">
                {pillar.tag}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
