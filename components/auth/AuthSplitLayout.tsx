import type { ReactNode } from "react";
import MarketingPanel from "./MarketingPanel";
import Logo from "./Logo";

type AuthSplitLayoutProps = {
  children: ReactNode;
};

export default function AuthSplitLayout({ children }: AuthSplitLayoutProps) {
  return (
    <main className="auth-background min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col gap-10 px-6 py-6 lg:flex-row lg:items-center lg:gap-16 lg:py-16">
        <div className="hidden lg:flex lg:w-[55%]">
          <MarketingPanel />
        </div>
        <div className="flex w-full flex-1 items-center lg:w-[45%]">
          <div className="w-full">
        <div className="mx-auto w-full max-w-[440px] pt-1">
          <div className="mb-8 flex justify-center lg:hidden">
            <Logo />
          </div>
          {children}
        </div>
          </div>
        </div>
      </div>
    </main>
  );
}
