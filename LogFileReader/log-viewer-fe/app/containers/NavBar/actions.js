import {
    CHANGE_ITEM
} from './constants';

export function changeActiveItem(newItem) {
    return {
        type: CHANGE_ITEM,
        activeItem: newItem,
    };
}