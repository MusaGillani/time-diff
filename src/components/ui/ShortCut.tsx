"use client";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import { useIsMacOS } from "@/hooks/useIsMacOS";

export interface ShortCutProps {
  shortcutKey: string;
  shortcutDesc: string;
  className?: string;
}

function ShortCut({ shortcutDesc, shortcutKey, className }: ShortCutProps) {
  const isMacOS = useIsMacOS();
  return (
    <Label
      className={cn(
        "fixed bottom-5 left-1/2 hidden -translate-x-1/2 transform text-center text-muted-foreground lg:block",
        className,
      )}
    >
      tip{" "}
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">{isMacOS ? "⌘" : "ctrl"}</span>
        {shortcutKey}
      </kbd>{" "}
      {shortcutDesc}
    </Label>
  );
}

export default ShortCut;
