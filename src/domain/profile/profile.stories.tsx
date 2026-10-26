import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import type { ProfileHtmlFrameProps } from "../../types/domain/profile/profile-html-frame-props.js";
import { Button } from "../../ui/button.js";

import { EditProfileDialog } from "./edit-profile-dialog.js";
import { ProfileBannerDialog } from "./profile-banner-dialog.js";
import { ProfileBioDialog } from "./profile-bio-dialog.js";
import { ProfileCommunityShelf } from "./profile-community-shelf.js";
import { ProfileExperiencesSection } from "./profile-experiences-section.js";
import { ProfileExplorePanel } from "./profile-explore-panel.js";
import { ProfileGamificationPanel } from "./profile-gamification-panel.js";
import { ProfileNetworkDialog } from "./profile-network-dialog.js";
import { ProfileProjectsSection } from "./profile-projects-section.js";
import { ProfileQuickComposer } from "./profile-quick-composer.js";
import { ProfileResumeDialog } from "./profile-resume-dialog.js";
import { ProjectFormDialog } from "./project-form-dialog.js";
import { ProjectsManager } from "./projects-manager.js";

const meta: Meta = {
  title: "Domain/Profile",
};

export default meta;

// Stories have no sandboxed frame: a plain srcdoc iframe stands in for the app's.
function frame({ html, title, className }: ProfileHtmlFrameProps) {
  return <iframe srcDoc={html} title={title} className={className} sandbox="" />;
}

const projects = [
  {
    id: "p1",
    title: "Énóis Connect",
    stack: ["React", "TypeScript"],
    repoUrl: "https://github.com/exemplo/connect",
    status: "em andamento",
    diary: [
      { date: "2026-09-01", text: "Primeira versão no ar." },
      { date: "2026-10-01", text: "Perfil com projetos." },
    ],
  },
  {
    id: "p2",
    title: "Card em HTML",
    stack: [],
    repoUrl: null,
    status: null,
    diary: [],
    html: "<h2>Meu projeto</h2>",
  },
];

export const Panels: StoryObj = {
  render: () => (
    <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
      <ProfileGamificationPanel
        profile={{ reputation: 42, badges: [] }}
        isOwner
        postsCount={12}
        walletBalance="1.250"
        walletHref="#"
      />

      <div className="space-y-4">
        <ProfileCommunityShelf
          communities={[
            {
              id: "c1",
              name: "Mulheres na Tecnologia",
              topicLabel: "Tecnologia",
              members: 1280,
              href: "#",
            },
          ]}
          loading={false}
          communitiesHref="#"
        />
        <ProfileExplorePanel dailyGamesHref="#" appearanceHref="#" />
      </div>
    </div>
  ),
};

export const Sections: StoryObj = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <ProfileQuickComposer profile={{ name: "Ana Souza" }} onPublish={async () => true} />
      <ProfileProjectsSection
        projects={projects}
        isOwner
        onManage={() => undefined}
        renderHtmlFrame={frame}
      />
      <ProfileExperiencesSection
        experiences={[
          {
            id: "e1",
            title: "Desenvolvedora front-end",
            company: "Énóis",
            location: "São Paulo",
            description: "Interfaces do app e do design system.",
            currentlyHere: true,
            startLabel: "jan. 2023",
            endLabel: null,
            months: 34,
          },
        ]}
      />
    </div>
  ),
};

export const Dialogs: StoryObj = {
  render: function DialogsStory() {
    const [open, setOpen] = useState<string | null>(null);
    const [tab, setTab] = useState<"info" | "experiences" | "education" | "certifications">("info");
    const toggle = (name: string) => (value: boolean) => setOpen(value ? name : null);

    return (
      <div className="flex flex-wrap gap-2">
        <EditProfileDialog
          profile={{ username: "ana", name: "Ana Souza", openToWork: true, isMentor: false }}
          open={open === "edit"}
          onOpenChange={toggle("edit")}
          tab={tab}
          onTabChange={setTab}
          onSave={async () => null}
          onUploadBadge={async () => "https://placehold.co/80"}
          experiences={[{ id: "x1", title: "Dev", company: "Énóis" } as { id: string }]}
          education={[]}
          certifications={[]}
          listPending={{ experiences: false, education: false, certifications: false }}
          onCreateItem={async () => undefined}
          onUpdateItem={async () => undefined}
          onDeleteItem={() => undefined}
        >
          <Button>Editar perfil</Button>
        </EditProfileDialog>

        <Button onClick={() => setOpen("banner")}>Capa</Button>

        <ProfileBannerDialog
          open={open === "banner"}
          onOpenChange={toggle("banner")}
          initialHtml={null}
          onPickPhoto={() => undefined}
          maxLength={20000}
          onSave={() => setOpen(null)}
          renderHtmlFrame={frame}
        />
        <ProfileBioDialog
          open={open === "bio"}
          onOpenChange={toggle("bio")}
          initialHtml="<p>Olá!</p>"
          maxLength={20000}
          onSave={() => setOpen(null)}
          renderHtmlFrame={frame}
        />
        <ProfileResumeDialog
          resumeUrl="/curriculo.pdf"
          resumeName="curriculo-ana.pdf"
          onUpload={() => undefined}
          onRemove={() => undefined}
        />

        <Button onClick={() => setOpen("network")}>Conexões</Button>

        <ProfileNetworkDialog
          name="Ana"
          kind="connections"
          open={open === "network"}
          onOpenChange={toggle("network")}
          pending={false}
          error={false}
          people={[
            {
              id: "u1",
              username: "bia",
              name: "Bia Lima",
              headline: "Designer",
              avatar: null,
              avatarFrame: null,
              href: "#",
            },
          ]}
        />

        <Button onClick={() => setOpen("manager")}>Projetos</Button>

        <ProjectsManager
          open={open === "manager"}
          onOpenChange={toggle("manager")}
          projects={projects}
          onSave={async () => true}
          onDelete={() => undefined}
          renderHtmlFrame={frame}
        />

        <Button onClick={() => setOpen("project")}>Enviar projeto</Button>

        <ProjectFormDialog
          open={open === "project"}
          onOpenChange={toggle("project")}
          onSave={() => setOpen(null)}
        />
      </div>
    );
  },
};
