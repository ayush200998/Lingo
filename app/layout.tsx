import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import LessonExitModal from "@/components/modals/LessonExitModal";
import InsufficientHeartsModal from "@/components/modals/InSufficientHeartsModal";
import PracticeModal from "@/components/modals/PracticeModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lingo",
  description: "A saas application for learning languages with gamification.",
  icons: {
    icon: '/icons/app_icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={font.className}>
        <Toaster />
        <LessonExitModal />
        <InsufficientHeartsModal />
        <PracticeModal />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
