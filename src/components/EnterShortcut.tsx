"use client";
import { useCtrlCmdEnter } from "@/hooks/useCtrlCmdEnter";
import ShortCut from "./ui/ShortCut";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export interface EnterShortcutProps {
  shortCut: () => void;
  text: string;
  className?: string;
}

function EnterShortcut({ shortCut, text, className }: EnterShortcutProps) {
  useCtrlCmdEnter(shortCut);
  return (
    <div className="fixed bottom-5 left-1/2  -translate-x-1/2 transform">
      <ShortCut
        shortcutKey={"Enter"}
        shortcutDesc={text}
        className={cn("hidden lg:block", className)}
      />
      <Button className="lg:hidden" onClick={shortCut}>
        Leave
      </Button>
    </div>
  );
}

export default EnterShortcut;
