import { MemoryRouter } from "react-router";
import { PageTitle, Segment } from "./page-title";

export const meta = {
  title: "PageTitle",
  description:
    "Page title with optional chevron-separated segments for hierarchical pages.",
};

export const Standalone = () => <PageTitle>All Runs</PageTitle>;

export const TwoLevels = () => (
  <MemoryRouter>
    <PageTitle>
      <Segment to="/agents/abc/runs">All Runs</Segment>
      <Segment>Run a1917af6</Segment>
    </PageTitle>
  </MemoryRouter>
);

export const ThreeLevels = () => (
  <MemoryRouter>
    <PageTitle>
      <Segment to="/agents/abc/runs">All Runs</Segment>
      <Segment to="/agents/abc/runs/xyz">Run a1917af6</Segment>
      <Segment>Plan 2</Segment>
    </PageTitle>
  </MemoryRouter>
);

export const WithIconOnLeaf = () => (
  <MemoryRouter>
    <PageTitle>
      <Segment to="/capabilities/connectors">Connectors</Segment>
      <Segment
        icon={
          <span
            aria-hidden="true"
            className="inline-block size-5 rounded-sm bg-shape-secondary"
          />
        }
      >
        GitHub
      </Segment>
    </PageTitle>
  </MemoryRouter>
);
