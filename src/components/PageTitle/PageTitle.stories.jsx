import { PageTitle } from "./PageTitle";

export default {
  title: "Components/PageTitle",
  component: PageTitle,
};

export const ExamplePageTitle = () => (
  <PageTitle className="h-6 w-36 font-bold" title="Storybook Test" />
);
