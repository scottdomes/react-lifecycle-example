import React, { Component } from 'react';
import uuid from 'uuid/v4';
import './App.css';
import { initializeGrid, layoutInitialGrid } from './grid';
import { ErrorButton, ErrorBoundary } from './errors';

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
    if (state.blocks.length > 0) {
      return {};
    }

    return { blocks: createBlocks(props.numberOfBlocks) };
  }

  componentDidMount() {
    this.bricks = initializeGrid(this.grid.current);
    layoutInitialGrid(this.bricks);

    this.interval = setInterval(() => {
      this.addBlocks();
    }, 2000);
  }

  addBlocks = () => {
    const newBlocks = createBlocks(5);
    this.setState(prevState => ({
      blocks: prevState.blocks.concat(newBlocks),
    }));
  };

  shouldComponentUpdate(nextProps, nextState) {
    // Only update if bricks change
    return nextState.blocks.length > this.state.blocks.length;
  }

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

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="wrapper">
        <div className="error">
          <ErrorBoundary>
            <ErrorButton />
          </ErrorBoundary>
        </div>

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
