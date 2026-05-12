import { useEffect, useRef, useState } from "react";

type ReceiverProps = {
  isActive: boolean;
  onStream: (stream: MediaStream) => void;
  signalingUrl?: string;
};

const getDefaultSignalingUrl = () => {
  const host = window.location.hostname || "localhost";
  return `ws://${host}:5000`;
};

export default function Receiver({ isActive, onStream, signalingUrl = getDefaultSignalingUrl() }: ReceiverProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const pc = useRef<RTCPeerConnection | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState("Waiting for phone");

  useEffect(() => {
    if (!isActive) return;

    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });
    const socket = new WebSocket(signalingUrl);

    pc.current = peer;
    ws.current = socket;

    socket.onopen = () => {
      setStatus("Connected to signaling");
      socket.send(JSON.stringify({ type: "receiver-ready" }));
    };
    socket.onerror = () => setStatus("Signaling unavailable");
    socket.onclose = () => setStatus("Disconnected");

    socket.onmessage = async (msg: MessageEvent) => {
      if (!peer || socket.readyState !== WebSocket.OPEN) return;

      const data = JSON.parse(msg.data as string);

      if (data.type === "sender-ready") {
        socket.send(JSON.stringify({ type: "receiver-ready" }));
      }

      if (data.offer) {
        setStatus("Receiving phone camera");
        await peer.setRemoteDescription(data.offer);

        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);

        socket.send(JSON.stringify({ answer }));
      }

      if (data.candidate) {
        await peer.addIceCandidate(data.candidate);
      }
    };

    peer.ontrack = (event) => {
      const [stream] = event.streams;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      onStream(stream);
    };

    peer.onicecandidate = (event) => {
      if (event.candidate && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ candidate: event.candidate }));
      }
    };

    return () => {
      peer.close();
      socket.close();
      pc.current = null;
      ws.current = null;
    };
  }, [isActive, onStream, signalingUrl]);

  if (!isActive) return null;

  return (
    <div className="fixed bottom-40 right-4 z-[120] w-52 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 shadow-2xl backdrop-blur-xl">
      <video ref={videoRef} autoPlay playsInline muted className="h-28 w-full object-cover" />
      <div className="px-3 py-2 text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400">
        {status}
      </div>
    </div>
  );
}
