import { combineReducers } from 'redux';
import inventory from './inventoryReducer';
import tron from './tronReducer';

const combinedReducer = combineReducers({
    inventory,
    tron
});

export default combinedReducer;
