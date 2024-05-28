import purpleGoblin from "../../images/purple-goblin.png";

export function SoundCard({
  children,
  onClick,
  soundInfo,
  containerSize = "full",
  ...rest
}) {
  const card = {
    image: soundInfo?.photo,
    title: soundInfo?.title,
    audio: soundInfo?.audio,
  };

  const handleSoundClick = () => {
    //TO DO - find Fred's audio code and implement here
  };

  return (
    <div className={"col-span-1"}>
      <div
        // Parent div is relative to allow for elements and children to be positioned absolutely
        className={"flex flex-col relative"}
        style={{ position: "relative" }}
        //TO DO - see if onClick and ...rest do anything here
        onClick={onClick}
        {...rest}
      >
        <img
          //TO DO - make sure class names make sense inside of grid
          className={
            "mb-2.5 max-h-[80vh] overflow-hidden hover:cursor-pointer object-contain h-[130px] self-baseline xs:self-center"
          }
          src={!card.image ? purpleGoblin : card.image?.url}
          onClick={() => handleSoundClick()}
        />
        {/*TO DO - see if children is necessary */}
        {children}
      </div>
    </div>
  );
}

export default SoundCard;

SoundCard.displayName = "SoundCard";
