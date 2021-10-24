import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import SearchInput from "./SearchInput.view";

export default {
  title: "Components/SearchInput",
  component: SearchInput,
  argTypes: {
    isSearching: {
      type: "boolean",
    },
  },
  args: {},
} as ComponentMeta<typeof SearchInput>;

const Template: ComponentStory<typeof SearchInput> = (args) => <SearchInput {...args} />;

export const Default = createStoryComponent(Template);
