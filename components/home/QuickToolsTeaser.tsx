"use client";

import { Link as I18nLink } from "@/i18n/routing";
import { ArrowRight, Code2, Hash, KeyRound, Terminal, Wand2, Wrench } from "lucide-react";
import React from "react";

interface QuickToolsTeaserProps {
  locale: string;
}

export default function QuickToolsTeaser({ locale }: QuickToolsTeaserProps) {
  const isZh = locale === "zh";
  const isJa = locale === "ja";

  const tools = [
    {
      icon: Code2,
      name: isZh ? "JSON 格式化 & 语法校验" : isJa ? "JSON 整形・構文チェック" : "JSON Prettifier & Validator",
      desc: isZh ? "支持严格 RFC 8259 语法检测、自动定位错误行并支持 2/4 空格与 Minify 压缩。" : isJa ? "RFC 8259 準拠の構文エラー検出とインデント自動整形。" : "Strict RFC 8259 validation, error pinpointing, 2/4-space indent & minification.",
    },
    {
      icon: Terminal,
      name: isZh ? "Base64 & URL 编解码" : isJa ? "Base64 / URL エンコーダ" : "Base64 & URL Converter",
      desc: isZh ? "支持 UTF-8 多字节字符流无损转码，双向加解密即时转换。" : isJa ? "UTF-8 マルチバイト文字に対応した高速エンコード＆デコード。" : "UTF-8 safe bidirectional string encoding and URL percent-encoding in real-time.",
    },
    {
      icon: Wand2,
      name: isZh ? "UUID v4 随机生成器" : isJa ? "UUID v4 乱数ジェネレータ" : "UUID v4 RFC 4122 Generator",
      desc: isZh ? "基于硬件熵源密码学随机数，批量秒级生成 1~20 条无碰撞唯一标识。" : isJa ? "暗号乱数ベースの衝突なし一意IDを一括生成。" : "Cryptographically secure RFC 4122 v4 IDs batch generated with zero collision risk.",
    },
    {
      icon: Hash,
      name: isZh ? "SHA-256 / 512 哈希计算" : isJa ? "暗号学的ハッシュ計算" : "Hardware Crypto Hasher",
      desc: isZh ? "利用底层 CPU 硬件加密指令秒级计算哈希摘要，数据绝不离机。" : isJa ? "CPU ハードウェア暗号化支援による超高速ハッシュ算出。" : "Hardware-accelerated SHA-256 and SHA-512 digests via native Web Cryptography API.",
    },
    {
      icon: KeyRound,
      name: isZh ? "高熵随机密码 / 密钥" : isJa ? "高強度パスワード生成" : "High-Entropy Secret Generator",
      desc: isZh ? "自定义长度、字符集与特殊符号，生成抗爆破密码学安全密钥。" : isJa ? "文字種と長さを柔軟に指定可能な高エントロピー生成器。" : "Generate brute-force resistant secrets with customizable length and symbol sets.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200/60 dark:border-slate-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 mb-4">
            <Wrench className="w-3.5 h-3.5" />
            <span>{isZh ? "纯前端安全提效套件" : isJa ? "ブラウザ完結型開発者ツール" : "Client-Side Privacy Suite"}</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-gray-100 sm:text-4xl">
            {isZh ? "开发者核心在线工具箱" : isJa ? "エンジニア向けコアツール集" : "Developer Utility Suite"}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            {isZh
              ? "无需安装任何扩展或依赖，所有计算均基于现代浏览器 Web API 离线进行，确保敏感凭证与代码隐私 100% 安全。"
              : isJa
              ? "追加のインストール不要。すべての処理はブラウザの Web API でローカル完結し、安全性を保証します。"
              : "No dependencies required. All operations run strictly client-side using browser Web APIs for maximum confidentiality."}
          </p>
        </div>

        <div className="mt-6 md:mt-0">
          <I18nLink
            href="/tools"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            <span>{isZh ? "打开完整工具箱" : isJa ? "全ツールを開く" : "Launch Full Toolkit"}</span>
            <ArrowRight className="w-4 h-4" />
          </I18nLink>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, idx) => {
          const Icon = tool.icon;
          return (
            <I18nLink
              key={idx}
              href="/tools"
              className="group p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                {tool.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {tool.desc}
              </p>
            </I18nLink>
          );
        })}

        {/* 100+ Tools External Card */}
        <a
          href="https://tools.xptdev.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800/80 dark:to-blue-950/30 border border-blue-200 dark:border-blue-900 hover:border-blue-500 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
              <span>{isZh ? "探索 100+ 高阶工具箱" : isJa ? "100+ 拡張ツールボックス" : "Explore 100+ Advanced Tools"}</span>
              <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {isZh
                ? "包含 SQL 格式化、JWT 解码、正则表达式在线测试、代码高亮混淆等 100+ 款高阶工程师利器。"
                : isJa
                ? "SQL 整形、JWT デコーダ、正規表現テスターなど 100 以上のエンジニア向け拡張ツール。"
                : "Includes SQL formatters, JWT decoders, regex testing, diff checkers, and 100+ utilities."}
            </p>
          </div>
          <span className="mt-4 text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
            tools.xptdev.com &rarr;
          </span>
        </a>
      </div>
    </section>
  );
}
