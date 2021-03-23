import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import {
  generateListValues,
  generateRandomSizes,
} from 'test/utils';
import Scroller from './Scroller';
import { ScrollerCellComponentProps } from './ScrollerCell';
import './styles.stories.css';

export default {
  component: Scroller,
  title: 'List',
  argTypes: {
    totalRows: {
      defaultValue: 1000,
    },
    defaultRowHeight: {
      defaultValue: 40,
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
    defaultColumnWidth: { control: false },
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
    totalColumns: { control: false },
    focusedCell: { control: false },
  },
} as Meta;

const ListCellComponent: React.FC<ScrollerCellComponentProps> = ({ value, style }) => (
  <div style={style}>
    {value || 'Loading...'}
  </div>
);

interface ScrollerListProps {
  randomSizes?: boolean;
  totalRows: number;
  defaultRowHeight: number;
  overscroll?: number;
  height?: string | number;
}

const ListTemplate: Story<ScrollerListProps> = ({
  randomSizes,
  totalRows = 1000,
  overscroll = 0,
  height = '100vh',
  defaultRowHeight = 40,
}) => {
  const listValue = generateListValues(totalRows);
  const rowsSizes = randomSizes ? generateRandomSizes(listValue.length, 40, 120) : [];
  return (
    <Scroller
      CellComponent={ListCellComponent}
      value={listValue}
      rowsSizes={rowsSizes}
      overscroll={overscroll}
      height={height}
      defaultRowHeight={defaultRowHeight}
      totalRows={listValue.length}
    />
  );
};

export const list = ListTemplate.bind({});
