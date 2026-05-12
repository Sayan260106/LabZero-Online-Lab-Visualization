import { useEffect, useRef, useState } from "react";

const getDefaultSignalingUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const url = params.get("signal");
  if (url) return url;

  const host = window.location.hostname || "localhost";
  return `ws://${host}:5000`;
};

export default function Sender() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const pc = useRef<RTCPeerConnection | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const offerStartedRef = useRef(false);
  const [status, setStatus] = useState("Starting phone camera");

  useEffect(() => {
    const socket = new WebSocket(getDefaultSignalingUrl());

    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });
    ws.current = socket;
    pc.current = peer;

    // Receive answer + ICE from receiver
    socket.onmessage = async (msg: MessageEvent) => {
      if (!peer) return;

      const data = JSON.parse(msg.data as string);

      if (data.type === "receiver-ready") {
        startCamera();
      }

      if (data.answer) {
        await peer.setRemoteDescription(data.answer);
        setStatus("Streaming to LabZero");
      }

      if (data.candidate) {
        await peer.addIceCandidate(data.candidate);
      }
    };

    peer.onicecandidate = (event) => {
      if (event.candidate && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ candidate: event.candidate }));
      }
    };

    socket.onopen = () => {
      setStatus("Connected. Open Phone mode in LabZero.");
      socket.send(JSON.stringify({ type: "sender-ready" }));
    };
    socket.onerror = () => setStatus("Could not reach signaling server");
    socket.onclose = () => setStatus("Disconnected");

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      peer.close();
      socket.close();
    };
  }, []);

  const startCamera = async () => {
    if (!pc.current || !ws.current || ws.current.readyState !== WebSocket.OPEN) return;
    if (offerStartedRef.current) return;
    offerStartedRef.current = true;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
        audio: false
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      stream.getTracks().forEach((track) => {
        pc.current?.addTrack(track, stream);
      });

      const offer = await pc.current.createOffer();
      await pc.current.setLocalDescription(offer);

      ws.current.send(JSON.stringify({ offer }));
      setStatus("Waiting for LabZero receiver");
    } catch (error) {
      console.error("Phone camera failed", error);
      offerStartedRef.current = false;
      setStatus("Camera permission failed");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="h-screen w-full object-cover"
      />
      <div className="fixed inset-x-0 bottom-0 bg-slate-950/80 p-5 text-center backdrop-blur-xl">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-indigo-300">{status}</p>
      </div>
    </main>
  );
}
