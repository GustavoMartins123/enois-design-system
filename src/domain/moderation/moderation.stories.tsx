import type { Meta, StoryObj } from "@storybook/react-vite";

import { AppealsSection } from "./appeals-section.js";
import { ContributorCard } from "./contributor-card.js";
import { ContributorsSection } from "./contributors-section.js";
import { DisputesSection } from "./disputes-section.js";
import { EmailLogSection } from "./email-log-section.js";
import { GamesReviewSection } from "./games-review-section.js";
import { MonitoringSection } from "./monitoring-section.js";
import { PanicModeSection } from "./panic-mode-section.js";
import { ProjectsReviewSection } from "./projects-review-section.js";
import { SupportTicketsSection } from "./support-tickets-section.js";
import { SuspiciousPostsSection } from "./suspicious-posts-section.js";
import { SuspiciousUsersSection } from "./suspicious-users-section.js";
import { TicketReply } from "./ticket-reply.js";

const meta: Meta = {
  title: "Domain/Moderation",
};

export default meta;

const noop = () => {};
const resolved = async () => true;

export const Queues: StoryObj = {
  render: () => (
    <div className="max-w-2xl space-y-8">
      <PanicModeSection active={false} envLocked={false} onActivate={noop} onDeactivate={noop} />
      <AppealsSection
        loading={false}
        appeals={[
          { id: "a1", message: "Foi um engano, era ironia.", createdAtLabel: "18/10/2026, 10:30" },
        ]}
        onApprove={noop}
        onDeny={noop}
      />
      <DisputesSection
        loading={false}
        disputes={[
          {
            id: "d1",
            amountLabel: "1.500",
            reason: "GOLPE",
            createdAtLabel: "18/10/2026, 10:30",
            entryRef: "ref-1234567890abcdef",
          },
        ]}
        onUphold={noop}
        onReject={noop}
      />

      <ContributorsSection loading={false} error={false} empty={false} onRefresh={noop}>
        <ContributorCard
          application={{
            id: "c1",
            name: "Ana Silva",
            github: "ana",
            email: "ana@example.com",
            area: "frontend",
            experience: "pleno",
            message: "Quero ajudar com acessibilidade.",
            status: "NEW",
            createdAtLabel: "18/10/2026, 10:30",
            acceptedTermsAtLabel: "18/10/2026",
          }}
          onReview={noop}
          onApprove={noop}
          onReject={noop}
        />
      </ContributorsSection>

      <EmailLogSection
        loading={false}
        emails={[
          {
            id: "e1",
            toEmail: "ana@example.com",
            subject: "Bem-vinda",
            kind: "WELCOME",
            status: "SENT",
            error: null,
            createdAtLabel: "18/10/2026, 10:30",
          },
          {
            id: "e2",
            toEmail: "bia@example.com",
            subject: "Redefinir senha",
            kind: "PASSWORD_RESET",
            status: "FAILED",
            error: "SMTP timeout",
            createdAtLabel: "18/10/2026, 10:31",
          },
        ]}
      />
    </div>
  ),
};

export const Reviews: StoryObj = {
  render: () => (
    <div className="max-w-2xl space-y-8">
      <GamesReviewSection
        loading={false}
        games={[
          {
            id: "g1",
            userId: "u1",
            username: "ana",
            title: "Corrida",
            description: "Um jogo de corrida.",
            cover: "",
            url: "https://example.com/jogo",
            tags: "corrida",
            aspect: null,
            submittedAtLabel: "18/10/2026",
          },
        ]}
        onApprove={noop}
        onReject={noop}
      />
      <ProjectsReviewSection
        loading={false}
        error={false}
        projects={[
          {
            id: "p1",
            title: "Agenda comunitária",
            username: "ana",
            category: null,
            shortDescription: "Eventos do bairro.",
            url: "https://example.com",
            repoUrl: "https://github.com/ana/agenda",
          },
        ]}
        onApprove={noop}
        onReject={noop}
      />
      <SupportTicketsSection
        history={false}
        locked={false}
        categories={["BUG", "ACCOUNT", "CONTENT", "IDEA", "OTHER"]}
        category={undefined}
        onCategoryChange={noop}
        statusFilters={["ALL", "OPEN", "IN_PROGRESS"]}
        status="ALL"
        onStatusChange={noop}
        loading={false}
        tickets={[
          {
            id: "t1",
            category: "BUG",
            status: "OPEN",
            subject: "Não consigo entrar",
            message: "A página fica carregando.",
            contactEmail: "ana@example.com",
            imageUrl: null,
            adminReply: null,
            githubIssueNumber: 42,
            githubIssueUrl: "https://github.com",
            createdAtLabel: "18/10/2026, 10:30",
            repliedAtLabel: null,
          },
        ]}
        onStart={noop}
        onResolve={noop}
        onReopen={noop}
        renderReply={() => <TicketReply onSubmit={resolved} />}
      />
    </div>
  ),
};

export const Triage: StoryObj = {
  render: () => (
    <div className="max-w-2xl space-y-8">
      <SuspiciousUsersSection
        loading={false}
        error={false}
        users={[
          {
            username: "teste123",
            name: "Teste",
            riskScore: 55,
            staff: false,
            posts: 0,
            comments: 0,
            reportsAgainst: 2,
            signals: ["NOME_SUSPEITO", "EMAIL_NAO_VERIFICADO"],
            createdAtLabel: "18/10/2026",
          },
        ]}
        banTypes={["BAN", "PERMABAN"]}
        onBan={resolved}
      />
      <SuspiciousPostsSection
        loading={false}
        posts={[
          {
            postId: "post-1234567890abcdefgh",
            reportId: "r1",
            score: 80,
            reason: "SPAM",
            signals: ["REASON_SPAM", "NEW_ACCOUNT"],
            href: "#",
          },
        ]}
        onDelete={resolved}
      />
    </div>
  ),
};

const series = Array.from({ length: 60 }, (_, index) => ({
  requests: 40 + Math.round(20 * Math.sin(index / 6)),
  errors4xx: index % 7 === 0 ? 3 : 0,
  errors5xx: index % 13 === 0 ? 1 : 0,
  p95Ms: 120 + (index % 10) * 5,
  p99Ms: 240 + (index % 10) * 8,
  maxMs: 400 + (index % 10) * 20,
  cpuPercent: 20 + (index % 15),
  heapMb: 300 + (index % 20) * 4,
}));

export const Monitoring: StoryObj = {
  render: () => (
    <MonitoringSection
      loading={false}
      overview={{
        uptimeSeconds: 93_784,
        requestsPerSecond: 0.8,
        requestsLastMinute: 48,
        inFlight: 2,
        peakInFlight: 14,
        requestsTotal: 182_330,
        p50Ms: 35,
        p95Ms: 140,
        p99Ms: 280,
        maxMs: 900,
        errors4xxLastMinute: 3,
        errors5xxLastMinute: 0,
        slowLastMinute: 1,
        rateLimitedLastMinute: 0,
        errorRate: 0.6,
        droppedEvents: 0,
        statusCounts: [
          { label: "2xx", count: 4200 },
          { label: "4xx", count: 31 },
        ],
        methodCounts: [{ label: "GET", count: 3900 }],
        topRoutes: [{ label: "GET /feed", count: 1200 }],
        series,
        jvm: { heapUsedBytes: 400 * 1024 ** 2, heapMaxBytes: 1024 ** 3, processors: 2 },
        resources: {
          heapUsedBytes: 400 * 1024 ** 2,
          heapMaxBytes: 1024 ** 3,
          nonHeapUsedBytes: 120 * 1024 ** 2,
          gcCount: 120,
          gcTimeMs: 900,
          threads: 48,
          peakThreads: 60,
          loadedClasses: 18_000,
          processCpuPercent: 22,
          systemCpuPercent: 35,
          loadAverage: 0.7,
          systemMemoryTotalBytes: 4 * 1024 ** 3,
          systemMemoryFreeBytes: 1024 ** 3,
          diskTotalBytes: 20 * 1024 ** 3,
          diskFreeBytes: 12 * 1024 ** 3,
          cgroupMemoryUsedBytes: 900 * 1024 ** 2,
          cgroupMemoryMaxBytes: 2 * 1024 ** 3,
          cgroupCpuCores: 1,
          cgroupCpuPercent: 30,
          dbPool: { active: 2, max: 10, waiting: 0 },
        },
      }}
      onRefresh={noop}
      generatedAtLabel="10:30:00"
      supply={{
        totalLabel: "21.000.000",
        cofreLabel: "20.000.000",
        circulacaoLabel: "1.000.000",
        coerente: true,
      }}
      paused={false}
      onTogglePaused={noop}
      levels={["ERROR", "WARN", "INFO", "DEBUG"]}
      level=""
      onLevelChange={noop}
      types={["HTTP"]}
      type=""
      onTypeChange={noop}
      search=""
      onSearchChange={noop}
      from=""
      to=""
      onFromChange={noop}
      onToChange={noop}
      onLastHour={noop}
      onClearDates={noop}
      onlyFailures={false}
      onOnlyFailures={noop}
      filtered={false}
      rows={[
        {
          id: "ev1",
          createdAt: "2026-10-18T13:30:00Z",
          timeLabel: "10:30:00",
          level: "ERROR",
          type: "HTTP",
          message: "Falha ao salvar o post",
          requestId: "req-1",
          method: "POST",
          path: "/posts",
          route: "/posts",
          status: 500,
          durationMs: 120,
          userId: null,
          clientIp: null,
          metadata: null,
        },
      ]}
      onLoadMore={noop}
    />
  ),
};
