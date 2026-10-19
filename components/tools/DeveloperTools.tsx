"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Check,
  Code2,
  Copy,
  Hash,
  KeyRound,
  RefreshCw,
  ShieldCheck,
  Terminal,
  Wand2,
} from "lucide-react";
import React, { useEffect, useState } from "react";

type ToolTab = "json" | "base64" | "uuid" | "hash" | "timestamp" | "password";

interface DeveloperToolsProps {
  locale: string;
}

export default function DeveloperTools({ locale }: DeveloperToolsProps) {
  const [activeTab, setActiveTab] = useState<ToolTab>("json");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Copy helper
  const handleCopy = (text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // 1. JSON Formatter State
  const [jsonInput, setJsonInput] = useState<string>(
    JSON.stringify(
      {
        project: "XPT Dev",
        version: "2.0.0",
        features: ["zero-knowledge", "edge-native", "privacy-first"],
        author: { name: "Indie Developer", site: "https://xptdev.com" },
      },
      null,
      2
    )
  );
  const [jsonOutput, setJsonOutput] = useState<string>("");
  const [jsonError, setJsonError] = useState<string | null>(null);

  const formatJson = (indent: number = 2) => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, indent));
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message || "Invalid JSON syntax");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed));
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message || "Invalid JSON syntax");
    }
  };

  // 2. Base64 & URL State
  const [b64Input, setB64Input] = useState<string>("Hello, XPT Dev Global Developer!");
  const [b64Output, setB64Output] = useState<string>("");

  const handleBase64Encode = () => {
    try {
      const bytes = new TextEncoder().encode(b64Input);
      const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
      setB64Output(btoa(binString));
    } catch {
      setB64Output("Encoding error");
    }
  };

  const handleBase64Decode = () => {
    try {
      const binString = atob(b64Input.trim());
      const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0));
      setB64Output(new TextDecoder().decode(bytes));
    } catch {
      setB64Output("Invalid Base64 string");
    }
  };

  const handleUrlEncode = () => {
    setB64Output(encodeURIComponent(b64Input));
  };

  const handleUrlDecode = () => {
    try {
      setB64Output(decodeURIComponent(b64Input));
    } catch {
      setB64Output("Invalid URL-encoded string");
    }
  };

  // 3. UUID Generator State
  const [uuidCount, setUuidCount] = useState<number>(5);
  const [uuidUppercase, setUuidUppercase] = useState<boolean>(false);
  const [uuidList, setUuidList] = useState<string[]>([]);

  const generateUUIDs = () => {
    const list: string[] = [];
    for (let i = 0; i < uuidCount; i++) {
      let u = crypto.randomUUID ? crypto.randomUUID() : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: any) =>
        (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
      );
      if (uuidUppercase) u = u.toUpperCase();
      list.push(u);
    }
    setUuidList(list);
  };

  useEffect(() => {
    generateUUIDs();
  }, [uuidCount, uuidUppercase]);

  // 4. Hash Generator State
  const [hashInput, setHashInput] = useState<string>("xptdev-secure-payload-2026");
  const [hashes, setHashes] = useState<{ [key: string]: string }>({});

  const computeHashes = async (text: string) => {
    if (!text) {
      setHashes({});
      return;
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const algorithms = [
      { name: "SHA-256", algo: "SHA-256" },
      { name: "SHA-512", algo: "SHA-512" },
      { name: "SHA-1", algo: "SHA-1" },
    ];

    const results: { [key: string]: string } = {};

    for (const { name, algo } of algorithms) {
      try {
        const hashBuffer = await crypto.subtle.digest(algo, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        results[name] = hashHex;
      } catch {
        results[name] = "Not supported";
      }
    }
    setHashes(results);
  };

  useEffect(() => {
    computeHashes(hashInput);
  }, [hashInput]);

  // 5. Timestamp Converter State
  const [currentEpoch, setCurrentEpoch] = useState<number>(Math.floor(Date.now() / 1000));
  const [inputEpoch, setInputEpoch] = useState<string>(String(Math.floor(Date.now() / 1000)));
  const [parsedEpochResult, setParsedEpochResult] = useState<{
    utc: string;
    local: string;
    iso: string;
  }>({ utc: "", local: "", iso: "" });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const parseEpoch = (val: string) => {
    const num = parseInt(val.trim(), 10);
    if (isNaN(num)) {
      setParsedEpochResult({ utc: "Invalid", local: "Invalid", iso: "Invalid" });
      return;
    }
    // Check if milliseconds (13 digits) or seconds (10 digits)
    const ms = val.trim().length > 11 ? num : num * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) {
      setParsedEpochResult({ utc: "Invalid Date", local: "Invalid Date", iso: "Invalid Date" });
    } else {
      setParsedEpochResult({
        utc: d.toUTCString(),
        local: d.toLocaleString(),
        iso: d.toISOString(),
      });
    }
  };

  useEffect(() => {
    parseEpoch(inputEpoch);
  }, [inputEpoch]);

  // 6. Secure Password / Secret Generator
  const [pwdLength, setPwdLength] = useState<number>(20);
  const [pwdUseUpper, setPwdUseUpper] = useState<boolean>(true);
  const [pwdUseLower, setPwdUseLower] = useState<boolean>(true);
  const [pwdUseNums, setPwdUseNums] = useState<boolean>(true);
  const [pwdUseSyms, setPwdUseSyms] = useState<boolean>(true);
  const [generatedPassword, setGeneratedPassword] = useState<string>("");

  const generatePassword = () => {
    let chars = "";
    if (pwdUseUpper) chars += "ABCDEFGHJKLMNPQRSTUVWXYZ";
    if (pwdUseLower) chars += "abcdefghijkmnopqrstuvwxyz";
    if (pwdUseNums) chars += "23456789";
    if (pwdUseSyms) chars += "!@#$%^&*()_+~`|}{[]:;?><,.-=";
    if (!chars) chars = "abcdefghijkmnopqrstuvwxyz";

    const randomValues = new Uint32Array(pwdLength);
    crypto.getRandomValues(randomValues);

    let res = "";
    for (let i = 0; i < pwdLength; i++) {
      res += chars[randomValues[i] % chars.length];
    }
    setGeneratedPassword(res);
  };

  useEffect(() => {
    generatePassword();
  }, [pwdLength, pwdUseUpper, pwdUseLower, pwdUseNums, pwdUseSyms]);

  // UI labels based on locale
  const isZh = locale === "zh";
  const isJa = locale === "ja";

  const tabs = [
    { id: "json", label: isZh ? "JSON 格式化" : isJa ? "JSON 整形" : "JSON Prettifier", icon: Code2 },
    { id: "base64", label: isZh ? "Base64 & URL 编解码" : isJa ? "Base64/URL 変換" : "Base64 & URL", icon: Terminal },
    { id: "uuid", label: isZh ? "UUID v4 生成器" : isJa ? "UUID v4 生成" : "UUID v4 Generator", icon: Wand2 },
    { id: "hash", label: isZh ? "哈希与摘要计算" : isJa ? "ハッシュ計算" : "Crypto Hasher", icon: Hash },
    { id: "timestamp", label: isZh ? "Unix 时间戳转换" : isJa ? "タイムスタンプ変換" : "Epoch Timestamp", icon: RefreshCw },
    { id: "password", label: isZh ? "高强度随机密码" : isJa ? "高強度パスワード生成" : "Password Generator", icon: KeyRound },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-8">
      {/* Privacy Guarantee Banner */}
      <Alert className="mb-8 border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200">
        <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        <AlertTitle className="font-semibold text-emerald-900 dark:text-emerald-100">
          {isZh
            ? "100% 浏览器本地运算 · 零云端隐私上传"
            : isJa
            ? "100% ブラウザ内ローカル処理 · クラウド送信ゼロ"
            : "100% Client-Side Computation · Zero Server Telemetry"}
        </AlertTitle>
        <AlertDescription className="text-emerald-800/80 dark:text-emerald-300/80 text-sm mt-1">
          {isZh
            ? "所有格式化、解密与密钥运算均通过现代浏览器 Web Cryptography API 在你的设备上完成，绝不向服务器发送任何数据。"
            : isJa
            ? "すべてのフォーマット、デコード、ハッシュ計算はブラウザの Web Cryptography API を通じて端末内で完結します。"
            : "All formatting, crypto hashing, and key derivations execute directly inside your browser sandbox via Web Cryptography API."}
        </AlertDescription>
      </Alert>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-xl mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ToolTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tool Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        {/* 1. JSON Prettifier */}
        {activeTab === "json" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-500" />
                {isZh ? "JSON 格式化与语法校验" : isJa ? "JSON 整形・構文チェック" : "JSON Prettifier & Validator"}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => formatJson(2)}
                  className="px-3 py-1.5 text-xs font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                >
                  {isZh ? "格式化 (2空格)" : isJa ? "整形 (2スペース)" : "Format (2 Spaces)"}
                </button>
                <button
                  onClick={() => formatJson(4)}
                  className="px-3 py-1.5 text-xs font-medium rounded-md bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                >
                  {isZh ? "格式化 (4空格)" : isJa ? "整形 (4スペース)" : "Format (4 Spaces)"}
                </button>
                <button
                  onClick={minifyJson}
                  className="px-3 py-1.5 text-xs font-medium rounded-md bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                >
                  {isZh ? "压缩 Minify" : isJa ? "圧縮 (Minify)" : "Minify"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  {isZh ? "输入原始 JSON" : isJa ? "入力 JSON" : "Input JSON"}
                </label>
                <textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  className="w-full h-80 font-mono text-xs p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Paste JSON here..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {isZh ? "输出结果" : isJa ? "出力結果" : "Output"}
                  </label>
                  {jsonOutput && (
                    <button
                      onClick={() => handleCopy(jsonOutput, "json")}
                      className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {copiedKey === "json" ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedKey === "json" ? (isZh ? "已复制" : "Copied") : (isZh ? "复制" : "Copy")}
                    </button>
                  )}
                </div>
                <textarea
                  readOnly
                  value={jsonError ? `Error: ${jsonError}` : jsonOutput || (isZh ? "点击上方按钮开始格式化..." : "Click format buttons above...")}
                  className={`w-full h-80 font-mono text-xs p-3 rounded-lg border bg-slate-50 dark:bg-slate-950 focus:outline-none ${
                    jsonError
                      ? "border-red-400 text-red-600 dark:text-red-400"
                      : "border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. Base64 & URL */}
        {activeTab === "base64" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-500" />
              {isZh ? "Base64 与 URL 智能编解码" : isJa ? "Base64 & URL エンコード/デコード" : "Base64 & URL Encoder / Decoder"}
            </h3>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                {isZh ? "输入内容" : isJa ? "入力テキスト" : "Input String"}
              </label>
              <textarea
                value={b64Input}
                onChange={(e) => setB64Input(e.target.value)}
                className="w-full h-32 font-mono text-sm p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleBase64Encode}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              >
                Base64 编码 (Encode)
              </button>
              <button
                onClick={handleBase64Decode}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
              >
                Base64 解码 (Decode)
              </button>
              <button
                onClick={handleUrlEncode}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
              >
                URL Encode
              </button>
              <button
                onClick={handleUrlDecode}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
              >
                URL Decode
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {isZh ? "转换结果" : isJa ? "変換結果" : "Result"}
                </label>
                {b64Output && (
                  <button
                    onClick={() => handleCopy(b64Output, "b64")}
                    className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {copiedKey === "b64" ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === "b64" ? (isZh ? "已复制" : "Copied") : (isZh ? "复制" : "Copy")}
                  </button>
                )}
              </div>
              <textarea
                readOnly
                value={b64Output}
                placeholder={isZh ? "转换结果将显示在此处..." : "Results will appear here..."}
                className="w-full h-32 font-mono text-sm p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>
        )}

        {/* 3. UUID Generator */}
        {activeTab === "uuid" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-blue-500" />
                {isZh ? "标准 UUID v4 (RFC 4122) 随机生成器" : isJa ? "UUID v4 (RFC 4122) 生成器" : "UUID v4 RFC 4122 Generator"}
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>{isZh ? "数量:" : "Count:"}</span>
                  {[1, 5, 10, 20].map((c) => (
                    <button
                      key={c}
                      onClick={() => setUuidCount(c)}
                      className={`px-2.5 py-1 text-xs rounded-md ${
                        uuidCount === c
                          ? "bg-blue-500 text-white"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={uuidUppercase}
                    onChange={(e) => setUuidUppercase(e.target.checked)}
                    className="rounded text-blue-500"
                  />
                  <span>{isZh ? "大写字母" : isJa ? "大文字" : "Uppercase"}</span>
                </label>
                <button
                  onClick={generateUUIDs}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {isZh ? "重新生成" : isJa ? "再生成" : "Regenerate"}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {isZh ? `已生成 ${uuidList.length} 个密码学安全 UUID v4:` : `Generated ${uuidList.length} cryptographic UUID v4:`}
                </span>
                <button
                  onClick={() => handleCopy(uuidList.join("\n"), "all_uuid")}
                  className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {copiedKey === "all_uuid" ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === "all_uuid" ? (isZh ? "全部已复制" : "All Copied") : (isZh ? "复制全部" : "Copy All")}
                </button>
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto p-1">
                {uuidList.map((u, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm"
                  >
                    <span className="text-slate-800 dark:text-slate-200 select-all">{u}</span>
                    <button
                      onClick={() => handleCopy(u, `uuid_${idx}`)}
                      className="text-slate-400 hover:text-blue-500 transition-colors p-1"
                      title="Copy"
                    >
                      {copiedKey === `uuid_${idx}` ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. Crypto Hasher */}
        {activeTab === "hash" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Hash className="w-5 h-5 text-blue-500" />
              {isZh ? "密码学安全哈希摘要计算" : isJa ? "暗号ハッシュダイジェスト計算" : "Cryptographic Hash & Digest Calculator"}
            </h3>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                {isZh ? "明文输入" : isJa ? "平文入力" : "Plaintext Input"}
              </label>
              <input
                type="text"
                value={hashInput}
                onChange={(e) => setHashInput(e.target.value)}
                placeholder="Enter string to hash..."
                className="w-full font-mono text-sm p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-3 pt-2">
              {Object.entries(hashes).map(([algo, digest]) => (
                <div key={algo} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{algo}</span>
                    <button
                      onClick={() => handleCopy(digest, algo)}
                      className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-500"
                    >
                      {copiedKey === algo ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedKey === algo ? (isZh ? "已复制" : "Copied") : (isZh ? "复制" : "Copy")}
                    </button>
                  </div>
                  <div className="font-mono text-xs text-slate-700 dark:text-slate-300 break-all select-all">
                    {digest}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Timestamp Converter */}
        {activeTab === "timestamp" && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-blue-500" />
              {isZh ? "Unix 时间戳与标准时间互转" : isJa ? "Unix タイムスタンプ相互変換" : "Unix Epoch & ISO Timestamp Converter"}
            </h3>

            {/* Current Real-time Epoch */}
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 flex items-center justify-between">
              <div>
                <span className="text-xs text-blue-700 dark:text-blue-300 block mb-1">
                  {isZh ? "当前 UTC 秒级时间戳 (实时更新):" : isJa ? "現在の秒単位タイムスタンプ:" : "Current Epoch Timestamp (Realtime):"}
                </span>
                <span className="font-mono text-2xl font-bold text-blue-900 dark:text-blue-100">{currentEpoch}</span>
              </div>
              <button
                onClick={() => {
                  setInputEpoch(String(currentEpoch));
                  handleCopy(String(currentEpoch), "cur_epoch");
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                {copiedKey === "cur_epoch" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {isZh ? "填入并复制" : isJa ? "入力＆コピー" : "Use & Copy"}
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                {isZh ? "输入秒级(10位)或毫秒级(13位)时间戳" : isJa ? "タイムスタンプ入力 (10桁/13桁)" : "Input Epoch Timestamp (10 or 13 digits)"}
              </label>
              <input
                type="text"
                value={inputEpoch}
                onChange={(e) => setInputEpoch(e.target.value)}
                className="w-full font-mono text-base p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500 block mb-1">ISO 8601 格式</span>
                <span className="font-mono text-xs text-slate-800 dark:text-slate-200 select-all block break-all">
                  {parsedEpochResult.iso || "-"}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500 block mb-1">UTC 标准时间</span>
                <span className="font-mono text-xs text-slate-800 dark:text-slate-200 select-all block break-all">
                  {parsedEpochResult.utc || "-"}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500 block mb-1">本地时间 (Local Timezone)</span>
                <span className="font-mono text-xs text-slate-800 dark:text-slate-200 select-all block break-all">
                  {parsedEpochResult.local || "-"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 6. Password Generator */}
        {activeTab === "password" && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-blue-500" />
              {isZh ? "高强度高熵随机密钥 / 密码生成器" : isJa ? "高エントロピーパスワード・シークレット生成" : "High-Entropy Secret & Password Generator"}
            </h3>

            {/* Generated Password Box */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <span className="font-mono text-lg font-bold text-slate-900 dark:text-white select-all break-all">
                {generatedPassword}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={generatePassword}
                  className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                  title="Regenerate"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleCopy(generatedPassword, "pwd")}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  {copiedKey === "pwd" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedKey === "pwd" ? (isZh ? "已复制" : "Copied") : (isZh ? "复制" : "Copy")}
                </button>
              </div>
            </div>

            {/* Settings */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {isZh ? `密码长度: ${pwdLength} 位` : `Length: ${pwdLength} chars`}
                </span>
                <input
                  type="range"
                  min="8"
                  max="64"
                  value={pwdLength}
                  onChange={(e) => setPwdLength(parseInt(e.target.value, 10))}
                  className="w-48 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pwdUseUpper}
                    onChange={(e) => setPwdUseUpper(e.target.checked)}
                    className="rounded text-blue-500"
                  />
                  <span>A-Z (大写字母)</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pwdUseLower}
                    onChange={(e) => setPwdUseLower(e.target.checked)}
                    className="rounded text-blue-500"
                  />
                  <span>a-z (小写字母)</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pwdUseNums}
                    onChange={(e) => setPwdUseNums(e.target.checked)}
                    className="rounded text-blue-500"
                  />
                  <span>0-9 (数字)</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pwdUseSyms}
                    onChange={(e) => setPwdUseSyms(e.target.checked)}
                    className="rounded text-blue-500"
                  />
                  <span>!@#$ (特殊字符)</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
