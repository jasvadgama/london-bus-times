import { Duration, format } from 'date-fns';
import { FC } from 'react';

import { TStopPointWithPredictions } from '@app-types/stop-point';

import styles from './DepartureBoard.module.scss';

interface IDepartureBoard {
  arrivalPredictions: TStopPointWithPredictions['arrivalPredictions'];
  lastUpdated: number;
}

const EstimatedArrivalTime: FC<{ expectedArrival: Duration }> = ({
  expectedArrival,
}) => {
  const { minutes } = expectedArrival;

  if (!minutes) {
    return <>Due</>;
  }

  return (
    <>
      {minutes} min{minutes !== 1 && 's'}
    </>
  );
};

const DepartureBoard: FC<IDepartureBoard> = ({
  arrivalPredictions,
  lastUpdated,
}) => {
  return (
    <div className={styles['departure-board']}>
      <table summary="Arrival times at the stop">
        <thead>
          <tr>
            <th>Route</th>
            <th>Destination</th>
            <th>Due in</th>
          </tr>
        </thead>
        <tbody>
          {arrivalPredictions?.map(
            ({ destinationName, expectedArrival, lineId, lineName }, index) => (
              <tr key={`${lineId}_${index}`}>
                <td>{lineName}</td>
                <td className={styles['departure-board-destination']}>
                  {destinationName}
                </td>
                <td>
                  <EstimatedArrivalTime expectedArrival={expectedArrival} />
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>

      <p>
        <em>Last updated: {format(lastUpdated, "pp 'on' dd/MM/yyyy")}</em>
      </p>
    </div>
  );
};

export default DepartureBoard;
