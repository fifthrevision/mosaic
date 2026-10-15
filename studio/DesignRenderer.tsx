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
        <div className="rounded border border-ruby-300 bg-ruby-50 p-4 text-caption">
          <p className="font-mono font-bold text-ruby-600">
            {this.state.error.message}
          </p>
          <pre className="mt-2 max-h-32 overflow-auto text-caption text-ruby-500">
            {this.state.error.stack}
          </pre>
          <button
            className="mt-3 text-caption text-label-link underline"
            onClick={() => this.setState({ error: null })}
          >
            Retry
          </button>
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
