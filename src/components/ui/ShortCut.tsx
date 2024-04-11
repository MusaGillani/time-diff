import { Label } from "./label";

export interface ShortCutProps {
  shortcutKey: string;
  shortcutDesc: string;
}

function ShortCut({ shortcutDesc, shortcutKey }: ShortCutProps) {
  return (
    <Label className="text-center text-muted-foreground">
      tip{" "}
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">⌘</span>
        {shortcutKey}
      </kbd>{" "}
      {shortcutDesc}
    </Label>
  );
}

export default ShortCut;
