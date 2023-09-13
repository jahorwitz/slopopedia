import { Tab } from "@headlessui/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { TabList } from "./tab-list";
import { TabPanels } from "./tab-panels";
import { Tabber } from "./tabber";

test("Switches tabs", () => {
  //1) Render component
  render(
    <Tabber>
      <Tab.Group>
        <TabList />
        <TabPanels />
      </Tab.Group>
    </Tabber>
  );

  //2) Assert initial expectations
  screen.getByTestId("tab1");
  screen.getByTestId("tab2");

  //3) Do Something
  fireEvent.click(screen.getByTestId("tab1", { selected: true }));
  fireEvent.click(screen.getByTestId("tab2", { selected: true }));

  //4) Assert final expectations
  expect(screen.getByTestId("tab1")).toBeTruthy();
  expect(screen.getByTestId("tab2")).toBeTruthy();
});
