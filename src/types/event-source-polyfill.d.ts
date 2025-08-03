declare module 'event-source-polyfill' {
  export interface EventSourcePolyfillInit {
    headers?: Record<string, string>;
    heartbeatTimeout?: number;
    withCredentials?: boolean;
  }

  export class EventSourcePolyfill extends EventTarget {
    constructor(url: string, options?: EventSourcePolyfillInit);
    
    readonly CONNECTING: 0;
    readonly OPEN: 1;
    readonly CLOSED: 2;
    
    readonly readyState: 0 | 1 | 2;
    readonly url: string;
    readonly withCredentials: boolean;
    
    onopen: ((this: EventSourcePolyfill, ev: Event) => void) | null;
    onmessage: ((this: EventSourcePolyfill, ev: MessageEvent) => void) | null;
    onerror: ((this: EventSourcePolyfill, ev: Event) => void) | null;
    
    close(): void;
    
    addEventListener<K extends keyof EventSourceEventMap>(
      type: K,
      listener: (this: EventSourcePolyfill, ev: EventSourceEventMap[K]) => void,
      options?: boolean | AddEventListenerOptions
    ): void;
    addEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ): void;
    
    removeEventListener<K extends keyof EventSourceEventMap>(
      type: K,
      listener: (this: EventSourcePolyfill, ev: EventSourceEventMap[K]) => void,
      options?: boolean | EventListenerOptions
    ): void;
    removeEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | EventListenerOptions
    ): void;
  }

  interface EventSourceEventMap {
    'error': Event;
    'message': MessageEvent;
    'open': Event;
  }
}