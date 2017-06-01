import { createSelector } from 'reselect';

const selectItem = (state) => state.get('navbar');

const makeSelectActiveItem = () => createSelector(
  selectItem,
  (activeItemState) => activeItemState.get('activeItem')
);

export {
  selectItem,
  makeSelectActiveItem,
};
