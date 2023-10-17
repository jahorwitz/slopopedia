import { Footer } from "./Footer";

export default {
  title: "Components/Footer",
  component: Footer,
};

export const GlobalFooter = () => (
  <Footer>
    <Footer.Content className="font-arial text-gray text-base" />
  </Footer>
);
