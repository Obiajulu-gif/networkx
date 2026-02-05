import type { ReactNode } from "react";
import AuthSplitLayout from "@/components/auth/AuthSplitLayout";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <AuthSplitLayout>{children}</AuthSplitLayout>;
}
