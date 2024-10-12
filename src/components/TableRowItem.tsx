import { TableRow, TableCell } from '@mui/material';
import dayjs from 'dayjs';
import { ExpenseItem } from '../Types/componentTypes';

interface TableRowItemProps {
  item: ExpenseItem;
}

const TableRowItem = ({ item }: TableRowItemProps) => {
  return (
    <TableRow key={item.id}>
      <TableCell>{dayjs(item?.date).format('D MMM YYYY')}</TableCell>
      <TableCell>{item.merchant}</TableCell>
      <TableCell>{item.amount}</TableCell>
      <TableCell>{item.category}</TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell>{item.status}</TableCell>
    </TableRow>
  );
};

export default TableRowItem;
