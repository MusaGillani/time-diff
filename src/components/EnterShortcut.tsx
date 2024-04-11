"use client";
import { useCtrlCmdEnter } from "@/hooks/useCtrlCmdEnter";
import ShortCut from "./ui/ShortCut";

export interface EnterShortcutProps {
  shortCut: () => void;
  text: string;
}

function EnterShortcut({ shortCut, text }: EnterShortcutProps) {
  useCtrlCmdEnter(shortCut);
  return <ShortCut shortcutKey={"Enter"} shortcutDesc={text} />;
}

export default EnterShortcut;
