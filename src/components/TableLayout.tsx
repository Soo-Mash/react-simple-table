import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import TableRowItem from './TableRowItem';
import { ExpenseItem, Pagination } from '../Types/componentTypes';

interface ITablelayoutProps {
  tableDataList: ExpenseItem[];
  expensesLoading: boolean;
  error: string | null;
  pagination: Pagination;
  setPageNumberRequest: React.Dispatch<React.SetStateAction<number>>;
}

const TableLayout = ({
  tableDataList,
  expensesLoading,
  error,
  pagination,
  setPageNumberRequest,
}: ITablelayoutProps) => {
  const paginationArray = new Array(
    pagination.totalPages <= 5 ? pagination.totalPages : 5
  );

  const generateArrayFromNumber = (startNumber: number, length = 5) => {
    return Array.from({ length }, (_, index) => startNumber + index);
  };

  const handleGoToPage = (pageNo: number) => {
    setPageNumberRequest(pageNo);
  };

  console.log('pagination array ', paginationArray);
  return (
    <>
      <TableContainer component={Paper} sx={{ maxWidth: 1000, margin: 'auto' }}>
        <h1>Expenses</h1>

        <Table sx={{ minWidth: 550, minHeight: 300 }}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Merchant</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
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

      <div>
        <Button
          onClick={() => {
            handleGoToPage(1);
          }}
        >
          First
        </Button>
        {generateArrayFromNumber(
          pagination.currentPage,
          pagination.totalPages <= 5 ? pagination.totalPages : 5
        ).map((_, index) => (
          <Button onClick={() => handleGoToPage(index + 1)}>
            {pagination.currentPage + index}
          </Button>
        ))}
        <Button
          onClick={() => {
            handleGoToPage(pagination.totalPages);
          }}
        >
          Last
        </Button>
      </div>
    </>
  );
};

export default TableLayout;
