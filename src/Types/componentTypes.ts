export type ExpenseItem = {
  id: number;
  merchant: string;
  amount: number;
  // description?: string;
  date: string;
  category: string;
  // status?: string;
};

export type Pagination = {
  currentPage: number;
  next: { limit: number; page: number };
  totalPages: number;
};
