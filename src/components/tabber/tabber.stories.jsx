import { Tabber } from "./tabber";

export default {
  title: "Components/Tabber",
  component: Tabber,
};

export const ExampleTabber = () => {
  return (
    <Tabber>
      <Tabber.TabList tabs={["SLOPS TO GOBBLE()", "SLOPS IVE GOBBLED()"]} />
      <Tabber.TabPanels>
        <Tabber.TabPanel>First Tab Content</Tabber.TabPanel>
        <Tabber.TabPanel>Second Tab Content</Tabber.TabPanel>
      </Tabber.TabPanels>
    </Tabber>
  );
};
