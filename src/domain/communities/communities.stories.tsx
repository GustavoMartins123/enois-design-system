import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { CommunityCardSkeletons } from "./community-card-skeletons.js";
import { CommunityCard } from "./community-card.js";
import { CommunityFavoriteButton } from "./community-favorite-button.js";

const meta: Meta = {
  title: "Domain/Communities",
};

export default meta;

const community = {
  id: "c1",
  name: "Mulheres na Tecnologia",
  description:
    "Troca de experiências, vagas e mentorias para mulheres que trabalham com tecnologia.",
  topicLabel: "Tecnologia",
  members: 1280,
  joined: false,
  cover: null,
  avatar: null,
};

export const Card: StoryObj = {
  render: function CardStory() {
    const [joined, setJoined] = useState(false);
    const [favorite, setFavorite] = useState(false);

    return (
      <div className="max-w-sm">
        <CommunityCard
          community={{ ...community, joined }}
          href="#"
          joinPending={false}
          leavePending={false}
          ownerBlocked={false}
          onJoin={() => setJoined(true)}
          onLeave={() => setJoined(false)}
          favorite={
            <CommunityFavoriteButton
              isFavorite={favorite}
              pending={false}
              onToggle={() => setFavorite((value) => !value)}
            />
          }
        />
      </div>
    );
  },
};

export const OwnerBlocked: StoryObj = {
  render: () => (
    <div className="max-w-sm">
      <CommunityCard
        community={{ ...community, joined: true }}
        href="#"
        joinPending={false}
        leavePending={false}
        ownerBlocked
        onJoin={() => {}}
        onLeave={() => {}}
      />
    </div>
  ),
};

export const Loading: StoryObj = {
  render: () => <CommunityCardSkeletons count={3} />,
};
