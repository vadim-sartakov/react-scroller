import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import {
  generateListValues,
  generateRandomSizes,
} from 'test/utils';
import ListScroller from './ListScroller';
import { ListScrollerProps } from './types';

export default {
  component: ListScroller,
  title: 'Scroller/List/Sync',
  argTypes: {
    totalRows: {
      control: {
        type: 'number',
      },
      defaultValue: 1000,
    },
    defaultRowHeight: {
      control: {
        type: 'number',
      },
      defaultValue: 40,
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
  },
} as Meta;

interface ListScrollerStoryProps<T> extends ListScrollerProps<T> {
  randomSizes?: boolean;
}

const ListTemplate: Story<ListScrollerStoryProps<any>> = ({
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

export const sync = ListTemplate.bind({});
