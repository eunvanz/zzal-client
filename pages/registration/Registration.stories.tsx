import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Registration from "./Registration.view";

export default {
  title: "Pages/Registration",
  component: Registration,
  args: {},
} as ComponentMeta<typeof Registration>;

const Template: ComponentStory<typeof Registration> = (args) => (
  <Registration {...args} />
);

export const Default = createStoryComponent(Template);
