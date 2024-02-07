window.simulatedDataMode = 1 ;

window.developmentMode = 0;

window.DEVEVENT = function(...args) {
    if (window.DevelopmentMode == 1) {
        console.log(args.join(' '));
    }
};

window.LOGEVENT = function(...args) {
    console.log(args.join(' '));
}

window.LOGEVENTRED = function(...args) {

    var argstring = args.join(' ');
    var logstring = '\x1b[31m' + argstring + '\x1b[0m';

    // console.log('\x1b[31mRed text\x1b[0m');
    // console.log('\x1b[32mGreen text\x1b[0m');
    // console.log('\x1b[33mYellow text\x1b[0m');
    // console.log('\x1b[34mBlue text\x1b[0m');
    // console.log('\x1b[35mMagenta text\x1b[0m');
    // console.log('\x1b[36mCyan text\x1b[0m');
 
    console.log(logstring);

};

window.LOGEVENTGREEN = function(...args) {

    var argstring = args.join(' ');
    var logstring = '\x1b[32m' + argstring + '\x1b[0m';

    // console.log('\x1b[31mRed text\x1b[0m');
    // console.log('\x1b[32mGreen text\x1b[0m');
    // console.log('\x1b[33mYellow text\x1b[0m');
    // console.log('\x1b[34mBlue text\x1b[0m');
    // console.log('\x1b[35mMagenta text\x1b[0m');
    // console.log('\x1b[36mCyan text\x1b[0m');
 
    console.log(logstring);

};

window.LOGEVENTYELLOW = function(...args) {

    var argstring = args.join(' ');
    var logstring = '\x1b[33m' + argstring + '\x1b[0m';

    // console.log('\x1b[31mRed text\x1b[0m');
    // console.log('\x1b[32mGreen text\x1b[0m');
    // console.log('\x1b[33mYellow text\x1b[0m');
    // console.log('\x1b[34mBlue text\x1b[0m');
    // console.log('\x1b[35mMagenta text\x1b[0m');
    // console.log('\x1b[36mCyan text\x1b[0m');
 
    console.log(logstring);

};

window.LOGEVENTMAGENTA = function(...args) {

    var argstring = args.join(' ');
    var logstring = '\x1b[35m' + argstring + '\x1b[0m';

    // console.log('\x1b[31mRed text\x1b[0m');
    // console.log('\x1b[32mGreen text\x1b[0m');
    // console.log('\x1b[33mYellow text\x1b[0m');
    // console.log('\x1b[34mBlue text\x1b[0m');
    // console.log('\x1b[35mMagenta text\x1b[0m');
    // console.log('\x1b[36mCyan text\x1b[0m');
 
    console.log(logstring);

};
  
  
window.Z_WAVEFORM_ID = {
    Z_WAVEFORM_ECGI: 0,
    Z_WAVEFORM_ECGII: 1,
    Z_WAVEFORM_ECGIII: 2,
    Z_WAVEFORM_ECGV: 3,
    Z_WAVEFORM_NCO: 4,
    Z_WAVEFORM_Z0NCO: 5,
    Z_WAVEFORM_SPO2RED: 6,
    Z_WAVEFORM_SPO2IR: 7,
    Z_WAVEFORM_SPO2OHMS: 8,
    Z_WAVEFORM_SPO2REDDC: 9,
    Z_WAVEFORM_SPO2IRDC: 10,
    Z_WAVEFORM_RESP: 11,
    Z_WAVEFORM_RESP_AUTO: 12,
    Z_WAVEFORM_TEMP: 13,
    Z_WAVEFORM_NBP: 14,
    Z_WAVEFORM_NBPAC: 15,
    Z_WAVEFORM_IBP: 16,
    Z_WAVEFORM_IBP_DISPLAY: 17,
    Z_WAVEFORM_SPO2RED_NOAMB: 18,
    Z_WAVEFORM_SPO2: 19,
    Z_WAVEFORM_CO2: 20,
    Z_WAVEFORM_CO2_TREND: 21,
    Z_WAVEFORM_ECGAVL: 22,
    Z_WAVEFORM_ECGAVR: 23,
    Z_WAVEFORM_ECGAVF: 24,
    Z_WAVEFORM_IBP2: 25,
    Z_WAVEFORM_IBP2_DISPLAY: 26,
    Z_WAVEFORM_ECGV1: 27,
    Z_WAVEFORM_ECGV2: 28,
    Z_WAVEFORM_ECGV3: 29,
    Z_WAVEFORM_ECGV4: 30,
    Z_WAVEFORM_ECGV5: 31,
    Z_WAVEFORM_ECGV6: 32,
    Z_WAVEFORM_ECGTHUMB: 33,
    Z_WAVEFORM_SPO2_SIGNAL_IQ: 34,
    Z_WAVEFORM_IBP3: 35,
    Z_WAVEFORM_IBP3_DISPLAY: 36,
    Z_WAVEFORM_IBP4: 37,
    Z_WAVEFORM_IBP4_DISPLAY: 38,
    Z_WAVEFORM_CO: 39,
    Z_WAVEFORM_CO_BT: 40,
    Z_WAVEFORM_CO_IT: 41,
    Z_WAVEFORM_TEMP2: 42,
    Z_WAVEFORM_RRA: 43,
    Z_WAVEFORM_PULMONARY_AIR_FLOW: 44,
    Z_WAVEFORM_O2: 45,
    Z_WAVEFORM_AGENT: 46,
    Z_WAVEFORM_N2O: 47,
    Z_WAVEFORM_OFF: 48,
    Z_WAVEFORM_INVALID: 49
};

// Function to convert string to Z_WAVEFORM_ID enum value
function getWaveformIdFromWaveformName(waveformName) {
    // Convert string to uppercase to match enum keys
    const key = waveformName.toUpperCase();

    // Use if-else logic to determine the enum value
    if (key === "ECGI") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_ECGI;
    } else if (key === "ECGII") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_ECGII;
    } else if (key === "ECGIII") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_ECGIII;
    } else if (key === "ECGV") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_ECGV;
    } else if (key === "NCO") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_NCO;
    } else if (key === "Z0NCO") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_Z0NCO;
    } else if (key === "SPO2RED") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_SPO2RED;
    } else if (key === "SPO2IR") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_SPO2IR;
    } else if (key === "SPO2OHMS") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_SPO2OHMS;
    } else if (key === "SPO2REDDC") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_SPO2REDDC;
    } else if (key === "SPO2IRDC") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_SPO2IRDC;
    } else if (key === "RESP") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_RESP;
    } else if (key === "RESP_AUTO") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_RESP_AUTO;
    } else if (key === "TEMP") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_TEMP;
    } else if (key === "NBP") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_NBP;
    } else if (key === "NBPAC") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_NBPAC;
    } else if (key === "IBP") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_IBP;
    } else if (key === "IBP_DISPLAY") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_IBP_DISPLAY;
    } else if (key === "SPO2RED_NOAMB") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_SPO2RED_NOAMB;
    } else if (key === "SPO2") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_SPO2;
    } else if (key === "CO2") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_CO2;
    } else if (key === "CO2_TREND") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_CO2_TREND;
    } else if (key === "ECGAVL") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_ECGAVL;
    } else if (key === "ECGAVR") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_ECGAVR;
    } else if (key === "ECGAVF") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_ECGAVF;
    } else if (key === "IBP2") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_IBP2;
    } else if (key === "IBP2_DISPLAY") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_IBP2_DISPLAY;
    } else if (key === "ECGV1") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_ECGV1;
    } else if (key === "ECGV2") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_ECGV2;
    } else if (key === "ECGV3") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_ECGV3;
    } else if (key === "ECGV4") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_ECGV4;
    } else if (key === "ECGV5") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_ECGV5;
    } else if (key === "ECGV6") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_ECGV6;
    } else if (key === "ECGTHUMB") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_ECGTHUMB;
    } else if (key === "SPO2_SIGNAL_IQ") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_SPO2_SIGNAL_IQ;
    } else if (key === "IBP3") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_IBP3;
    } else if (key === "IBP3_DISPLAY") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_IBP3_DISPLAY;
    } else if (key === "IBP4") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_IBP4;
    } else if (key === "IBP4_DISPLAY") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_IBP4_DISPLAY;
    } else if (key === "CO") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_CO;
    } else if (key === "CO_BT") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_CO_BT;
    } else if (key === "CO_IT") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_CO_IT;
    } else if (key === "TEMP2") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_TEMP2;
    } else if (key === "RRA") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_RRA;
    } else if (key === "PULMONARY_AIR_FLOW") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_PULMONARY_AIR_FLOW;
    } else if (key === "O2") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_O2;
    } else if (key === "AGENT") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_AGENT;
    } else if (key === "N2O") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_N2O;
    } else if (key === "OFF") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_OFF;
    } else if (key === "INVALID") {
        return Z_WAVEFORM_ID.Z_WAVEFORM_INVALID;
    }

    // If the input string doesn't match any enum key, return INVALID
    return Z_WAVEFORM_ID.Z_WAVE

}