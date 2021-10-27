import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import NotFound from "./NotFound.view";

export default {
  title: "Components/NotFound",
  component: NotFound,
  args: {},
} as ComponentMeta<typeof NotFound>;

const Template: ComponentStory<typeof NotFound> = (args) => <NotFound {...args} />;

export const Default = createStoryComponent(Template);
