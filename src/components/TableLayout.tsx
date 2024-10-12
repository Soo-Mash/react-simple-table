import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import TableRowItem from './TableRowItem';
import { ExpenseItem } from '../Types/componentTypes';

interface ITablelayoutProps {
  tableDataList: ExpenseItem[];
  expensesLoading: boolean;
  error: string | null;
}

const TableLayout = ({
  tableDataList,
  expensesLoading,
  error,
}: ITablelayoutProps) => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 1000, margin: 'auto' }}>
      <h1>Expenses</h1>

      <Table sx={{ minWidth: 550, minHeight: 300 }}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Merchant</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ minHeight: 200 }}>
          <div className="info-text-container">
            {expensesLoading && <div>LOADING</div>}
          </div>

          {!expensesLoading && !error && (
            <>
              {tableDataList.map((item) => (
                <TableRowItem item={item} />
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableLayout;
