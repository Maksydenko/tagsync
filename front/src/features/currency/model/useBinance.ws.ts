import { useEffect, useRef, useState } from 'react';

import { MethodBinanceWS } from './enums/binanceWS.enum';
import { StreamBinanceWS } from './enums/streamBinanceWS.enum';

import { IBinanceWSData } from './binanceWSData.interface';

const MESSAGES_LIMIT = 3;

export const useBinanceWS = () => {
  const socketRef = useRef<null | WebSocket>(null);
  const [messages, setMessages] = useState<IBinanceWSData[]>([]);

  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const socket = new WebSocket(process.env.NEXT_PUBLIC_BINANCE_WS_URL!);
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);

      socket.send(
        JSON.stringify({
          id: 1,
          method: MethodBinanceWS.SUBSCRIBE,
          params: [StreamBinanceWS.BTCUSDT_TRADE]
        })
      );
    };

    socket.onmessage = e => {
      try {
        const data = JSON.parse(e.data);

        setMessages(prev => [...prev.slice(MESSAGES_LIMIT - 1), data]);
      } catch (
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        err: any
      ) {
        setError(err.message);
      }
    };

    socket.onerror = (
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      err: any
    ) => {
      setError(err.message);
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      socket.close();
    };
  }, []);

  return {
    error,
    isConnected,
    messages,
    socket: socketRef.current
  };
};
