import { Meta, Story } from "@storybook/react";
import { ComponentProps } from "react";

import { Timer } from ".";

export default {
  title: "Timer",
  component: Timer,
} as Meta;

const _Timer: Story<ComponentProps<typeof Timer>> = (args) => (
  <Timer {...args} />
);

export const Default = _Timer.bind({});

Default.args = {
  start: new Date(1642416994220),
};
