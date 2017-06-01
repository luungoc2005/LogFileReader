import React from 'react';
import { Menu } from 'semantic-ui-react';
import { HOME_ITEM } from './constants';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectActiveItem } from './selectors';
import { changeActiveItem } from './actions'

class NavBar extends React.PureComponent {
    static propTypes = {
        changeActiveItem: React.PropTypes.func,
        activeItem: React.PropTypes.string,
    };

    render() {
        const { activeItem } = this.props

        return (
            <div>
                <Menu pointing secondary>
                    <Menu.Item 
                        name={HOME_ITEM} 
                        active={activeItem === HOME_ITEM}
                        onClick={this.props.changeActiveItem}
                    />
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = createSelector(
  makeSelectActiveItem(),
  (activeItem) => ({ activeItem })
);
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeActiveItem: (e, {name}) => dispatch(changeActiveItem(name))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);