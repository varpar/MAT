"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SERIF, SANS, T } from "./tokens";
import { Sep } from "./Punc";

/* ─────────────────────────────────────────────────────────────
   Custom premium video player for the Featured hero reels.

   • Editorial poster + centred "Play the film" affordance before
     the visitor has interacted.
   • After first play, a thin custom controls bar at the bottom:
     play/pause, mm:ss / mm:ss time, spacer, mute, fullscreen.
   • Progress bar is sage (T.sage). Track + buffered indication
     in muted white. Scrubber dot appears while hovering / dragging.
   • Click anywhere on the frame to toggle play/pause once started.
   • Controls auto-fade ~2.8 s after the last mouse move while
     playing. They stay visible while paused.
   • prefers-reduced-motion is respected (no transforms on hover).
   ───────────────────────────────────────────────────────────── */

type Props = {
  src: string;
  poster: string;
  /** Display duration shown in the initial overlay (e.g. "3:00"). */
  duration: string;
  /** Aria label for the initial play button. */
  label: string;
};

const formatTime = (s: number) => {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

/* Parse a display-duration string ("3:00", "1:23:45") into seconds. Used as
   the initial videoDuration so the progress bar fills from the very first
   frame even if the browser is slow to fire loadedmetadata. */
const parseDuration = (s: string): number => {
  const parts = s.trim().split(":").map((p) => Number(p));
  if (parts.some((n) => !isFinite(n))) return 0;
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 1) return parts[0];
  return 0;
};

/* ─── Icons — thin line / filled-minimum to match the editorial brand ─── */

const PlayIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden>
    <path d="M3 1.6 L13.4 8 L3 14.4 Z" fill="currentColor" />
  </svg>
);

const PauseIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={(size * 16) / 14} viewBox="0 0 14 16" aria-hidden>
    <rect x="2" y="1" width="2.5" height="14" fill="currentColor" />
    <rect x="9.5" y="1" width="2.5" height="14" fill="currentColor" />
  </svg>
);

const VolumeIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M2.4 6.4 L2.4 11.6 L5.2 11.6 L9.6 14.6 L9.6 3.4 L5.2 6.4 Z" fill="currentColor" />
    <path d="M12.6 5.2 C14.1 7 14.1 11 12.6 12.8" />
    <path d="M14.8 3.4 C17.2 6 17.2 12 14.8 14.6" />
  </svg>
);

const MutedIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M2.4 6.4 L2.4 11.6 L5.2 11.6 L9.6 14.6 L9.6 3.4 L5.2 6.4 Z" fill="currentColor" />
    <line x1="13" y1="6" x2="17.6" y2="12" />
    <line x1="17.6" y1="6" x2="13" y2="12" />
  </svg>
);

const FullscreenIcon = ({ size = 15 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M2 6 L2 2 L6 2" />
    <path d="M14 6 L14 2 L10 2" />
    <path d="M2 10 L2 14 L6 14" />
    <path d="M14 10 L14 14 L10 14" />
  </svg>
);

const ExitFullscreenIcon = ({ size = 15 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M6 2 L6 6 L2 6" />
    <path d="M10 2 L10 6 L14 6" />
    <path d="M6 14 L6 10 L2 10" />
    <path d="M10 14 L10 10 L14 10" />
  </svg>
);

/* ─── Thin control button ─── */

function ControlButton({
  children,
  onClick,
  ariaLabel,
  width = 32,
}: {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
  width?: number;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="mat-film-btn"
      style={{
        width,
        height: 32,
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.85,
        transition: "opacity 180ms ease",
      }}
    >
      {children}
    </button>
  );
}

export function FilmPlayer({ src, poster, duration, label }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  // Seeded from the display prop so the progress bar fills correctly even
  // if `loadedmetadata` is slow / never fires. Overwritten by the real video
  // duration as soon as the browser knows it (via several signal events).
  const [videoDuration, setVideoDuration] = useState(() =>
    parseDuration(duration),
  );
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [scrubbing, setScrubbing] = useState(false);
  const [scrubHover, setScrubHover] = useState(false);

  /* Show controls; if playing and not scrubbing, fade after a beat. */
  const wakeControls = useCallback(() => {
    setControlsVisible(true);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (playing && !scrubbing) {
      idleTimer.current = setTimeout(() => setControlsVisible(false), 2800);
    }
  }, [playing, scrubbing]);

  /* Re-evaluate idle timer whenever play / scrub state changes. */
  useEffect(() => {
    wakeControls();
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [wakeControls]);

  /* Fullscreen state sync (esc, browser UI, etc). */
  useEffect(() => {
    const sync = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  /* Keyboard: space toggles play, M toggles mute, F toggles fullscreen
     when the player has focus or is the active section. Only listen when
     started so we don't intercept space on other pages. */
  useEffect(() => {
    if (!started) return;
    const onKey = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement) && !document.fullscreenElement) {
        // Only when player is in focus / fullscreen — avoids hijacking page scroll.
        return;
      }
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "m" || e.key === "M") {
        toggleMute();
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
  };

  const toggleFullscreen = async () => {
    const c = containerRef.current;
    if (!c) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await c.requestFullscreen?.();
      }
    } catch {
      /* ignore — some browsers reject without a user gesture path. */
    }
  };

  const initialPlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play().catch(() => {
      /* Some browsers still block unmuted autoplay until a fuller gesture.
         Fall back to muted; the user can unmute via the control. */
      v.muted = true;
      setMuted(true);
      v.play().catch(() => {});
    });
    setStarted(true);
  };

  const seekFromPointer = (clientX: number) => {
    const bar = progressRef.current;
    if (!bar || !videoRef.current || videoDuration <= 0) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    videoRef.current.currentTime = pct * videoDuration;
  };

  const filledPct =
    videoDuration > 0 ? (currentTime / videoDuration) * 100 : 0;
  const bufferedPct =
    videoDuration > 0 ? Math.min(100, (bufferedEnd / videoDuration) * 100) : 0;

  return (
    <div
      ref={containerRef}
      className="mat-film"
      tabIndex={-1}
      onMouseMove={started ? wakeControls : undefined}
      onTouchStart={started ? wakeControls : undefined}
      style={{
        position: "absolute",
        inset: 0,
        background: "#000",
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          setCurrentTime(v.currentTime);
          // Defensive: some browsers don't fire loadedmetadata reliably with
          // preload="metadata" — make sure we capture duration here too.
          if (isFinite(v.duration) && v.duration > videoDuration) {
            setVideoDuration(v.duration);
          }
        }}
        onLoadedMetadata={(e) => {
          if (isFinite(e.currentTarget.duration)) {
            setVideoDuration(e.currentTarget.duration);
          }
        }}
        onDurationChange={(e) => {
          if (isFinite(e.currentTarget.duration)) {
            setVideoDuration(e.currentTarget.duration);
          }
        }}
        onCanPlay={(e) => {
          if (isFinite(e.currentTarget.duration)) {
            setVideoDuration(e.currentTarget.duration);
          }
        }}
        onLoadedData={(e) => {
          if (isFinite(e.currentTarget.duration)) {
            setVideoDuration(e.currentTarget.duration);
          }
        }}
        onEnded={() => setPlaying(false)}
        onProgress={(e) => {
          const v = e.currentTarget;
          if (v.buffered.length > 0) {
            setBufferedEnd(v.buffered.end(v.buffered.length - 1));
          }
        }}
        onClick={started ? togglePlay : undefined}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          background: "#000",
          cursor: started ? "pointer" : "default",
        }}
      />

      {/* Initial poster overlay — editorial play affordance, only before
          the very first play. */}
      {!started && (
        <button
          type="button"
          onClick={initialPlay}
          aria-label={label}
          className="mat-film-init"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.32) 100%)",
            cursor: "pointer",
            border: "none",
            padding: 0,
            color: "#fff",
          }}
        >
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 18,
            }}
          >
            <span
              aria-hidden
              className="mat-film-init-circle"
              style={{
                width: 92,
                height: 92,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.75)",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 280ms ease, transform 280ms ease",
              }}
            >
              <svg
                width="22"
                height="26"
                viewBox="0 0 22 26"
                aria-hidden
                style={{ marginLeft: 4, fill: "currentColor" }}
              >
                <path d="M0 0 L22 13 L0 26 Z" />
              </svg>
            </span>
            <span
              style={{
                fontFamily: SERIF,
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(20px, 2.4vw, 28px)",
                letterSpacing: "0.005em",
              }}
            >
              Play the film
            </span>
            <span
              style={{
                fontFamily: SANS,
                fontSize: 10,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                opacity: 0.82,
              }}
            >
              {duration}
              <Sep />
              With sound
            </span>
          </span>
        </button>
      )}

      {/* Custom controls bar (after first play) */}
      {started && (
        <div
          className={`mat-film-controls ${controlsVisible ? "visible" : ""}`}
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={() => setControlsVisible(true)}
        >
          {/* Progress bar */}
          <div
            ref={progressRef}
            className="mat-film-progress"
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={Math.floor(videoDuration)}
            aria-valuenow={Math.floor(currentTime)}
            tabIndex={0}
            onMouseEnter={() => setScrubHover(true)}
            onMouseLeave={() => setScrubHover(false)}
            onPointerDown={(e) => {
              setScrubbing(true);
              seekFromPointer(e.clientX);
              e.currentTarget.setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => {
              if (scrubbing) seekFromPointer(e.clientX);
            }}
            onPointerUp={(e) => {
              setScrubbing(false);
              try {
                e.currentTarget.releasePointerCapture(e.pointerId);
              } catch {
                /* pointerCapture already released */
              }
            }}
            onKeyDown={(e) => {
              const v = videoRef.current;
              if (!v) return;
              if (e.key === "ArrowRight") {
                v.currentTime = Math.min(videoDuration, v.currentTime + 5);
              } else if (e.key === "ArrowLeft") {
                v.currentTime = Math.max(0, v.currentTime - 5);
              }
            }}
            style={{
              position: "relative",
              height: 16, // generous hit area; visual bar is thinner
              cursor: "pointer",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* The visual track (slim) — sits within the larger hit area */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: scrubHover || scrubbing ? 5 : 3,
                background: "rgba(255,255,255,0.18)",
                borderRadius: 999,
                transition: "height 180ms ease",
                overflow: "visible",
              }}
            >
              {/* Buffered range */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: `${bufferedPct}%`,
                  background: "rgba(255,255,255,0.22)",
                  borderRadius: 999,
                }}
              />
              {/* Played range (sage) */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: `${filledPct}%`,
                  background: T.sage,
                  borderRadius: 999,
                }}
              />
              {/* Scrubber dot — appears on hover / drag */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: "50%",
                  left: `${filledPct}%`,
                  transform: "translate(-50%, -50%)",
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: T.sage,
                  boxShadow: "0 0 0 3px rgba(67,108,103,0.18)",
                  opacity: scrubHover || scrubbing ? 1 : 0,
                  transition: "opacity 200ms ease",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* Controls row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <ControlButton
              onClick={togglePlay}
              ariaLabel={playing ? "Pause" : "Play"}
              width={34}
            >
              {playing ? <PauseIcon size={13} /> : <PlayIcon size={15} />}
            </ControlButton>

            <div
              style={{
                fontFamily: SANS,
                fontSize: 11,
                letterSpacing: "0.06em",
                fontVariantNumeric: "tabular-nums",
                color: "#fff",
                marginLeft: 8,
                opacity: 0.92,
              }}
            >
              <span>{formatTime(currentTime)}</span>
              <span style={{ opacity: 0.45, margin: "0 6px" }}>/</span>
              <span style={{ opacity: 0.7 }}>{formatTime(videoDuration)}</span>
            </div>

            <div style={{ flex: 1 }} />

            <ControlButton
              onClick={toggleMute}
              ariaLabel={muted ? "Unmute" : "Mute"}
            >
              {muted ? <MutedIcon size={17} /> : <VolumeIcon size={17} />}
            </ControlButton>
            <ControlButton
              onClick={toggleFullscreen}
              ariaLabel={
                isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
              }
            >
              {isFullscreen ? (
                <ExitFullscreenIcon size={15} />
              ) : (
                <FullscreenIcon size={15} />
              )}
            </ControlButton>
          </div>
        </div>
      )}

      <style>{`
        .mat-film-controls {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 14px clamp(16px, 3vw, 28px) 14px;
          background:
            linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.62) 100%);
          color: #fff;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 280ms ease, transform 280ms ease;
          pointer-events: none;
        }
        .mat-film-controls.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .mat-film-btn:hover { opacity: 1 !important; }
        .mat-film-init-circle { will-change: transform; }
        .mat-film-init:hover .mat-film-init-circle {
          background: rgba(255,255,255,0.18);
          transform: scale(1.04);
        }
        @media (max-width: 720px) {
          .mat-film-init-circle { width: 76px !important; height: 76px !important; }
          .mat-film-controls { padding: 10px 14px 12px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mat-film-controls { transition: opacity 100ms ease; transform: none !important; }
          .mat-film-init:hover .mat-film-init-circle { transform: none; }
        }
      `}</style>
    </div>
  );
}
