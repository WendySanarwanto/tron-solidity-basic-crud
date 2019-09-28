import { TRONWEB_INITIALISED, TRONWEB_NOT_FOUND } from './types';

import Config, { TESTNET, MAINNET } from '../config';
const { inventoryScAddress } = Config;
const TRONLINK_INITIALISATION_WAIT_TIME = 500;

export const doInitialiseTronWeb = () => async dispatch => {
    let payload = null;
    try {
        payload = await new Promise((resolve, reject) => {
            setTimeout( async _ => {
                const tronweb = window.tronWeb;
                if (!tronweb) return resolve(null);

                let currentNet = MAINNET;
                if (tronweb &&  
                    tronweb.solidityNode && 
                    tronweb.solidityNode.host.includes(TESTNET)) {
                    currentNet = TESTNET
                }

                try {
                    const contractAddress = inventoryScAddress[currentNet];
                    const contract = await tronweb.contract().at(contractAddress);
                    resolve({ contract, currentNet, tronweb });
                } catch (_err) {
                    reject(_err);
                }
            }, TRONLINK_INITIALISATION_WAIT_TIME);
        });
    } catch(err) {
        console.log(`[doInitialiseTronWeb] [ERROR] err: ${err.message}`);
    }
    

    dispatch({
        type: payload ? TRONWEB_INITIALISED : TRONWEB_NOT_FOUND,
        payload
    });
}
