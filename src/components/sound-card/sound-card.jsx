import { useSounds } from "../../hooks/use-sounds";
import purpleGoblin from "../../images/purple-goblin.png";

export function SoundCard({ soundInfo }) {
  const card = {
    image: soundInfo?.photo,
    title: soundInfo?.title,
    audio: soundInfo?.audio,
  };

  const { playSound } = useSounds();

  function handleSoundClick() {
    console.log(card.audio);
    playSound("https://" + card.audio);
  }

  return (
    <img
      className={
        "overflow-hidden hover:cursor-pointer object-cover h-[130px] w-[130px] self-baseline xs:self-center"
      }
      src={!card.image ? purpleGoblin : card.image?.url}
      onClick={() => handleSoundClick()}
    />
  );
}

export default SoundCard;

SoundCard.displayName = "SoundCard";
