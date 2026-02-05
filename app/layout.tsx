import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
	variable: "--font-display",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

const body = Manrope({
	variable: "--font-body",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: {
		default: "NetworkX.ai",
		template: "%s | NetworkX.ai",
	},
	description:
		"NetworkX.ai helps you maximise your X account’s potential with actionable analytics and automation.",
	metadataBase: new URL("https://networkx.ai"),
	openGraph: {
		title: "NetworkX.ai",
		description:
			"Maximise your X account’s potential with actionable analytics, automation, and growth insights.",
		url: "/",
		siteName: "NetworkX.ai",
		images: [
			{
				url: "/left-frame.svg",
				width: 1200,
				height: 630,
				alt: "NetworkX.ai dashboard preview",
			},
		],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "NetworkX.ai",
		description:
			"Maximise your X account’s potential with actionable analytics, automation, and growth insights.",
		images: ["/left-frame.svg"],
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${display.variable} ${body.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
