import { useContext } from "react";
import { SoundContext } from "../store/sound-context";

export const useSounds = () => useContext(SoundContext);
