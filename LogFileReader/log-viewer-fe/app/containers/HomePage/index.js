/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';

import SearchBar from '../../components/SearchBar';
import FileTable from '../../components/FileTable';
import { Segment } from 'semantic-ui-react'

import { START_DATE, END_DATE } from 'react-dates/constants';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import momentPropTypes from 'react-moment-proptypes';

import { 
  changeDates,
  changeSearch,
  changeFocused,
  getSearchResult,
} from './actions'

import {
  makeStartDateSelector,
  makeEndDateSelector,
  makeSearchTextSelector,
  makeFocusedInputSelector
} from './selectors';

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
      onDatesChange: React.PropTypes.func.isRequired,
      onSearchChange: React.PropTypes.func.isRequired,
      onFocusChange: React.PropTypes.func.isRequired,
      onSubmit: React.PropTypes.func.isRequired,
      startDate: momentPropTypes.momentObj,
      endDate: momentPropTypes.momentObj,
      focusedInput: React.PropTypes.oneOf([START_DATE, END_DATE, '']),
      searchText: React.PropTypes.string,
  };

  render() {
    const { onDatesChange, onSearchChange, onFocusChange, onSubmit, startDate, endDate, focusedInput, searchText } = this.props;
    return (
      <div>
        <Segment vertical>
          <SearchBar 
            onDatesChange={onDatesChange} 
            onSearchChange={onSearchChange}
            onSubmit={onSubmit}
            startDate={startDate}
            endDate={endDate}
            onFocusChange={onFocusChange}
            focusedInput={focusedInput}
            searchText={searchText}
          />
        </Segment>
        <Segment vertical>
          <FileTable />
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  startDate: makeStartDateSelector(),
  endDate: makeEndDateSelector(),
  searchText: makeSearchTextSelector(),
  focusedInput: makeFocusedInputSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onDatesChange: ({startDate, endDate}) => dispatch(changeDates({startDate, endDate})),
    onSearchChange: (e, {value}) => dispatch(changeSearch({ searchText: value })),
    onFocusChange: (focusedInput) => dispatch(changeFocused({ focusedInput })),
    onSubmit: () => dispatch(getSearchResult()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
