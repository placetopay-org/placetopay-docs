import {ClipboardIcon} from './icons/ClipboardIcon';
import { useState, useEffect } from 'react';
import clsx from 'clsx'

export const CopyContent = ({ content }) => {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!pressed) return;
    const timeout = setTimeout(() => setPressed(false), 500);
    return () => clearTimeout(timeout);
  });

  return (
    <button
      className="group/button flex relative gap-2 items-center"
      onClick={() => {
        setPressed(true);
        navigator.clipboard.writeText(content)
      }}
    >
      {content}
      <ClipboardIcon className="invisible duration-300 group-hover/button:visible h-5 w-5 fill-gray-500/20 stroke-gray-500 transition-colors group-hover/button:stroke-gray-400" />

      <div
        aria-hidden="true"
        className={
          clsx(
            "pointer-events-none absolute top-0 right-0 py-1 px-3 rounded-full -translate-y-1/2 translate-x-full flex items-center justify-center text-primary-400 transition duration-300 bg-primary-400/10 ring-1 ring-inset ring-primary-400/20",
            pressed ? "opacity-100" : "opacity-0"
          )}
      >
        Copied!
      </div>
    </button>
  )
};
