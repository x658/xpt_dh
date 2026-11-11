import { Button } from "@/components/ui/button";
import { Link as I18nLink } from "@/i18n/routing";
import { BookOpen, Cpu, Lock, ShieldCheck, Terminal, Wrench } from "lucide-react";

interface HeroProps {
  locale?: string;
}

export default function Hero({ locale = "en" }: HeroProps) {
  const isZh = locale === "zh";
  const isJa = locale === "ja";

  const badgeText = isZh
    ? "100% 浏览器本地沙箱运算 · 零服务端数据上传"
    : isJa
    ? "100% ブラウザ内ローカル実行 · ゼロ知識プライバシー設計"
    : "100% Browser Sandbox Execution · Zero Server Telemetry";

  const titlePrefix = isZh
    ? "隐私优先的"
    : isJa
    ? "プライバシー最優先の"
    : "Privacy-First ";

  const titleHighlight = isZh
    ? "开发者工具箱"
    : isJa
    ? "開発者ツール"
    : "Developer Utilities";

  const titleSuffix = isZh
    ? "与云原生架构专栏"
    : isJa
    ? "＆クラウド技術ハブ"
    : " & Cloud Architecture Hub";

  const subtitle = isZh
    ? "基于原生 Web Cryptography API 构建的纯前端高频开发工具套件（JSON 校验、Base64 流转码、UUID v4、SHA-256/512 哈希、高熵密钥生成），以及经过生产环境实战检验的云原生架构深度指南。"
    : isJa
    ? "Web Cryptography API を活用したクライアント完結型の開発者ユーティリティ（JSON 整形、Base64、UUID v4、SHA-256/512、暗号鍵生成）と、本番環境で検証されたクラウドアーキテクチャ解説を提供します。"
    : "Client-side cryptographic utilities, RFC-compliant formatters, and battle-tested cloud engineering guides—engineered for full-stack developers who demand speed and zero-knowledge privacy.";

  const primaryCta = isZh
    ? "打开开发者工具箱"
    : isJa
    ? "開発ツールを開く"
    : "Launch Developer Toolkit";

  const secondaryCta = isZh
    ? "阅读深度技术专栏"
    : isJa
    ? "技術ガイドを読む"
    : "Explore Technical Guides";

  const stats = [
    {
      icon: ShieldCheck,
      label: isZh ? "零数据离机" : isJa ? "ローカル完結" : "Zero Data Uploads",
    },
    {
      icon: Terminal,
      label: isZh ? "Web Crypto 原生加速" : isJa ? "Web Crypto ネイティブ" : "Web Crypto API",
    },
    {
      icon: Cpu,
      label: isZh ? "15+ 生产级架构指南" : isJa ? "15+ 本番設計ガイド" : "15+ Production Guides",
    },
    {
      icon: Lock,
      label: isZh ? "开源标准 · 永久免费" : isJa ? "完全無料・登録不要" : "Free & No Sign-up",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60 mb-8">
        <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <span>{badgeText}</span>
      </div>

      <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl dark:text-gray-100 leading-tight">
        {titlePrefix}
        <span className="relative whitespace-nowrap text-blue-600 dark:text-blue-400">
          <span className="relative">{titleHighlight}</span>
        </span>
        {titleSuffix}
      </h1>

      <p className="mx-auto mt-6 max-w-3xl text-lg sm:text-xl leading-relaxed text-slate-600 dark:text-slate-400">
        {subtitle}
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          className="h-12 w-full sm:w-fit rounded-xl px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm"
          asChild
        >
          <I18nLink
            href="/tools"
            title={primaryCta}
            className="flex items-center gap-2"
          >
            <Wrench className="w-4 h-4" />
            {primaryCta}
          </I18nLink>
        </Button>
        <Button
          className="h-12 w-full sm:w-fit rounded-xl px-8 py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 font-semibold"
          variant="outline"
          asChild
        >
          <I18nLink
            href="/blog"
            title={secondaryCta}
            className="flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            {secondaryCta}
          </I18nLink>
        </Button>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200/60 dark:border-slate-800/80 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400"
            >
              <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
