export type TSearchFormAction =
  | { type: 'ERROR'; error: string }
  | { type: 'FETCH' }
  | { type: 'SUCCESS' };

export type TSearchFormState = {
  error: string | null;
  isLoading: boolean;
};
