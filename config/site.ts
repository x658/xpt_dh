import { SiteConfig } from "@/types/siteConfig";

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://xptdev.com";

const EMAIL_URL = 'admin@xptdev.com'

export const siteConfig: SiteConfig = {
  name: "XPT Dev",
  tagLine: "开发者实用工具与出海资源站",
  description: "精选开发者在线工具箱、技术实践教程与出海生产力工具推荐。",
  url: BASE_URL,
  authors: [
    {
      name: "XPT Dev",
      url: "https://xptdev.com",
    }
  ],
  creator: '@xptdev',
  socialLinks: {
    email: EMAIL_URL
  },
  themeColors: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  defaultNextTheme: 'system',
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
}
