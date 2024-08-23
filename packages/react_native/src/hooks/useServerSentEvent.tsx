import { useEffect, useRef } from 'react';
import EventSource, { EventSourceListener } from 'react-native-sse';

const useSSE = (
    url: string,
    onOpen?: EventSourceListener<never, 'open'>,
    onMessage?: EventSourceListener<never, 'message'>,
    onError?: EventSourceListener<never, 'error'>
) => {
    const eventSourceRef = useRef<EventSource | null>(null);

    useEffect(() => {
        const eventSource = new EventSource(url);

        eventSourceRef.current = eventSource;

        if (onOpen) {
            eventSource.addEventListener('open', onOpen);
        }

        if (onMessage) {
            eventSource.addEventListener('message', onMessage);
        }

        if (onError) {
            eventSource.addEventListener('error', onError);
        }

        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
        };
    }, [url, onOpen, onMessage, onError]);

    return eventSourceRef.current;
};

export default useSSE;
