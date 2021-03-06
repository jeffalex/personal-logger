// @flow

import React, { Component } from 'react';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import List from 'react-virtualized/dist/es/List';
import { ROUTES } from '../constants';
import ExerciseEntry from '../components/ExerciseEntry';
import CreateLink from '../components/CreateLink';
import LoadingSpinner from '../components/LoadingSpinner';

import type { RowRendererParams, Exercise } from '../types';

type Props = {
  exercise: Array<Exercise> | null,
};

export default class ListExercise extends Component<Props> {
  render() {
    const { exercise } = this.props;

    if (exercise === null) {
      return <LoadingSpinner />;
    } else {
      return [
        <AutoSizer key="AutoSizer">
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              rowCount={exercise.length}
              rowHeight={54 /* 3rem */}
              rowRenderer={this._rowRenderer}
            />
          )}
        </AutoSizer>,
        <CreateLink key="Link" to={ROUTES.exercise.new} />,
      ];
    }
  }

  _rowRenderer = ({ key, index, style }: RowRendererParams) => {
    // $FlowFixMe We know this is not null in this case
    const exercise = this.props.exercise[index];

    return <ExerciseEntry exercise={exercise} key={key} style={style} />;
  };
}
