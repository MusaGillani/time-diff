import { useEventListener } from "usehooks-ts";

export const useEnter = (fn: () => void) => {
  const listener = (event: KeyboardEvent) => {
    if (event.key == "Enter" && !(event.metaKey || event.ctrlKey)) {
      fn();
    }
  };

  // not passing any ref as a third param attaches listener to window
  useEventListener("keydown", listener);
};
