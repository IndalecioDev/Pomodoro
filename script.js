     const minutesInput = document.getElementById("minutes");
    const timeDisplay = document.getElementById("time-display");
    const statusText = document.getElementById("status-text");

    const btnStart = document.getElementById("btn-start");
    const btnPause = document.getElementById("btn-pause");
    const btnReset = document.getElementById("btn-reset");

    const musicDot = document.getElementById("music-dot");
    const musicText = document.getElementById("music-text");

    const modeInputs = document.querySelectorAll("input[name='reading-mode']");
    const videoWrapper = document.getElementById("video-wrapper");
    const videoTitle = document.getElementById("video-title");
    const videoFrame = document.getElementById("mode-video");
    const readingModes = {
      chill: {
        name: "Chill",
        video: "https://www.youtube.com/watch?v=QWL5vrp1Hgo"
      },
      misterio: {
        name: "Misterio",
        video: "https://www.youtube.com/watch?v=_58D6roBk1g&t=2094s"
      },
      terror: {
        name: "Terror",
        video: "https://www.youtube.com/watch?v=dcwB95o3UdA&t=3563s"
      },
      sad: {
        name: "Lluvia",
        video: "https://www.youtube.com/watch?v=VUL8PQETF0A"
      },
      celtica: {
        name: "Fantasia",
        video: "https://www.youtube.com/watch?v=DhAJBJnIPr8"
      },
      jazz: {
        name: "Jazz",
        video: "https://www.youtube.com/watch?v=MYPVQccHhAQ"
      },
      hoguera: {
        name: "Hoguera",
        video: "https://www.youtube.com/watch?v=lGphuanCRDk"
      },
      anime: {
        name: "Anime",
        video: "https://www.youtube.com/watch?v=oCV-C8_VFdk"
      }
    };

    function normalizeVideoUrl(url) {
      if (!url) return "";
      try {
        const parsed = new URL(url);
        const host = parsed.hostname.replace(/^www\./, "");

        if (host === "youtu.be") {
          const videoId = parsed.pathname.replace(/^\/+/, "");
          return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
        }

        if (host.includes("youtube.com")) {
          if (parsed.pathname === "/watch") {
            const videoId = parsed.searchParams.get("v");
            return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
          }

          if (parsed.pathname.startsWith("/embed/")) {
            return `https://www.youtube.com${parsed.pathname}`;
          }
        }

        return url;
      } catch (err) {
        return url;
      }
    }

    function buildVideoSrc(baseUrl) {
      if (!baseUrl) return "";
      const normalized = normalizeVideoUrl(baseUrl.trim());
      if (!normalized) return "";
      const separator = normalized.includes("?") ? "&" : "?";
      return `${normalized}${separator}autoplay=1`;
    }

    function stopVideo() {
      videoFrame.src = "";
      videoWrapper.hidden = true;
    }

    let remainingSeconds = 0;
    let timerId = null;
    let isRunning = false;
    let hasLaunchedMedia = false;
    let activeModeName = "";

    function formatTime(sec) {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    }

    function setModeIndicator(message, isActive) {
      if (isActive) {
        musicDot.classList.remove("off");
      } else {
        musicDot.classList.add("off");
      }
      musicText.textContent = message;
    }

    function getSelectedModeKey() {
      for (const input of modeInputs) {
        if (input.checked) {
          return input.value;
        }
      }
      return null;
    }

    function launchModeMedia(modeKey) {
      const mode = readingModes[modeKey];
      if (!mode) return null;

      stopVideo();

      if (mode.video) {
        videoFrame.src = buildVideoSrc(mode.video);
        videoTitle.textContent = `Modo ${mode.name}`;
        videoWrapper.hidden = false;
      }

      hasLaunchedMedia = true;
      activeModeName = mode.name;
      setModeIndicator(`Modo ${mode.name} ambientando tu lectura aquí mismo.`, true);

      return mode;
    }

    function startTimer() {
      if (isRunning) return;

      const mins = parseInt(minutesInput.value, 10);
      if (isNaN(mins) || mins <= 0) {
        alert("Introduce un número válido de minutos.");
        return;
      }

      const modeKey = getSelectedModeKey();
      if (!modeKey) {
        alert("Elige un tipo de lectura antes de empezar.");
        return;
      }

      if (remainingSeconds <= 0) {
        remainingSeconds = mins * 60;
      }

      if (!hasLaunchedMedia) {
        launchModeMedia(modeKey);
      } else if (activeModeName) {
        setModeIndicator(`Modo ${activeModeName} sigue ambientando.`, true);
      }

      isRunning = true;
      statusText.textContent = "Lectura en marcha, mantén el enfoque.";
      minutesInput.disabled = true;

      timerId = setInterval(() => {
        remainingSeconds--;
        timeDisplay.textContent = formatTime(remainingSeconds);

        if (remainingSeconds <= 0) {
          clearInterval(timerId);
          timerId = null;
          isRunning = false;
          statusText.textContent = "Tiempo terminado. Respira y celebra.";
          minutesInput.disabled = false;
          hasLaunchedMedia = false;
          activeModeName = "";
          stopVideo();
          setModeIndicator("Sesión completada. Ambientación detenida.", false);
        }
      }, 1000);
    }

    function pauseTimer() {
      if (!isRunning) return;

      clearInterval(timerId);
      timerId = null;
      isRunning = false;
      statusText.textContent = "Temporizador en pausa.";
      minutesInput.disabled = false;

      if (activeModeName) {
        setModeIndicator(`Modo ${activeModeName} sigue ambientando aunque el temporizador esté en pausa.`, true);
      }
    }

    function resetTimer() {
      clearInterval(timerId);
      timerId = null;
      isRunning = false;

      const mins = parseInt(minutesInput.value, 10) || 25;
      remainingSeconds = mins * 60;

      timeDisplay.textContent = formatTime(remainingSeconds);
      statusText.textContent = "Listo para iniciar otra sesión.";
      minutesInput.disabled = false;

      hasLaunchedMedia = false;
      activeModeName = "";
      stopVideo();
      setModeIndicator("Elige un modo para iniciar la ambientación.", false);
    }

    minutesInput.addEventListener("change", () => {
      if (!isRunning) {
        const mins = parseInt(minutesInput.value, 10);
        if (mins > 0) {
          remainingSeconds = mins * 60;
          timeDisplay.textContent = formatTime(remainingSeconds);
        }
      }
    });

    modeInputs.forEach((input) => {
      input.addEventListener("change", () => {
        const mode = readingModes[input.value];
        if (!mode) return;

        if (hasLaunchedMedia) {
          stopVideo();
          hasLaunchedMedia = false;
          activeModeName = "";
        }

        setModeIndicator(`Modo ${mode.name} listo. Pulsa empezar.`, false);
      });
    });

    btnStart.addEventListener("click", startTimer);
    btnPause.addEventListener("click", pauseTimer);
    btnReset.addEventListener("click", resetTimer);

    remainingSeconds = parseInt(minutesInput.value, 10) * 60;
    timeDisplay.textContent = formatTime(remainingSeconds);

    const initialMode = readingModes[getSelectedModeKey()];
    if (initialMode) {
      setModeIndicator(`Modo ${initialMode.name} listo. Pulsa empezar.`, false);
    } else {
      setModeIndicator("Elige un modo para iniciar la ambientación.", false);
    }
