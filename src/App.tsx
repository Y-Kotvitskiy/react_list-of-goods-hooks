import React, { useState } from 'react';
import classname from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

type Goods = string[];

enum SortType {
  Alphabetically,
  ByLengt,
  Default,
}

enum SortDirection {
  Acs,
  Desc,
}

export const goodsFromServer: Goods = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const sortListAlphabetically = (
  goods: Goods,
  sortDirection: SortDirection,
): Goods => {
  goods.sort((good1, good2) => good1.localeCompare(good2));
  if (sortDirection === SortDirection.Desc) {
    goods.reverse();
  }

  return goods;
};

const sortListByLength = (
  goods: Goods,
  sortDirection: SortDirection,
): Goods => {
  goods.sort((good1, good2) => good1.length - good2.length);
  if (sortDirection === SortDirection.Desc) {
    goods.reverse();
  }

  return goods;
};

const getGoods = (
  sortType: SortType,
  sortDirection: SortDirection = SortDirection.Acs,
): Goods => {
  const goods = [...goodsFromServer];

  switch (sortType) {
    case SortType.Alphabetically:
      return sortListAlphabetically(goods, sortDirection);
    case SortType.ByLengt:
      return sortListByLength(goods, sortDirection);
    case SortType.Default:
      if (sortDirection === SortDirection.Desc) {
        return goods.reverse();
      } else {
        return goodsFromServer;
      }

    default:
      return goodsFromServer;
  }
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.Acs,
  );

  const goods = getGoods(sortType, sortDirection);
  const showResetButton =
    sortType !== SortType.Default || sortDirection !== SortDirection.Acs;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classname('button', 'is-info', {
            'is-light': sortType !== SortType.Alphabetically,
          })}
          onClick={() => {
            setSortType(SortType.Alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classname('button', 'is-success', {
            'is-light': sortType !== SortType.ByLengt,
          })}
          onClick={() => {
            setSortType(SortType.ByLengt);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classname('button', 'is-warning', {
            'is-light': sortDirection !== SortDirection.Desc,
          })}
          onClick={() => {
            setSortDirection(
              sortDirection ? SortDirection.Acs : SortDirection.Desc,
            );
          }}
        >
          Reverse
        </button>

        {showResetButton ? (
          <button
            type="button"
            className={classname('button', 'is-danger', 'is-light')}
            onClick={() => {
              setSortType(SortType.Default);
              setSortDirection(SortDirection.Acs);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>
      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
