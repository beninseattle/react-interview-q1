import { DetailsList } from '@fluentui/react/lib/DetailsList';

const Table = ({ items, columns }) => {
  const mappedColumns = columns.map((column, i) => ({
    fieldName: column.toLowerCase(),
    key: `column${i}`,
    name: column,
    minWidth: 100
  }));

  return (
    <div>
      List <DetailsList items={items} columns={mappedColumns} />
    </div>
  );
};

export default Table;