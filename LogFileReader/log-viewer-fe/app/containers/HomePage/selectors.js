import { createSelector } from 'reselect';

const homePageSelector = (state) => state.get('homePage');

const makeStartDateSelector = () => createSelector(
  homePageSelector,
  (startDateState) => startDateState.get('startDate')
);

const makeEndDateSelector = () => createSelector(
  homePageSelector,
  (endDateState) => endDateState.get('endDate')
);

const makeSearchTextSelector = () => createSelector(
  homePageSelector,
  (searchTextState) => searchTextState.get('searchText')
);

const makeFocusedInputSelector = () => createSelector(
  homePageSelector,
  (focusedInputState) => focusedInputState.get('focusedInput')
);

export {
  homePageSelector,
  makeStartDateSelector,
  makeEndDateSelector,
  makeSearchTextSelector,
  makeFocusedInputSelector
};
