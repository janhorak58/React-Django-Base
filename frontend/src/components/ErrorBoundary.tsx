import { Component } from "react";
import Error from "./Error";
interface ErrorBoundaryProps {}

interface ErrorBoundaryState {
  hasError: boolean;
}


class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Error/>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
