import React from 'react';

import { Grid, Segment, Input } from 'semantic-ui-react';
import { DateRangePicker } from 'react-dates';
import { START_DATE, END_DATE } from 'react-dates/constants';
import momentPropTypes from 'react-moment-proptypes';

export default class SearchBar extends React.PureComponent {
    static propTypes = {
        onDatesChange: React.PropTypes.func.isRequired,
        onSearchChange: React.PropTypes.func.isRequired,
        onFocusChange: React.PropTypes.func.isRequired,
        startDate: momentPropTypes.momentObj,
        endDate: momentPropTypes.momentObj,
        searchText: React.PropTypes.string,
        focusedInput: React.PropTypes.oneOf([START_DATE, END_DATE, '']),
    };

    render() {
        const { onDatesChange, onSearchChange, onFocusChange, startDate, endDate, focusedInput, searchText } = this.props;

        return (
            <Segment>
                <Grid>
                    <Grid.Column mobile={16} tablet={5} computer={5}>
                        <DateRangePicker 
                            showClearDates={true} 
                            onDatesChange={onDatesChange}
                            startDate={startDate}
                            endDate={endDate}
                            focusedInput={focusedInput}
                            onFocusChange={onFocusChange}
                        />
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <Input className="DateRangePickerInput" size='big' fluid placeholder='Search...' onChange={onSearchChange} value={searchText} />
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    }
}