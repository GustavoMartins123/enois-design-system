import type { Meta, StoryObj } from "@storybook/react-vite";

import { ErrorBanner } from "./error-banner.js";
import { InfiniteScroll } from "./infinite-scroll.js";
import { ModuleDisabledView } from "./module-disabled-view.js";

const meta: Meta = {
  title: "Patterns/Feedback",
};

export default meta;

export const ErrorWithDetails: StoryObj = {
  render: () => (
    <ErrorBanner
      message="E-mail ou senha incorretos."
      details={["HTTP 401", "INVALID_CREDENTIALS", "POST /auth/login"]}
      hint="Confira os dados ou use 'Esqueci minha senha'."
    />
  ),
};

export const InfiniteScrollLoading: StoryObj = {
  render: () => (
    <InfiniteScroll hasMore loading onLoadMore={() => {}} loadingLabel="Carregando mais..." />
  ),
};

export const InfiniteScrollEnd: StoryObj = {
  render: () => (
    <InfiniteScroll
      hasMore={false}
      loading={false}
      onLoadMore={() => {}}
      endLabel="Você chegou ao fim."
    />
  ),
};

export const ModuleDisabled: StoryObj = {
  render: () => <ModuleDisabledView onReenable={() => {}} backHref="#" />,
};
