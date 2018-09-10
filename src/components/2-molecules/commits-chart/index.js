import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'underscore';
import { scaleLinear, axisBottom, axisLeft, select } from 'd3';

const Svg = styled.svg`
  width: 100%;
  height: 100%;
`;

class CommitsChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 500,
      height: 500,
    };
    this.container = React.createRef();
    this._updateSize = this._updateSize.bind(this);
  }

  render() {
    const { container } = this;
    const { commits } = this.props;
    const { width, height } = this.state;
    const barWidth = Math.floor(width / 26);
    const { commitCounts, maxCount } = _parseData(commits);
    const xScale = _xScale(width);
    const yScale = _yScale(height, maxCount);
    const xAxis = _xAxis(xScale);
    const yAxis = _yAxis(yScale);
    return (
      <Svg innerRef={container}>
        <g transform="translate(20, 10)">
          <g
            className="xAxisG"
            ref={xAxis}
            transform={`translate(0, ${height - 30})`}
          />
          <g className="yAxisG" ref={yAxis} />
          {commitCounts.map((v, i) => (
            <rect
              key={i}
              x={xScale(i + 1) - barWidth / 2}
              y={yScale(v)}
              width={barWidth}
              height={height - 30 - yScale(v)}
            />
          ))}
        </g>
      </Svg>
    );
  }

  componentDidMount() {
    const { _updateSize } = this;
    _updateSize();
    window.addEventListener('resize', _updateSize);
  }

  componentWillUnmount() {
    const { _updateSize } = this;
    window.removeEventListener('resize', _updateSize);
  }

  _updateSize() {
    const {
      container: { current: svg },
    } = this;
    const width = svg.clientWidth;
    const height = svg.clientHeight;
    this.setState({ width, height });
  }
}

const _parseData = commits => {
  const perMonth = _.countBy(commits, commit => {
    const { date } = commit.commit.committer;
    const yyyymmdd = date.split('T')[0];
    const mm = yyyymmdd.split('-')[1];
    const month = parseInt(mm, 10);
    return month;
  });
  const commitCounts = [...Array(12)].map((v, i) => perMonth[i + 1] || 0);
  const maxCount = _.max(commitCounts);
  return { commitCounts, maxCount };
};

const _xScale = width =>
  scaleLinear()
    .domain([0, 13])
    .range([0, width - 30]);

const _yScale = (height, max) =>
  scaleLinear()
    .domain([0, max])
    .range([height - 30, 0]);

const _xAxis = xScale => el => {
  const axis = axisBottom()
    .scale(xScale)
    .ticks(12)
    .tickSize(4);
  select(el).call(axis);
  select(el)
    .selectAll('text')
    .style('display', d => (d === 0 || d === 13) && 'none');
};

const _yAxis = yScale => el => {
  const axis = axisLeft()
    .scale(yScale)
    .ticks(12)
    .tickSize(4);
  select(el).call(axis);
};

export default CommitsChart;
