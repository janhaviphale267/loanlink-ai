import { useState, useRef, useCallback } from "react";

export default function useVoice({ mimeType = "audio/webm" } = {}) {
  const [recording, setRecording] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [blob, setBlob] = useState(null);
  const [error, setError] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const start = useCallback(async () => {
    setError(null);
    setPermissionDenied(false);

    if (!navigator.mediaDevices?.getUserMedia) {
      setError(new Error("Media devices not supported"));
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType });

      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data?.size) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: mimeType });
        setBlob(audioBlob);
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start();
      setRecording(true);
    } catch (err) {
      if (
        err.name === "NotAllowedError" ||
        err.name === "PermissionDeniedError"
      ) {
        setPermissionDenied(true);
      } else {
        setError(err);
      }
      setRecording(false);
    }
  }, [mimeType]);

  const stop = useCallback(() => {
    try {
      mediaRecorderRef.current?.stop();
    } catch (err) {
      console.warn("Recorder stop error", err);
    } finally {
      setRecording(false);
    }
  }, []);

  const clear = useCallback(() => {
    setBlob(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    chunksRef.current = [];
    setError(null);
  }, [audioUrl]);

  const upload = useCallback(
    async (uploadFn) => {
      if (!blob) throw new Error("No recording to upload");
      if (typeof uploadFn !== "function")
        throw new Error("uploadFn must be a function");
      return uploadFn(blob, {});
    },
    [blob]
  );

  return {
    recording,
    audioUrl,
    blob,
    error,
    permissionDenied,
    start,
    stop,
    clear,
    upload,
  };
}
