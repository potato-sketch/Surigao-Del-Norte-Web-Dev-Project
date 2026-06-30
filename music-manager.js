(() => {
  const STORAGE_ENABLED = "sdn_music_enabled";
  const STORAGE_TRACK = "sdn_music_track";
  const AUDIO_ID = "sdnGlobalMusic";
  const CONTROLS_ID = "sdnMusicControls";
  const DEFAULT_VOLUME = 0.6;
  const TRACKS = {
    lofi: {
      label: "LOFI",
      src: "/music/lofi-music.mp3",
    },
    beach: {
      label: "BEACH",
      src: "/music/beach-ambience.mp3",
    },
  };

  function getAudio() {
    let audio = document.getElementById(AUDIO_ID);
    if (audio) return audio;

    audio = document.createElement("audio");
    audio.id = AUDIO_ID;
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = DEFAULT_VOLUME;
    audio.style.display = "none";
    document.body.appendChild(audio);
    return audio;
  }

  function getEnabled() {
    return localStorage.getItem(STORAGE_ENABLED) === "true";
  }

  function setEnabled(enabled) {
    localStorage.setItem(STORAGE_ENABLED, enabled ? "true" : "false");
  }

  function getTrackName(defaultTrack = "lofi") {
    const stored = localStorage.getItem(STORAGE_TRACK);
    return TRACKS[stored] ? stored : defaultTrack;
  }

  function setTrackName(trackName) {
    if (TRACKS[trackName]) {
      localStorage.setItem(STORAGE_TRACK, trackName);
    }
  }

  async function playTrack(trackName, options = {}) {
    const { forceEnable = false, defaultTrack = "lofi" } = options;
    const resolvedTrack = TRACKS[trackName] ? trackName : defaultTrack;
    const audio = getAudio();
    audio.volume = DEFAULT_VOLUME;
    audio.muted = false;

    setTrackName(resolvedTrack);

    if (forceEnable) {
      setEnabled(true);
    }

    if (!getEnabled() && !forceEnable) {
      syncControls();
      return;
    }

    if (!audio.src || !audio.src.endsWith(TRACKS[resolvedTrack].src)) {
      audio.src = TRACKS[resolvedTrack].src;
    }

    try {
      await audio.play();
    } catch {
      // Browser autoplay restrictions are acceptable here.
    }

    syncControls();
  }

  function pause() {
    const audio = getAudio();
    audio.muted = true;
    audio.pause();
    setEnabled(false);
    syncControls();
  }

  function toggle(defaultTrack = "lofi") {
    if (getEnabled()) {
      pause();
      return;
    }

    setEnabled(true);
    playTrack(getTrackName(defaultTrack), { defaultTrack });
  }

  function switchTrack() {
    const next = getTrackName() === "lofi" ? "beach" : "lofi";
    setTrackName(next);
    if (getEnabled()) {
      playTrack(next, { defaultTrack: next });
    } else {
      syncControls();
    }
  }

  function injectStyles() {
    if (document.getElementById("sdnMusicStyles")) return;

    const style = document.createElement("style");
    style.id = "sdnMusicStyles";
    style.textContent = `
      .music-controls {
        position: fixed;
        top: 14px;
        left: 14px;
        z-index: 14000;
        display: flex;
      }
      .music-toggle-button {
        border: none;
        background: transparent;
        padding: 0;
        cursor: pointer;
        transition: transform 0.12s ease;
      }
      .music-toggle-button:hover {
        transform: translate(-2px, -2px);
      }
      .music-toggle-button:active {
        transform: translate(1px, 1px);
      }
      .music-toggle-button img {
        display: block;
        width: 54px;
        height: auto;
      }
      .music-toggle-button .hover {
        display: none;
      }
      .music-toggle-button:hover .normal,
      .music-toggle-button:focus-visible .normal {
        display: none;
      }
      .music-toggle-button:hover .hover,
      .music-toggle-button:focus-visible .hover {
        display: block;
      }
      @media (max-width: 768px) {
        .music-controls {
          top: 10px;
          left: 10px;
        }
        .music-toggle-button img {
          width: 46px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function syncControls() {
    const controls = document.getElementById(CONTROLS_ID);
    if (!controls) return;

    const toggleButton = controls.querySelector("[data-role='toggle']");
    const enabled = getEnabled();

    if (toggleButton) {
      toggleButton.setAttribute(
        "aria-label",
        enabled ? "Mute music" : "Play music",
      );
      toggleButton.setAttribute(
        "title",
        enabled ? `Music on: ${TRACKS[getTrackName()].label}` : "Music off",
      );

      const normal = toggleButton.querySelector(".normal");
      const hover = toggleButton.querySelector(".hover");
      const normalSrc = enabled ? "/music_buttons/music.png" : "/music_buttons/mute.png";
      const hoverSrc = enabled ? "/music_buttons/music-hover.png" : "/music_buttons/mute-hover.png";

      if (normal) normal.src = normalSrc;
      if (hover) hover.src = hoverSrc;
    }
  }

  function mountControls(options = {}) {
    const { defaultTrack = "lofi" } = options;
    injectStyles();

    let controls = document.getElementById(CONTROLS_ID);
    if (!controls) {
      controls = document.createElement("div");
      controls.id = CONTROLS_ID;
      controls.className = "music-controls";

      const toggleButton = document.createElement("button");
      toggleButton.type = "button";
      toggleButton.dataset.role = "toggle";
      toggleButton.className = "music-toggle-button";
      toggleButton.innerHTML = `
        <img class="normal" src="/music_buttons/mute.png" alt="" aria-hidden="true" />
        <img class="hover" src="/music_buttons/mute-hover.png" alt="" aria-hidden="true" />
      `;
      toggleButton.addEventListener("click", () => toggle(defaultTrack));

      controls.appendChild(toggleButton);
      document.body.appendChild(controls);
    }

    syncControls();

    if (getEnabled()) {
      playTrack(getTrackName(defaultTrack), { defaultTrack });
    }
  }

  window.musicManager = {
    mountControls,
    playTrack,
    pause,
    toggle,
    switchTrack,
    getEnabled,
    getTrackName,
    setTrackName,
    setEnabled,
  };
})();
