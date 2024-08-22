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
            console.log(
                "['useServerSentEvent.tsx'] setting up onOpen event listener"
            );

            eventSource.addEventListener('open', onOpen);
        }

        if (onMessage) {
            console.log(
                "['useServerSentEvent.tsx'] setting up onMessage event listener"
            );

            eventSource.addEventListener('message', onMessage);
        }

        if (onError) {
            console.log(
                "['useServerSentEvent.tsx'] setting up onError event listener"
            );

            eventSource.addEventListener('error', onError);
        }

        return () => {
            if (eventSourceRef.current) {
                console.log("['useServerSentEvent.tsx'] closing event source");

                eventSourceRef.current.close();
            }
        };
    }, [url, onOpen, onMessage, onError]);

    return eventSourceRef.current;
};

export default useSSE;
