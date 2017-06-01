import { fromJS } from 'immutable';

import {
    CHANGE_ITEM,
    HOME_ITEM
} from './constants';

const initialState = fromJS({
    activeItem: HOME_ITEM,
});

function NavBarReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ITEM:
      return state
        .set('activeItem', action.activeItem);
    default:
      return state;
  }
}

export default NavBarReducer;