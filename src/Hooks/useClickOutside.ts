import { ChangeEvent, Ref, RefObject, useEffect } from "react";

type Handler = (event: MouseEvent) => void;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: Handler,
    mouseEvent: "mousedown" | "mouseup" = "mousedown"
): void {
    // eslint-disable-next-line no-restricted-globals
    addEventListener(mouseEvent, (event) => {
        const el = ref?.current;
        if (!el || el.contains(event.target as Node)) {
            return;
        }
        handler(event);
    });
}
