import { Meta, Story } from '@storybook/react/types-6-0';
import {
  generateGridValues,
  generateRandomSizes,
  sleep,
  loadPage,
} from '../test/utils';
import GridScroller, { GridScrollerAsyncProps } from './GridScroller';

export default {
  component: GridScroller,
  title: 'Scroller/Grid/Async',
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

type GridScrollerStoryProps<T> = GridScrollerAsyncProps<T> & {
  randomSizes?: boolean;
  loadDelay?: number;
};

const GridTemplate: Story<GridScrollerStoryProps<any>> = ({
  randomSizes,
  totalRows = 1000,
  totalColumns = 50,
  overscroll = 0,
  itemsPerPage = 20,
  defaultRowHeight = 40,
  defaultColumnWidth = 120,
  loadDelay = 1000,
}) => {
  const gridValue = generateGridValues(totalRows, totalColumns);
  const rowsSizes = randomSizes ? generateRandomSizes(gridValue.length, 40, 120) : [];
  const columnsSizes = randomSizes ? generateRandomSizes(gridValue[0].length, 80, 250) : [];
  const loadPageAsync = async (page: number, itemsPerPage: number) => {
    console.log('Loading page %s', page);
    await sleep(loadDelay);
    return loadPage(gridValue, page, itemsPerPage);
  };
  return (
    <GridScroller
      loadPage={loadPageAsync}
      itemsPerPage={itemsPerPage}
      rowsSizes={rowsSizes}
      columnsSizes={columnsSizes}
      overscroll={overscroll}
      scrollerContainerProps={{
        style: { height: '100vh' },
      }}
      defaultRowHeight={defaultRowHeight}
      defaultColumnWidth={defaultColumnWidth}
      totalRows={gridValue.length}
      totalColumns={gridValue[0].length}
      RowComponent="div"
      rowComponentProps={{ className: 'row' }}
      render={({ value, style }) => (
        <div className="cell" style={style}>
          {value || 'Loading..'}
        </div>
      )}
    />
  );
};

export const async = GridTemplate.bind({});
