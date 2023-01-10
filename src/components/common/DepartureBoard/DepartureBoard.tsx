import { Duration, format } from 'date-fns';
import { FC } from 'react';

import { TStopPointWithPredictions } from '@app-types/stop-point';

import ST from './DepartureBoard.module.scss';

interface IDepartureBoard {
  arrivalPredictions: TStopPointWithPredictions['arrivalPredictions'];
  lastUpdated: number;
}

const EstimatedArrivalTime: FC<{ expectedArrival: Duration }> = ({
  expectedArrival,
}): JSX.Element => {
  const { minutes } = expectedArrival;

  if (minutes === 0) {
    return <>Due</>;
  }

  if (minutes === 1) {
    return <>1 min</>;
  }

  return <>{minutes} mins</>;
};

const DepartureBoard: FC<IDepartureBoard> = ({
  arrivalPredictions,
  lastUpdated,
}): JSX.Element => {
  return (
    <div className={ST['deptarture-board']}>
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
                <td className={ST['deptarture-board-destination']}>
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
        <em>Last updated: {format(lastUpdated, 'Pp')}</em>
      </p>
    </div>
  );
};

export default DepartureBoard;
