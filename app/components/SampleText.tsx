import { useOutletContext } from "@remix-run/react";

export const SampleText =() => {
    const context = useOutletContext();
    return (
      <div>
        {context.txt}
      </div>
    )
  }