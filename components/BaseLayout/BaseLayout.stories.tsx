import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import BaseLayout from "./BaseLayout.view";

export default {
  title: "Components/BaseLayout",
  component: BaseLayout,
  args: {
    children: "test",
  },
} as ComponentMeta<typeof BaseLayout>;

const Template: ComponentStory<typeof BaseLayout> = (args) => <BaseLayout {...args} />;

export const Default = createStoryComponent(Template);
