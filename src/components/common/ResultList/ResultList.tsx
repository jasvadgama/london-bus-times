import { FC } from 'react';

import { TStopData } from '@app-types/stop-point';

import ResultItem from './ResultItem';
import ST from './ResultList.module.scss';

interface IResultList {
  results?: TStopData[];
}

const ResultList: FC<IResultList> = ({ results }) => {
  if (!results || results.length < 1) {
    return null;
  }

  return (
    <ul className={ST['result-list']}>
      {results?.map((item) => (
        <li key={item.id}>
          <ResultItem item={item} />
        </li>
      ))}
    </ul>
  );
};

export default ResultList;
