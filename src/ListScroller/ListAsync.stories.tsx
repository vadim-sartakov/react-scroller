import { Meta, Story } from '@storybook/react/types-6-0';
import {
  generateListValues,
  generateRandomSizes,
  sleep,
  loadPage,
} from '../test/utils';
import ListScroller, { ListScrollerAsyncProps } from './ListScroller';

export default {
  component: ListScroller,
  title: 'Scroller/List/Async',
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
    focusedCell: {
      control: {
        type: 'number',
      },
    },
    itemsPerPage: {
      control: {
        type: 'number',
      },
      defaultValue: 20,
    },
    loadDelay: {
      control: {
        type: 'number',
      },
      defaultValue: 1000,
    },
  },
} as Meta;

type ListScrollerStoryProps<T> = ListScrollerAsyncProps<T> & {
  randomSizes?: boolean;
  loadDelay?: number;
};

const ListTemplate: Story<ListScrollerStoryProps<any>> = ({
  randomSizes,
  totalRows = 1000,
  overscroll = 0,
  focusedCell,
  itemsPerPage = 20,
  height = '100vh',
  defaultRowHeight = 40,
  loadDelay = 1000,
}) => {
  const listValue = generateListValues(totalRows);
  const rowsSizes = randomSizes ? generateRandomSizes(listValue.length, 40, 120) : [];
  const loadPageAsync = async (page: number, itemsPerPage: number) => {
    console.log('Loading page %s', page);
    await sleep(loadDelay);
    return loadPage(listValue, page, itemsPerPage);
  };
  return (
    <ListScroller<string>
      loadPage={loadPageAsync}
      itemsPerPage={itemsPerPage}
      rowsSizes={rowsSizes}
      overscroll={overscroll}
      height={height}
      focusedCell={focusedCell}
      defaultRowHeight={defaultRowHeight}
      totalRows={listValue.length}
      render={({ value, style }) => (
        <div style={style}>
          {value || 'Loading...'}
        </div>
      )}
    />
  );
};

export const async = ListTemplate.bind({});
