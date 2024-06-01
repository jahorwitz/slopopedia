import { useRef } from "react";
import { SoundContext } from "./sound-context";

// To use a sound in a component:
// import 'useSounds' into the component
// const { playSound } = useSounds();
// playsound('sound url')

export const SoundContextProvider = ({ children }) => {
  const audioRef = useRef(null);

  const playSound = (audioUrl) => {
    audioRef.current.src = audioUrl;
    audioRef.current.play();
  };

  return (
    <SoundContext.Provider value={{ playSound }}>
      <audio ref={audioRef} />
      {children}
    </SoundContext.Provider>
  );
};
