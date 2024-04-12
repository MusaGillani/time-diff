import { useIsClient } from "usehooks-ts";

export const useIsMacOS = () => {
  const isClient = useIsClient();

  return isClient ? navigator.userAgent.indexOf("Mac") > -1 : false;
};
