import type { Meta, StoryObj } from "@storybook/react-vite";

import { ListRowSkeletons } from "./list-row-skeletons.js";
import { PageSkeleton } from "./page-skeleton.js";

const meta: Meta = {
  title: "Patterns/Skeletons",
};

export default meta;

export const Page: StoryObj = {
  render: () => <PageSkeleton />,
};

export const ListRows: StoryObj = {
  render: () => <ListRowSkeletons count={3} />,
};
