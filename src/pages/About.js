import React, { Component } from 'react';

class Inner extends Component {

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>inner</h1>
      </div>
    );
  }
}

class Out extends Component {
  render() {
    return (
      <div>
        <h1>Out</h1>
        {this.props.children}
      </div>
    );
  }
}


class About extends Component {
  render() {
    return (
      <Out val='10'>
        <Inner/>
      </Out>
    );
  }
}


export default About;