"use client";
import { useCtrlCmdEnter } from "@/hooks/useCtrlCmdEnter";
import ShortCut from "./ui/ShortCut";

export interface EnterShortcutProps {
  shortCut: () => void;
  text: string;
  className?: string;
}

function EnterShortcut({ shortCut, text, className }: EnterShortcutProps) {
  useCtrlCmdEnter(shortCut);
  return (
    <ShortCut shortcutKey={"Enter"} shortcutDesc={text} className={className} />
  );
}

export default EnterShortcut;
