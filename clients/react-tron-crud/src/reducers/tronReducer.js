import { TRONWEB_INITIALISED } from '../actions/types';

const INITIAL_STATE = {
    tronWeb: {}
};

const tronReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case TRONWEB_INITIALISED: 
            return {...state, ...action.payload};
        default: 
            return state;
    }
}

export default tronReducer;
