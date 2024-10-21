import TableLayout from './components/TableLayout';
import { useEffect, useState } from 'react';
import { ExpenseItem, Pagination } from './Types/componentTypes';
import { Snackbar } from '@mui/material';

const defaultPagination: Pagination = {
  currentPage: 1,
  next: {
    limit: 20,
    page: 2,
  },
  totalPages: 10,
};

const App = () => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [pagination, setPagination] = useState<Pagination>(defaultPagination);
  const [pageNumberRequest, setPageNumberRequest] = useState<number>(1);
  const [expensesLoading, setExpensesLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorToastOpen, setErrorToastOpen] = useState<boolean>(false);

  const fetchExpenses = async () => {
    setExpensesLoading(true);
    try {
      const response = await fetch(
        `https://tip-transactions.vercel.app/api/transactions?page=${pageNumberRequest}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const responseData = await response.json();
      const expensesList: ExpenseItem[] = responseData.transactions;
      const paginationData = {
        currentPage: responseData.currentPage,
        next: responseData.next,
        totalPages: responseData.totalPages,
      };

      console.log('SIMON transactionList', expensesList);
      console.log('SIMON paginationData', paginationData);
      console.log('---------------');

      setExpenses(expensesList);
      setPagination(paginationData);
      setExpensesLoading(false);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      console.error('Error fetching expenses:', err);
      setErrorToastOpen(true);
      setExpensesLoading(false);
    }
  };

  const handleErrorToastClose = () => {
    setErrorToastOpen(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, [pageNumberRequest]);

  return (
    <div id="template-text">
      <TableLayout
        tableDataList={expenses}
        expensesLoading={expensesLoading}
        error={error}
        pagination={pagination}
        setPageNumberRequest={setPageNumberRequest}
      />
      <Snackbar
        open={errorToastOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={4000}
        onClose={handleErrorToastClose}
        message="Oops! Unable to fetch expenses."
      />
    </div>
  );
};

export default App;
