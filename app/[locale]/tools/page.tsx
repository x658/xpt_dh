import DeveloperTools from "@/components/tools/DeveloperTools";
import { Link as I18nLink, Locale, LOCALES } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import React from "react";

type Params = Promise<{
  locale: string;
}>;

type MetadataProps = {
  params: Params;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh";
  const isJa = locale === "ja";

  const title = isZh
    ? "开发者在线工具箱 - 100% 浏览器本地运算与加密利器"
    : isJa
    ? "開発者向けオンラインツール - 100% ブラウザ完結プライバシー重視"
    : "Developer Online Toolkit - 100% Client-Side Privacy-First Utilities";

  const description = isZh
    ? "免费提供安全高效的开发者工具：JSON 格式化与语法校验、Base64 / URL 编解码、UUID v4 批量生成器、SHA-256 / SHA-512 密码学哈希摘要计算、Unix 时间戳转换与高熵密码生成。数据绝不上云。"
    : isJa
    ? "無料かつプライバシー重視の開発者向けツール：JSON 整形、Base64/URL 変換、UUID v4 生成、SHA-256/512 暗号ハッシュ、Unix タイムスタンプ変換、高強度パスワード生成。完全ローカル処理。"
    : "Privacy-first developer utilities: JSON formatter & validator, Base64 / URL encoder & decoder, RFC 4122 UUID v4 generator, SHA-256 / SHA-512 cryptographic hash calculators, Unix epoch timestamp converter, and high-entropy secret generator.";

  return constructMetadata({
    page: "Tools",
    title,
    description,
    locale: locale as Locale,
    path: `/tools`,
    canonicalUrl: `/tools`,
  });
}

export default async function ToolsPage({ params }: { params: Params }) {
  const { locale } = await params;
  const isZh = locale === "zh";
  const isJa = locale === "ja";

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {isZh ? "开发者核心提效工具箱" : isJa ? "開発者向けコアツール集" : "Developer Utility Suite"}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
          {isZh
            ? "专为全栈工程师与独立开发者设计的纯前端提效工具。所有数据均在您的浏览器本地沙箱中运算，杜绝任何敏感凭证泄漏。"
            : isJa
            ? "フルスタックエンジニアと個人開発者のための高速ツール群。ブラウザ内完結のローカル処理により、機密データの漏洩を防ぎます。"
            : "High-performance client-side utilities engineered for full-stack developers and indie hackers. Zero server transmission guarantees privacy."}
        </p>
      </div>

      {/* Interactive Tool Component */}
      <DeveloperTools locale={locale} />

      {/* Deep Technical Documentation & Code Guides */}
      <div className="mt-16 space-y-12 border-t border-slate-200 dark:border-slate-800 pt-12">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {isZh ? "🛠️ 核心工具技术原理与实现指南" : isJa ? "🛠️ ツール技術仕様と実装ガイド" : "🛠️ Technical Specifications & Implementation"}
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            {isZh
              ? "现代 Web 平台提供了强大的原生 API（如 Web Cryptography API、TextEncoder/Decoder 和 URL API），使开发者无需依赖不受信任的第三方服务器即可完成各类敏感数据处理。"
              : isJa
              ? "最新の Web 標準（Web Cryptography API、TextEncoder/Decoder、URL API）を活用することで、サーバーにデータを送信せずに安全な処理を実現できます。"
              : "Modern browser engines provide native high-performance cryptographic and formatting APIs that allow developers to execute sensitive tasks client-side without relying on untrusted third-party backends."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 not-prose">
            {/* Guide Card 1 */}
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {isZh ? "1. JSON 严格语法校验 (RFC 8259)" : isJa ? "1. JSON 構文検証 (RFC 8259)" : "1. Strict JSON RFC 8259 Validation"}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {isZh
                  ? "常见 JSON 错误包括尾随逗号 (Trailing Commas)、单引号包裹键名以及未转义的特殊控制字符。本工具基于原生 V8 解析引擎提供精确报错定位。"
                  : isJa
                  ? "末尾のカンマや単一引用符、エスケープされていない制御文字など、構文エラーを正確に検出します。"
                  : "Common errors include trailing commas, single-quoted keys, and unescaped control characters. Our validator surfaces exact parse anomalies instantly."}
              </p>
              <div className="bg-slate-900 text-slate-200 p-3 rounded-lg text-xs font-mono">
                <code>
                  {`// Node.js format example\nconst formatted = JSON.stringify(JSON.parse(raw), null, 2);`}
                </code>
              </div>
            </div>

            {/* Guide Card 2 */}
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {isZh ? "2. UUID v4 密码学随机性 (RFC 4122)" : isJa ? "2. UUID v4 暗号乱数性 (RFC 4122)" : "2. RFC 4122 UUID v4 Generation"}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {isZh
                  ? "UUID v4 拥有 122 位真随机信息，生成碰撞的概率在实用场景下几乎为零 (约为 1 / 2^122)。本工具采用 crypto.randomUUID() 密码学硬件熵源。"
                  : isJa
                  ? "UUID v4 は 122 ビットのエントロピーを持ち、実質的な衝突確率はゼロです。ハードウェア由来の暗号乱数を利用しています。"
                  : "UUID v4 contains 122 bits of true entropy. The chance of generating duplicate IDs is infinitesimally negligible (~1 in 2^122)."}
              </p>
              <div className="bg-slate-900 text-slate-200 p-3 rounded-lg text-xs font-mono">
                <code>
                  {`// Native Node.js & Browser API\nconst id = crypto.randomUUID();`}
                </code>
              </div>
            </div>

            {/* Guide Card 3 */}
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {isZh ? "3. Web Crypto API 硬件加速摘要" : isJa ? "3. Web Crypto API ハッシュ計算" : "3. Hardware-Accelerated Web Crypto"}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {isZh
                  ? "通过 window.crypto.subtle.digest() 调用底层操作系统硬件加密指令集（如 Intel AES-NI / ARM Crypto Extension），速度比传统 JS 库快 10 倍以上。"
                  : isJa
                  ? "window.crypto.subtle.digest() を通じて CPU の暗号化アクセラレーションを直接呼び出し、極めて高速に計算します。"
                  : "Leveraging crypto.subtle.digest() invokes native CPU hardware instructions (AES-NI / ARM CE), delivering 10x throughput over legacy JS libraries."}
              </p>
              <div className="bg-slate-900 text-slate-200 p-3 rounded-lg text-xs font-mono">
                <code>
                  {`const hash = await crypto.subtle.digest('SHA-256', data);`}
                </code>
              </div>
            </div>

            {/* Guide Card 4 */}
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {isZh ? "4. Unix 时间戳与 2038 年问题" : isJa ? "4. タイムスタンプと2038年問題" : "4. Unix Epoch & Year 2038 Readiness"}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {isZh
                  ? "传统 32 位系统将在 2038 年 1 月 19 日发生整数溢出。XPT Dev 运算全面采用 64 位双精度时间表示，完整兼容 13 位毫秒级与 10 位秒级标准。"
                  : isJa
                  ? "32ビット整数のオーバーフロー問題（2038年問題）に対応し、64ビット浮動小数点数を用いて秒・ミリ秒を安全に処理します。"
                  : "Traditional 32-bit timestamp integers overflow in January 2038. Our converter utilizes 64-bit precision, supporting both 10-digit seconds and 13-digit ms."}
              </p>
              <div className="bg-slate-900 text-slate-200 p-3 rounded-lg text-xs font-mono">
                <code>
                  {`const epochSeconds = Math.floor(Date.now() / 1000);`}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Developer FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            {isZh ? "❓ 常见问题解答 (FAQ)" : isJa ? "❓ よくある質問 (FAQ)" : "❓ Frequently Asked Questions (FAQ)"}
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                {isZh
                  ? "我的敏感数据（如 API 密钥、密码、私有 JSON）是否会被记录或上传？"
                  : isJa
                  ? "入力した機密データ（APIキーや個人情報）はサーバーに保存されますか？"
                  : "Is any sensitive data (API keys, secrets, JSON payloads) logged or uploaded to your servers?"}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {isZh
                  ? "绝对不会。XPT Dev 的所有工具均采用纯客户端技术（Client-side Execution）。你可以打开浏览器的网络面板 (F12 Network) 检查，运算过程中不会发起任何包含你输入内容的 HTTP 请求，断网状态下亦可正常使用。"
                  : isJa
                  ? "いいえ、一切送信されません。すべての処理は端末のブラウザ内で完結するため、オフライン状態でも動作します。"
                  : "Never. All utilities run strictly inside your browser's local sandbox. You can inspect your browser's Network tab (F12) to confirm zero payload transmission."}
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                {isZh
                  ? "如果我需要更多高级开发工具（如代码混淆、SQL 格式化、正则调试），在哪里可以找到？"
                  : isJa
                  ? "さらに多くの開発ツール（SQL整形、難読化など）はどこで利用できますか？"
                  : "Where can I find more advanced developer utilities?"}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {isZh ? (
                  <>
                    我们同时维护了收录超过 100 款高阶工具的完整在线工具箱：
                    <a
                      href="https://tools.xptdev.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 font-medium hover:underline ml-1"
                    >
                      tools.xptdev.com
                    </a>
                    ，欢迎免费使用。
                  </>
                ) : isJa ? (
                  <>
                    100 以上の高度なツールを収録した専用サイト
                    <a
                      href="https://tools.xptdev.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 font-medium hover:underline ml-1"
                    >
                      tools.xptdev.com
                    </a>
                    も併せてご利用ください。
                  </>
                ) : (
                  <>
                    You can explore our expanded developer suite hosting 100+ utilities at
                    <a
                      href="https://tools.xptdev.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 font-medium hover:underline ml-1"
                    >
                      tools.xptdev.com
                    </a>
                    .
                  </>
                )}
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                {isZh
                  ? "如何将这些工具的逻辑应用到我的自建服务端项目中？"
                  : isJa
                  ? "これらのツールのアルゴリズムを自分のプロジェクトに組み込むには？"
                  : "How can I integrate these algorithms into my own backend services?"}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {isZh ? (
                  <>
                    我们推荐参阅我们的
                    <I18nLink
                      href="/blog"
                      className="text-blue-600 dark:text-blue-400 font-medium hover:underline mx-1"
                    >
                      技术博客专栏
                    </I18nLink>
                    ，其中涵盖了关于 Webhook 签名验证、JWT 密钥轮换、Cloudflare D1 边缘架构等完整生产级源码实现。
                  </>
                ) : isJa ? (
                  <>
                    当サイトの
                    <I18nLink
                      href="/blog"
                      className="text-blue-600 dark:text-blue-400 font-medium hover:underline mx-1"
                    >
                      技術ブログ
                    </I18nLink>
                    にて、Webhook 署名検証や JWT 実装などの詳細な本番コードを公開しています。
                  </>
                ) : (
                  <>
                    Check out our
                    <I18nLink
                      href="/blog"
                      className="text-blue-600 dark:text-blue-400 font-medium hover:underline mx-1"
                    >
                      Technical Blog
                    </I18nLink>
                    for full production-grade implementations of Webhook HMAC verification, JWT token rotation, and Cloudflare D1 architectures.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({
    locale,
  }));
}
