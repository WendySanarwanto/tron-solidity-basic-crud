import { TRONWEB_INITIALISED } from './types';

export const doInitialiseTronWeb = _ => {
    // TODO: Intiialise tronweb
    let tronweb = {};
    
    return {
        type: TRONWEB_INITIALISED,
        payload: tronweb
    };
}
