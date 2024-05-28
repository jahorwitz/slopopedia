import SoundCard from "./sound-card/sound-card";

export const SoundCardList = ({ sounds }) => {
  return (
    <>
      <div className="grid grid-cols-5 md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 gap-5">
        {sounds?.map((sound) => (
          <SoundCard key={sound.id} soundInfo={sound} />
        ))}
      </div>
    </>
  );
};

SoundCardList.displayName = "SoundCardList";
