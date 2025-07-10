// components/ErrorBoundary.jsx
import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="text-center mt-10 text-red-600">
                    <h2>Something went wrong.</h2>
                    <p>Please try again later or refresh the page.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;