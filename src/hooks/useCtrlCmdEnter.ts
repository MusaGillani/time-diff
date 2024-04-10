import { useRef } from "react";
import { useEventListener } from "usehooks-ts";

export const useCtrlCmdEnter = (fn: () => void) => {
  const documentRef = useRef<Document>(document);

  const listener = (event: KeyboardEvent) => {
    if (event.key == "Enter" && (event.metaKey || event.ctrlKey)) {
      fn();
    }
  };

  useEventListener("keydown", listener, documentRef);
};
