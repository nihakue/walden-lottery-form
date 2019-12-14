import React from "react";
// On Oct 1 at midnight in MST, switch to allowing the next year, stop allowing the previous
export function useValidYears() {
  return React.useMemo(() => {
    const now = new Date();
    const switchesAt = new Date(Date.UTC(now.getFullYear(), 9, 1, 6));
    const earliestYear = now > switchesAt ? now.getFullYear() : now.getFullYear() - 1;
    return [earliestYear, earliestYear + 1];
  }, []);
}
