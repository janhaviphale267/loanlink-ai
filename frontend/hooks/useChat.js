import { useState, useEffect, useCallback, useRef } from "react";
import * as chatApi from "../api/chatApi";

export default function useChat({ initialSessionId = null, autoStart = true } = {}) {
  const [sessionId, setSessionId] = useState(initialSessionId);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!sessionId && autoStart) {
      startSession().catch(() => {});
    } else if (sessionId) {
      refreshConversation(sessionId).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const startSession = useCallback(async (userId = null) => {
    setLoading(true);
    setError(null);
    try {
      const res = await chatApi.startSession(userId);
      const sid = res?.sessionId || res?.id;
      if (!sid) throw new Error("Invalid session response");
      if (mountedRef.current) {
        setSessionId(sid);
        if (res?.conversation) setMessages(res.conversation);
      }
      return sid;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, []);

  const refreshConversation = useCallback(
    async (sid = sessionId) => {
      if (!sid) return;
      setLoading(true);
      setError(null);
      try {
        const convo = await chatApi.getConversation(sid, 200);
        if (mountedRef.current) setMessages(convo || []);
        return convo;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    },
    [sessionId]
  );

  const sendMessage = useCallback(
    async (text, opts = {}) => {
      if (!text?.trim()) return;
      let sid = sessionId;
      if (!sid) sid = await startSession(opts.userId);

      setSending(true);
      setError(null);

      const optimisticMsg = {
        id: `u-${Date.now()}`,
        from: "user",
        text,
        ts: Date.now(),
      };

      setMessages((prev) => [...prev, optimisticMsg]);

      try {
        const res = await chatApi.sendMessage(sid, text);

        if (res?.conversation) {
          if (mountedRef.current) setMessages(res.conversation);
          return res.conversation.at(-1);
        }

        if (res?.message) {
          if (mountedRef.current)
            setMessages((prev) => [...prev, res.message]);
          return res.message;
        }

        return res;
      } catch (err) {
        setError(err);
        if (mountedRef.current) {
          setMessages((prev) => prev.filter((m) => m.id !== optimisticMsg.id));
        }
        throw err;
      } finally {
        if (mountedRef.current) setSending(false);
      }
    },
    [sessionId, startSession]
  );

  const clear = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    sessionId,
    setSessionId,
    messages,
    loading,
    sending,
    error,
    startSession,
    refreshConversation,
    sendMessage,
    clear,
  };
}
