import Link from 'next/link';
import { FC } from 'react';

import { TStopData } from '@app-types/stop-point';

import ST from './ResultItem.module.scss';

interface IResultItem {
  item: TStopData;
}

const ResultItem: FC<IResultItem> = ({ item }) => {
  const { id, lines, stopLetter, towards } = item;

  return (
    <Link className={ST['result-item']} href={`/stop/${id}`}>
      <h2>Stop {stopLetter}</h2>
      {!!towards && <p>Towards {towards}</p>}
      <p>
        <b>Lines:</b> {lines.map((line) => line).join(', ')}{' '}
      </p>
    </Link>
  );
};

export default ResultItem;
