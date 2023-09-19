import image from "../../images/main_image.svg";
import Image from "./Image";

export default {
  title: "Components/Image",
  component: Image,
};

export const ExampleImage = () => (
  <Image
    className="absolute w-full  max-w-[1440px] pt-11 xs:pt-5 sm:pt-9"
    src={image}
    title="Storybook Test"
  />
);
