import { TRONWEB_INITIALISED, TRONWEB_NOT_FOUND } from '../actions/types';

const INITIAL_STATE = {
    contract: null,
    currentNet: 'N/A',
    tronWeb: null
};

const tronReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case TRONWEB_INITIALISED: 
            return {...state, ...action.payload};
        case TRONWEB_NOT_FOUND:
            return {...state, ...INITIAL_STATE}
        default: 
            return state;
    }
}

export default tronReducer;
