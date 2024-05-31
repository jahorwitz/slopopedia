import SoundCard from "./sound-card/sound-card";

export const SoundCardList = ({ sounds }) => {
  return (
    <>
      <div className="flex flex-wrap gap-5">
        {sounds?.map((sound) => (
          <SoundCard key={sound.id} soundInfo={sound} />
        ))}
      </div>
    </>
  );
};

SoundCardList.displayName = "SoundCardList";
