import { Alert } from "@fifthrevision/mosaic/alert";
import { Button } from "@fifthrevision/mosaic/button";
import { Component, type ComponentType, type ReactNode } from "react";

type Props = { Component: ComponentType };
type State = { error: Error | null };

class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex flex-col gap-3">
          <Alert variant="error">
            <span className="font-mono">{this.state.error.message}</span>
          </Alert>
          <pre className="max-h-32 overflow-auto rounded-md bg-surface-card-subdued p-3 font-mono text-caption text-label-secondary">
            {this.state.error.stack}
          </pre>
          <Button size="sm" onClick={() => this.setState({ error: null })}>
            Retry
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function DesignRenderer({ Component }: Props) {
  return (
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  );
}
