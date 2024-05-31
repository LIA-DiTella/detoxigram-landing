import type { Metadata } from "next";
import "@styles/globals.scss";
import { SITE } from "@/config";
import { Header } from "@components/global/header";
import { Footer } from "@components/global/footer";

export const metadata: Metadata = {
    title: SITE.title || "Detoxigram",
    description: SITE.desc || "Are you aware of how toxic is the content you consume?",
    keywords: SITE.keywords || "Machine learning, Artificial Inteligence, Public Good, Toxicity, Detoxigram",
    icons: {
        icon: [
            { url: "/favicon-16x-16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x-32.png", sizes: "32x32", type: "image/png" }
        ],
        shortcut: "/android-chrome-192x192.png",
        apple: "/apple-touch-icon.png",
        other: {
            rel: "apple-touch-icon",
            url: "/apple-touch-icon.png"
        }
    },
    openGraph: {
        title: SITE.title || "Detoxigram",
        description: SITE.desc || "Helping users understand why content is classified as toxic",
        authors: SITE.author || "Detoxigram",
        images: [
            {
                url: SITE.ogImage || "https://nextjs.org/og.png", 
                width: 1200,
                height: 630
            }
        ]
    },
    alternates: {
        canonical: SITE.siteUrl || "Canonical URL"
    },
    manifest: "site.webmanifest",
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1
        }
    }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-[#F8F1E4]">
                <Header />
                <main className="main grid gap-8">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
