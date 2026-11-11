import { HelpCircle } from "lucide-react";
import React from "react";

interface FAQSectionProps {
  locale: string;
}

export default function FAQSection({ locale }: FAQSectionProps) {
  const isZh = locale === "zh";
  const isJa = locale === "ja";

  const faqs = [
    {
      q: isZh
        ? "XPT Dev 提供的工具是否完全免费？会收集用户的输入数据吗？"
        : isJa
        ? "XPT Dev のツールは完全無料ですか？入力データは収集されますか？"
        : "Are XPT Dev utilities completely free? Is user input data collected?",
      a: isZh
        ? "是的，所有基础与高阶工具均对个人与商业用户完全免费开放。我们严格践行「零知识隐私」原则，所有文本格式化、UUID 生成、密码哈希计算均在用户的本地浏览器（Web Cryptography API）中执行，绝不记录、上传或向第三方泄露任何数据。"
        : isJa
        ? "はい、すべてのツールは完全無料で提供されています。プライバシー保護を最重要視しており、暗号化やフォーマット処理はすべて端末のブラウザ内で完結し、サーバーに保存されることはありません。"
        : "Yes, all utilities are 100% free for personal and commercial usage. We adhere strictly to zero-knowledge privacy: all hashing, JSON formatting, and key derivations execute directly inside your browser sandbox.",
    },
    {
      q: isZh
        ? "技术博客中的代码和部署架构是否可以直接用于生产环境？"
        : isJa
        ? "技術ブログで紹介されているアーキテクチャやコードは本番で使えますか？"
        : "Are the architectures and code snippets published in the blog production-ready?",
      a: isZh
        ? "是的。XPT Dev 发布的每一篇技术指南（包括 Docker 容器化编排、Cloudflare D1 数据库、Webhook HMAC 验签、PostgreSQL 优化等）均基于真实生产项目的脱敏实战提炼，包含完整的异常处理、安全防范与环境配置规范。"
        : isJa
        ? "はい。紹介しているガイドやコードは、実務プロジェクトで検証されたパターンに基づき、セキュリティ対策や例外処理を網羅した本番対応の設計です。"
        : "Yes. Every technical guide (Docker Compose configurations, Cloudflare D1 architectures, HMAC security, PostgreSQL tuning) is distilled from verified production deployments with comprehensive error handling.",
    },
    {
      q: isZh
        ? "为什么推荐使用浏览器端 Web Cryptography API 处理开发数据？"
        : isJa
        ? "なぜブラウザ内の Web Cryptography API でデータを処理するのですか？"
        : "Why process developer payloads in-browser with the Web Cryptography API?",
      a: isZh
        ? "许多传统的在线格式化或编码工具会将用户的 JSON 载荷、JWT 令牌或密钥发送到后端服务器，存在严重的日志留存与凭证泄露风险。XPT Dev 借助现代浏览器底层的原生 Web Crypto 硬件加速接口，在不发生任何网络请求的前提下完成运算。"
        : isJa
        ? "従来のオンラインツールは JSON や API キーをサーバーへ送信するため情報漏洩リスクがありました。XPT Dev はブラウザ標準の Web Crypto API を用いてネットワーク通信なしで高速・安全に処理します。"
        : "Many legacy online formatters transmit your JSON payloads, JWTs, or secret keys to remote backend servers, creating credential leakage risks. XPT Dev executes all operations locally via hardware-accelerated Web Crypto APIs with zero network requests.",
    },
    {
      q: isZh
        ? "如何联系 XPT Dev 技术团队反馈问题或探讨技术合作？"
        : isJa
        ? "XPT Dev チームへのフィードバックや技術的なお問い合わせ方法は？"
        : "How can I contact the XPT Dev engineering team for feedback or inquiries?",
      a: isZh
        ? "如果您在使用开发者工具时遇到任何问题、发现文章中的勘误，或希望进行技术交流，欢迎随时发送邮件至 admin@xptdev.com，我们的工程团队通常会在 1~2 个工作日内回复。"
        : isJa
        ? "ツールの不具合報告、技術記事に関するご質問、その他のご提案については、admin@xptdev.com までメールでお気軽にご連絡ください。通常 1〜2 営業日以内に回答いたします。"
        : "If you encounter a bug in our utilities, spot an erratum in an architectural guide, or wish to discuss engineering collaborations, please email us at admin@xptdev.com.",
    },
  ];

  // Schema.org FAQPage structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200/60 dark:border-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{isZh ? "高频答疑" : isJa ? "よくある質問" : "Knowledge Base"}</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-gray-100 sm:text-4xl">
          {isZh ? "常见问题与技术支持 (FAQ)" : isJa ? "よくあるご質問とサポート (FAQ)" : "Frequently Asked Questions (FAQ)"}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {isZh
            ? "关于平台隐私保护机制、技术架构实现与商业使用许可的透明解答。"
            : isJa
            ? "プライバシー保護方針、技術仕様、ライセンスに関する明確な回答。"
            : "Clear insights regarding our privacy architecture, technical standards, and usage licensing."}
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 hover:border-blue-500/40 transition-colors"
          >
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-mono">Q:</span>
              <span>{faq.q}</span>
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
