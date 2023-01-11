import { useRouter } from 'next/router';
import { FC, useReducer } from 'react';

import Button from '@components/ui/Button';
import ErrorMessage from '@components/ui/ErrorMessage';
import FormRow from '@components/ui/FormRow';
import Input from '@components/ui/Input';

import { ISearchFormProps, TSearchFormState } from './SearchForm.types';
import { reducer } from './SearchForm.utils';

const SearchForm: FC<ISearchFormProps> = ({ initialValue }): JSX.Element => {
  const INITIAL_STATE: TSearchFormState = {
    error: null,
    isLoading: false,
  };
  const [{ error, isLoading }, dispatch] = useReducer(reducer, INITIAL_STATE);
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch({ type: 'FETCH' });

    const target = e.target as typeof e.target & {
      searchTerm: { value: string };
    };
    const searchTerm = target.searchTerm.value.trim();
    const searchTermRegex = /\d{5}/gi;

    if (searchTerm.length === 5 && searchTermRegex.test(searchTerm)) {
      // valid code, redirect to stop page
      return router.push(`/stop/${searchTerm}`);
    }

    // invalid code entered
    dispatch({ type: 'ERROR', error: 'Please enter a valid SMS code' });
  };

  return (
    <form action="/search" method="GET" onSubmit={handleSubmit}>
      <FormRow>
        <Input
          autoComplete="off"
          id="searchTerm"
          name="searchTerm"
          pattern="\d{5}"
          type="text"
          defaultValue={initialValue || ''}
        >
          SMS code
        </Input>
      </FormRow>

      {!!error && (
        <FormRow>
          <ErrorMessage>{error}</ErrorMessage>
        </FormRow>
      )}

      <FormRow isActionRow>
        <Button
          disabled={isLoading}
          level="primary"
          loading={isLoading}
          loadingCopy="Searching"
          type="submit"
        >
          Find stop
        </Button>
      </FormRow>
    </form>
  );
};

export default SearchForm;
