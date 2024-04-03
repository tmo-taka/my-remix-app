import { useOutletContext } from "@remix-run/react";

export const SampleText =() => {
    const context = useOutletContext();
    console.log(context)
    return (
      <div>
        {context.txt}
      </div>
    )
  }