import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import {
  generateGridValues,
  generateRandomSizes,
} from 'test/utils';
import GridScroller from './GridScroller';
import { GridScrollerCellComponentProps } from './GridScrollerCell';

export default {
  component: GridScroller,
  title: 'Scroller/Grid',
  argTypes: {
    totalRows: {
      defaultValue: 1000,
    },
    totalColumns: {
      defaultValue: 50,
    },
    defaultRowHeight: {
      defaultValue: 40,
    },
    defaultColumnWidth: {
      defaultValue: 120,
    },
    randomSizes: {
      control: {
        type: 'boolean',
      },
      name: 'Random sizes',
    },
    overscroll: {
      defaultValue: 2,
    },
    height: { control: false },
    width: { control: false },
    rowsScrollData: { control: false },
    onRowsScrollDataChange: { control: false },
    columnsScrollData: { control: false },
    onColumnsScrollDataChange: { control: false },
    rowsSizes: { control: false },
    columnsSizes: { control: false },
    RowComponent: { control: false },
    rowComponentProps: { control: false },
    CellComponent: { control: false },
    value: { control: false },
    focusedCell: { control: false },
  },
} as Meta;

const GridCellComponent: React.FC<GridScrollerCellComponentProps<string>> = ({ value, style }) => (
  <div className="cell" style={style}>
    {value || 'Loading...'}
  </div>
);

interface ScrollerListProps {
  randomSizes?: boolean;
  totalRows: number;
  totalColumns: number;
  defaultRowHeight: number;
  defaultColumnWidth: number;
  overscroll?: number;
  height?: string | number;
  width?: string | number;
}

const GridTemplate: Story<ScrollerListProps> = ({
  randomSizes,
  totalRows = 1000,
  totalColumns = 50,
  overscroll = 0,
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
      CellComponent={GridCellComponent}
      value={gridValue}
      rowsSizes={rowsSizes}
      columnsSizes={columnsSizes}
      overscroll={overscroll}
      height={height}
      defaultRowHeight={defaultRowHeight}
      defaultColumnWidth={defaultColumnWidth}
      totalRows={gridValue.length}
      totalColumns={gridValue[0].length}
      width={width}
      rowComponentProps={{ className: 'row' }}
    />
  );
};

export const grid = GridTemplate.bind({});
