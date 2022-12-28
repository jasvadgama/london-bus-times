import { TSearchFormAction, TSearchFormState } from './SearchForm.types';

const reducer = (state: TSearchFormState, action: TSearchFormAction) => {
  switch (action.type) {
    case 'ERROR':
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case 'FETCH':
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case 'SUCCESS':
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export { reducer };
