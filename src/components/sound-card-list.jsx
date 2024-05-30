import SoundCard from "./sound-card/sound-card";

export const SoundCardList = ({ sounds }) => {
  return (
    <>
      <div className="grid grid-cols-8 lg: grid-cols-7 md:grid-cols-7 sm:grid-cols-2 xs:grid-cols-1 gap-5">
        {sounds?.map((sound) => (
          <SoundCard key={sound.id} soundInfo={sound} />
        ))}
      </div>
    </>
  );
};

SoundCardList.displayName = "SoundCardList";
