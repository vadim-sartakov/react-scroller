import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import {
  generateGridValues,
  generateRandomSizes,
} from '../../test/utils';
import GridScroller, { GridScrollerProps } from './GridScroller';

export default {
  component: GridScroller,
  title: 'Scroller/Grid/Sync',
  argTypes: {
    totalRows: {
      control: {
        type: 'number',
      },
      defaultValue: 1000,
    },
    totalColumns: {
      control: {
        type: 'number',
      },
      defaultValue: 50,
    },
    defaultRowHeight: {
      control: {
        type: 'number',
      },
      defaultValue: 40,
    },
    defaultColumnWidth: {
      control: {
        type: 'number',
      },
      defaultValue: 120,
    },
    randomSizes: {
      control: {
        type: 'boolean',
      },
      name: 'Random sizes',
    },
    overscroll: {
      control: {
        type: 'number',
      },
      defaultValue: 2,
    },
    focusedCell: {
      type: 'object',
      control: {
        type: 'object',
      },
      defaultValue: { row: 0, cell: 0 },
    },
  },
} as Meta;

type GridScrollerStoryProps<T> = GridScrollerProps<T> & {
  randomSizes?: boolean;
};

const GridTemplate: Story<GridScrollerStoryProps<any>> = ({
  randomSizes,
  totalRows = 1000,
  totalColumns = 50,
  overscroll = 0,
  focusedCell,
  height = '100vh',
  width,
  defaultRowHeight = 40,
  defaultColumnWidth = 120,
}) => {
  const gridValue = generateGridValues(totalRows, totalColumns);
  const rowsSizes = randomSizes ? generateRandomSizes(gridValue.length, 40, 120) : [];
  const columnsSizes = randomSizes ? generateRandomSizes(gridValue[0].length, 80, 250) : [];
  return (
    <GridScroller
      value={gridValue}
      rowsSizes={rowsSizes}
      columnsSizes={columnsSizes}
      overscroll={overscroll}
      focusedCell={focusedCell}
      height={height}
      defaultRowHeight={defaultRowHeight}
      defaultColumnWidth={defaultColumnWidth}
      totalRows={gridValue.length}
      totalColumns={gridValue[0].length}
      width={width}
      rowComponentProps={{ className: 'row' }}
      render={({ value, style }) => (
        <div className="cell" style={style}>
          {value}
        </div>
      )}
    />
  );
};

export const sync = GridTemplate.bind({});
