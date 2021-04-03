import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import {
  generateListValues,
  generateRandomSizes,
} from 'test/utils';
import ListScroller from './ListScroller';

export default {
  component: ListScroller,
  title: 'Scroller/List',
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
    height: { control: false },
    rowsScrollData: { control: false },
    onRowsScrollDataChange: { control: false },
    rowsSizes: { control: false },
    RowComponent: { control: false },
    rowComponentProps: { control: false },
    value: { control: false },
    focusedCell: { control: false },
  },
} as Meta;

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
    <ListScroller
      value={listValue}
      rowsSizes={rowsSizes}
      overscroll={overscroll}
      height={height}
      defaultRowHeight={defaultRowHeight}
      totalRows={listValue.length}
      render={({ value, style }) => (
        <div style={style}>
          {value}
        </div>
      )}
    />
  );
};

export const list = ListTemplate.bind({});
