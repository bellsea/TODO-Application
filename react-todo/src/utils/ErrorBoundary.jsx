import Unexpected from "./Unexpected";
import PropTypes from "prop-types";
import React from "react";

/**
 * ライフサイクル中に発生した例外に対する処理
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    return error ? <Unexpected /> : children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.func.isRequired,
};

export default ErrorBoundary;
