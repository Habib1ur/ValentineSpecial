onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);

  const video = document.querySelector(".night__video");

  if (!video) {
    return;
  }

  const tryPlayWithSound = async () => {
    video.muted = false;
    try {
      await video.play();
      return true;
    } catch (error) {
      video.muted = true;
      try {
        await video.play();
      } catch (playError) {
        return false;
      }
    }
    return false;
  };

  tryPlayWithSound();

  const resumeWithSound = () => {
    tryPlayWithSound();
    document.removeEventListener("pointerdown", resumeWithSound);
    document.removeEventListener("keydown", resumeWithSound);
  };

  document.addEventListener("pointerdown", resumeWithSound);
  document.addEventListener("keydown", resumeWithSound);
};
