/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

const cursorPointer = document.getElementById('cursorPointer');

const moveCursor = (evnet: EventMouseMove) => {
  const cursorX = event.pageX;
  const cursorY = event.pageY;
  const cursorWidth = 60

  cursorPointer.style.transform = `translate3d(${cursorX - (cursorWidth/2)}px, ${cursorY - (cursorWidth/2)}px, 0px)`;
}

window.addEventListener('mousemove', moveCursor);

startTransition(() => {
  hydrateRoot(
    document,
    // <StrictMode>
      <RemixBrowser />
    // </StrictMode>
  );
});
