import TableLayout from './components/TableLayout';
import { useEffect, useState } from 'react';
import { ExpenseItem } from './Types/componentTypes';
import { Snackbar } from '@mui/material';

const App = () => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [expensesLoading, setExpensesLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorToastOpen, setErrorToastOpen] = useState<boolean>(false);

  const fetchExpenses = async () => {
    setExpensesLoading(true);
    try {
      const response = await fetch(
        'https://expenses-backend-mu.vercel.app/expenses',
        {
          headers: {
            'Content-Type': 'application/json',
            Username: 'simon.jones',
          },
        }
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data: ExpenseItem[] = await response.json();
      setExpenses(data);
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
  }, []);

  return (
    <div id="template-text">
      <TableLayout
        tableDataList={expenses}
        expensesLoading={expensesLoading}
        error={error}
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
