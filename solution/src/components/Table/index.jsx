import { DetailsList, DetailsRow } from '@fluentui/react/lib/DetailsList';
import { SelectionMode } from '@fluentui/react';
import { useCallback } from 'react';

/*
 * Choosing to use DetailsList for this table was a poor choice. Styling it for use as a responsive
 * table was just terrible, no good, unfun
 */
const Table = ({ items, columns }) => {
  const mappedColumns = columns.map((column, i) => ({
    fieldName: column.toLowerCase(),
    key: `column${i}`,
    name: column,
    minWidth: 100
  }));

  const onRenderRow = useCallback(props => {
    const customStyles = {};
    if (props) {
      if (props.itemIndex % 2 === 0) {
        // Every other row renders with a different background color
        customStyles.root = { backgroundColor: '#eeeeee' };
      }

      return <DetailsRow {...props} styles={customStyles} />;
    }
    return null;
  }, []);
  return (
    <div>
      <DetailsList
        items={items}
        columns={mappedColumns}
        checkboxVisibility={false}
        onRenderRow={onRenderRow}
        selectionMode={SelectionMode.none}
      />
    </div>
  );
};

export default Table;