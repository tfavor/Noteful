import React, { Component } from 'react'
 
export default class ErrorBoundry extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hasError: false,
        };
      }
      static getDerivedStateFromError(error) {
        return { hasError: true };
      }
      componentDidCatch(error, errorInfo) {
          this.setState({
              hasError: true
          })
      }
      render() {
        if (this.state.hasError) {
            return <div>oops error has occurred</div>;
        }
         return this.props.children;
      }
}
