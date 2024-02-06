window.simulatedDataMode = 1 ;

window.developmentMode = 0;

window.DEVEVENT = function(...args) {
    if (window.DevelopmentMode == 1) {
        console.log(args.join(' '));
    }
};

window.LOGEVENT = function(...args) {
    console.log(args.join(' '));
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