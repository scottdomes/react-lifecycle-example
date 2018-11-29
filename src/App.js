import React, { Component } from 'react';
import uuid from 'uuid/v4';
import Bricks from 'bricks.js';
import './App.css';

const randomInt = (min, max) => {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * (maximum - minimum)) + minimum;
};

const createBlocks = number => {
  const blocks = [];
  for (let i = 0; i < number; i++) {
    blocks.push({
      id: uuid(),
      height: randomInt(100, 200),
    });
  }
  return blocks;
};

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
    };
    this.grid = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    // No access to this
    if (state.blocks.length > 0) {
      return {};
    }

    return { blocks: createBlocks(props.numberOfBlocks) };
  }

  componentDidMount() {
    this.bricks = Bricks({
      container: this.grid.current,
      packed: 'packed',
      sizes: [
        { columns: 2, gutter: 10 },
        { mq: '600px', columns: 3, gutter: 10 },
        { mq: '800px', columns: 4, gutter: 10 },
        { mq: '1000px', columns: 5, gutter: 10 },
        { mq: '1130px', columns: 6, gutter: 12 },
      ],
    });
    this.bricks.resize(true).pack();

    setInterval(() => {
      this.addBlocks();
    }, 2000);
  }

  addBlocks = () => {
    const newBlocks = createBlocks(5);
    this.setState(prevState => ({
      blocks: prevState.blocks.concat(newBlocks),
    }));
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.bricks.pack();

    if (snapshot.isAtBottomOfGrid) {
      window.scrollTo({
        top: this.grid.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.blocks.length < this.state.blocks.length) {
      const grid = this.grid.current;
      const isAtBottomOfGrid =
        window.innerHeight + window.pageYOffset === grid.scrollHeight;

      return { isAtBottomOfGrid };
    }

    return null;
  }

  render() {
    return (
      <div className="wrapper">
        <div className="Grid" ref={this.grid}>
          {this.state.blocks.map(block => (
            <div
              key={block.id}
              style={{ height: block.height }}
              className="grid-item"
            />
          ))}
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return <Grid numberOfBlocks={20} />;
  }
}

export default App;
