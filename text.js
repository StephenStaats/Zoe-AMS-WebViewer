//
//  Text translation
//

const Z_LANGUAGE_ENGLISH = 0;
const Z_LANGUAGE_GERMAN = 1;
const Z_LANGUAGE_SPANISH = 2;
const Z_LANGUAGE_PORTUGUESE = 3;
const Z_LANGUAGE_FRENCH = 4;
const Z_LANGUAGE_ITALIAN = 5;
const Z_LANGUAGE_POLISH = 6;
const Z_LANGUAGE_DUTCH = 7;
const Z_LANGUAGE_NORWEGIAN = 8;
const Z_LANGUAGE_DANISH = 9;
const Z_LANGUAGE_FINNISH = 10;
const Z_LANGUAGE_SWEDISH = 11;
const Z_LANGUAGE_RUSSIAN = 12;


window.StringNumbers = {
   SN_Loading_software: 0,
   SN_OK: 1,
   SN_Cancel: 2,
   SN_Close: 3,
   SN_Patient: 4,
   SN_New_alarm_tone_OFF: 5,
   SN_New_alarm_tone_LOW: 6,
   SN_New_alarm_tone_MEDIUM: 7,
   SN_New_alarm_tone_HIGH: 8,
   SN_New_alarm_tone_TEST: 9,
   SN_Name: 10,
   SN_Patient_Name: 11,
   SN_ID: 12,
   SN_Patient_ID: 13,
   SN_Monitor: 14,
   SN_Monitor_ID: 15,
   SN_Last_time: 16,
   SN_Clinician: 17,
   SN_Last_SN: 18
};

const ZoeTranslatedStrings = [
   {
      StringNumber: StringNumbers.SN_Loading_software,
      pEnglish: "Loading software, please wait...",
      pGerman: "Software wird geladen, bitte warten..",
      pItalian: "Caricamento software in corso... Attendere.",
      pFrench: "Chargement de logiciel, patienter...",
      pPortuguese: "Carregando software,favor aguardar...",
      pSpanish: "El software se está cargando...",
      pPolish: "Wczytywanie oprogramowania, proszę czekać...",
      pDutch: "Laden van software, moment alstublieft...",
      pNorwegian: "Laster programvare, vennligst vent...",
      pDanish: "$09 Loading software, please wait...",
      pFinnish: "$10 Loading software, please wait...",
      pSwedish: "Laddar ned program, vänta...",
      pRussian: "Загрузка программного обеспечения. Подождите...",
      pChinese: "正在加载软件，请稍候..."
   },
   {
      StringNumber: StringNumbers.SN_OK,
      pEnglish: "OK",
      pGerman: "OK",
      pItalian: "OK",
      pFrench: "OK",
      pPortuguese: "OK",
      pSpanish: "OK",
      pPolish: "OK",
      pDutch: "OK",
      pNorwegian: "OK",
      pDanish: "$09 OK",
      pFinnish: "$10 OK",
      pSwedish: "OK",
      pRussian: "OK",
      pChinese: "确定"
   },
   {
      StringNumber: StringNumbers.SN_Cancel,
      pEnglish: "Cancel",
      pGerman: "Abbrechen",
      pItalian: "Annulla",
      pFrench: "Annuler",
      pPortuguese: "Cancelar",
      pSpanish: "Cancelar",
      pPolish: "Anuluj",
      pDutch: "Annuleren",
      pNorwegian: "Avbryt",
      pDanish: "$09 Cancel",
      pFinnish: "$10 Cancel",
      pSwedish: "Avbryt",
      pRussian: "Отмена",
      pChinese: "取消"
   },
   {
      StringNumber: StringNumbers.SN_Close,
      pEnglish: "Close",
      pGerman: "Schließen",
      pItalian: "Chiudi",
      pFrench: "Fermer",
      pPortuguese: "Fechar",
      pSpanish: "Cerrar",
      pPolish: "Zamknij",
      pDutch: "Sluiten",
      pNorwegian: "Lukk",
      pDanish: "$09 Close",
      pFinnish: "$10 Close",
      pSwedish: "Stäng",
      pRussian: "Закрыть",
      pChinese: "关闭"
   },
   {
      StringNumber: StringNumbers.SN_Patient,
      pEnglish: "Patient",
      pGerman: "Patient",
      pItalian: "Paziente",
      pFrench: "Patient",
      pPortuguese: "Paciente",
      pSpanish: "Paciente",
      pPolish: "Pacjent",
      pDutch: "Patiënt",
      pNorwegian: "Pasient",
      pDanish: "$09 Patient",
      pFinnish: "$10 Patient",
      pSwedish: "Patient",
      pRussian: "Пациент",
      pChinese: "患者"
   },
   {
      StringNumber: StringNumbers.SN_New_alarm_tone_OFF,
      pEnglish: "New alarm tone:  OFF",
      pGerman: "$01 New alarm tone:  OFF",
      pItalian: "Nuovo tono di allarme: OFF",
      pFrench: "$03 New alarm tone:  OFF",
      pPortuguese: "$04 New alarm tone:  OFF",
      pSpanish: "$05 New alarm tone:  OFF",
      pPolish: "$06 New alarm tone:  OFF",
      pDutch: "$07 New alarm tone:  OFF",
      pNorwegian: "$08 New alarm tone:  OFF",
      pDanish: "$09 New alarm tone:  OFF",
      pFinnish: "$10 New alarm tone:  OFF",
      pSwedish: "$11 New alarm tone:  OFF",
      pRussian: "$12 New alarm tone:  OFF",
      pChinese: "$13 New alarm tone:  OFF"
   },
   {
      StringNumber: StringNumbers.SN_New_alarm_tone_LOW,
      pEnglish: "New alarm tone:  LOW",
      pGerman: "$01 New alarm tone:  LOW",
      pItalian: "Nuovo tono di allarme: BASSO",
      pFrench: "$03 New alarm tone:  LOW",
      pPortuguese: "$04 New alarm tone:  LOW",
      pSpanish: "$05 New alarm tone:  LOW",
      pPolish: "$06 New alarm tone:  LOW",
      pDutch: "$07 New alarm tone:  LOW",
      pNorwegian: "$08 New alarm tone:  LOW",
      pDanish: "$09 New alarm tone:  LOW",
      pFinnish: "$10 New alarm tone:  LOW",
      pSwedish: "$11 New alarm tone:  LOW",
      pRussian: "$12 New alarm tone:  LOW",
      pChinese: "$13 New alarm tone:  LOW"
   },
   {
      StringNumber: StringNumbers.SN_New_alarm_tone_MEDIUM,
      pEnglish: "New alarm tone:  MEDIUM",
      pGerman: "$01 New alarm tone:  MEDIUM",
      pItalian: "Nuovo tono di allarme: MEDIO",
      pFrench: "$03 New alarm tone:  MEDIUM",
      pPortuguese: "$04 New alarm tone:  MEDIUM",
      pSpanish: "$05 New alarm tone:  MEDIUM",
      pPolish: "$06 New alarm tone:  MEDIUM",
      pDutch: "$07 New alarm tone:  MEDIUM",
      pNorwegian: "$08 New alarm tone:  MEDIUM",
      pDanish: "$09 New alarm tone:  MEDIUM",
      pFinnish: "$10 New alarm tone:  MEDIUM",
      pSwedish: "$11 New alarm tone:  MEDIUM",
      pRussian: "$12 New alarm tone:  MEDIUM",
      pChinese: "$13 New alarm tone:  MEDIUM"
   },
   {
      StringNumber: StringNumbers.SN_New_alarm_tone_HIGH,
      pEnglish: "New alarm tone:  HIGH",
      pGerman: "$01 New alarm tone:  HIGH",
      pItalian: "Nuovo tono di allarme: ALTO",
      pFrench: "$03 New alarm tone:  HIGH",
      pPortuguese: "$04 New alarm tone:  HIGH",
      pSpanish: "$05 New alarm tone:  HIGH",
      pPolish: "$06 New alarm tone:  HIGH",
      pDutch: "$07 New alarm tone:  HIGH",
      pNorwegian: "$08 New alarm tone:  HIGH",
      pDanish: "$09 New alarm tone:  HIGH",
      pFinnish: "$10 New alarm tone:  HIGH",
      pSwedish: "$11 New alarm tone:  HIGH",
      pRussian: "$12 New alarm tone:  HIGH",
      pChinese: "$13 New alarm tone:  HIGH"
   },
   {
      StringNumber: StringNumbers.SN_New_alarm_tone_TEST,
      pEnglish: "New alarm tone:  TEST",
      pGerman: "$01 New alarm tone:  TEST",
      pItalian: "Nuovo tono di allarme: TEST",
      pFrench: "$03 New alarm tone:  TEST",
      pPortuguese: "$04 New alarm tone:  TEST",
      pSpanish: "$05 New alarm tone:  TEST",
      pPolish: "$06 New alarm tone:  TEST",
      pDutch: "$07 New alarm tone:  TEST",
      pNorwegian: "$08 New alarm tone:  TEST",
      pDanish: "$09 New alarm tone:  TEST",
      pFinnish: "$10 New alarm tone:  TEST",
      pSwedish: "$11 New alarm tone:  TEST",
      pRussian: "$12 New alarm tone:  TEST",
      pChinese: "$13 New alarm tone:  TEST"
   },
   {
      StringNumber: StringNumbers.SN_Patient_ID,
      pEnglish: "Patient ID",
      pGerman: "$01 Patient ID",
      pItalian: "$02 Patient ID",
      pFrench: "$03 Patient ID",
      pPortuguese: "$04 Patient ID",
      pSpanish: "$05 Patient ID",
      pPolish: "$06 Patient ID",
      pDutch: "$07 Patient ID",
      pNorwegian: "$08 Patient ID",
      pDanish: "$09 Patient ID",
      pFinnish: "$10 Patient ID",
      pSwedish: "$11 Patient ID",
      pRussian: "$12 Patient ID",
      pChinese: "$13 Patient ID"
   },
   {
      StringNumber: StringNumbers.SN_Name,
      pEnglish: "Name",
      pGerman: "$01 Name",
      pItalian: "$02 Name",
      pFrench: "$03 Name",
      pPortuguese: "$04 Name",
      pSpanish: "$05 Name",
      pPolish: "$06 Name",
      pDutch: "$07 Name",
      pNorwegian: "$08 Name",
      pDanish: "$09 Name",
      pFinnish: "$10 Name",
      pSwedish: "$11 Name",
      pRussian: "$12 Name",
      pChinese: "$13 Name"
   },
   {
      StringNumber: StringNumbers.SN_Patient_Name,
      pEnglish: "Patient Name",
      pGerman: "$01 Patient Name",
      pItalian: "$02 Patient Name",
      pFrench: "$03 Patient Name",
      pPortuguese: "$04 Patient Name",
      pSpanish: "$05 Patient Name",
      pPolish: "$06 Patient Name",
      pDutch: "$07 Patient Name",
      pNorwegian: "$08 Patient Name",
      pDanish: "$09 Patient Name",
      pFinnish: "$10 Patient Name",
      pSwedish: "$11 Patient Name",
      pRussian: "$12 Patient Name",
      pChinese: "$13 Patient Name"
   },
   {
      StringNumber: StringNumbers.SN_ID,
      pEnglish: "ID",
      pGerman: "$01 ID",
      pItalian: "$02 ID",
      pFrench: "$03 ID",
      pPortuguese: "$04 ID",
      pSpanish: "$05 ID",
      pPolish: "$06 ID",
      pDutch: "$07 ID",
      pNorwegian: "$08 ID",
      pDanish: "$09 ID",
      pFinnish: "$10 ID",
      pSwedish: "$11 ID",
      pRussian: "$12 ID",
      pChinese: "$13 ID"
   },
   {
      StringNumber: StringNumbers.SN_Monitor,
      pEnglish: "Monitor",
      pGerman: "$01 Monitor",
      pItalian: "$02 Monitor",
      pFrench: "$03 Monitor",
      pPortuguese: "$04 Monitor",
      pSpanish: "$05 Monitor",
      pPolish: "$06 Monitor",
      pDutch: "$07 Monitor",
      pNorwegian: "$08 Monitor",
      pDanish: "$09 Monitor",
      pFinnish: "$10 Monitor",
      pSwedish: "$11 Monitor",
      pRussian: "$12 Monitor",
      pChinese: "$13 Monitor"
   },
   {
      StringNumber: StringNumbers.SN_Monitor_ID,
      pEnglish: "Monitor ID",
      pGerman: "$01 Monitor ID",
      pItalian: "$02 Monitor ID",
      pFrench: "$03 Monitor ID",
      pPortuguese: "$04 Monitor ID",
      pSpanish: "$05 Monitor ID",
      pPolish: "$06 Monitor ID",
      pDutch: "$07 Monitor ID",
      pNorwegian: "$08 Monitor ID",
      pDanish: "$09 Monitor ID",
      pFinnish: "$10 Monitor ID",
      pSwedish: "$11 Monitor ID",
      pRussian: "$12 Monitor ID",
      pChinese: "$13 Monitor ID"
   },
   {
      StringNumber: StringNumbers.SN_Last_time,
      pEnglish: "Last",
      pGerman: "$01 Last",
      pItalian: "$02 Last",
      pFrench: "$03 Last",
      pPortuguese: "$04 Last",
      pSpanish: "$05 Last",
      pPolish: "$06 Last",
      pDutch: "$07 Last",
      pNorwegian: "$08 Last",
      pDanish: "$09 Last",
      pFinnish: "$10 Last",
      pSwedish: "$11 Last",
      pRussian: "$12 Last",
      pChinese: "$13 Last"
   },
   {
      StringNumber: StringNumbers.SN_Clinician,
      pEnglish: "Clinician",
      pGerman: "$01 Clinician",
      pItalian: "$02 Clinician",
      pFrench: "$03 Clinician",
      pPortuguese: "$04 Clinician",
      pSpanish: "$05 Clinician",
      pPolish: "$06 Clinician",
      pDutch: "$07 Clinician",
      pNorwegian: "$08 Clinician",
      pDanish: "$09 Clinician",
      pFinnish: "$10 Clinician",
      pSwedish: "$11 Clinician",
      pRussian: "$12 Clinician",
      pChinese: "$13 Clinician"
   },
   {
      StringNumber: StringNumbers.SN_Last_SN,
      pEnglish: "Last",
      pGerman: "$01 Last",
      pItalian: "$02 Last",
      pFrench: "$03 Last",
      pPortuguese: "$04 Last",
      pSpanish: "$05 Last",
      pPolish: "$06 Last",
      pDutch: "$07 Last",
      pNorwegian: "$08 Last",
      pDanish: "$09 Last",
      pFinnish: "$10 Last",
      pSwedish: "$11 Last",
      pRussian: "$12 Last",
      pChinese: "$13 Last"
   }

];


//
//  translateNumberTo
//

const NoTranslatedString = "?T?";

function translateNumberTo(StringNumber, Language) {
   let ReturnString = null;
   const NTranslatedStrings = ZoeTranslatedStrings.length;

   for (let s = 0; s < NTranslatedStrings; s++) {
      if (StringNumber === ZoeTranslatedStrings[s].StringNumber) {
         switch (Language) {
            case Z_LANGUAGE_ENGLISH:
               ReturnString = ZoeTranslatedStrings[s].pEnglish;
               break;
            case Z_LANGUAGE_GERMAN:
               ReturnString = ZoeTranslatedStrings[s].pGerman;
               break;
            case Z_LANGUAGE_SPANISH:
               ReturnString = ZoeTranslatedStrings[s].pSpanish;
               break;
            case Z_LANGUAGE_PORTUGUESE:
               ReturnString = ZoeTranslatedStrings[s].pPortuguese;
               break;
            case Z_LANGUAGE_FRENCH:
               ReturnString = ZoeTranslatedStrings[s].pFrench;
               break;
            case Z_LANGUAGE_ITALIAN:
               ReturnString = ZoeTranslatedStrings[s].pItalian;
               break;
            case Z_LANGUAGE_POLISH:
               ReturnString = ZoeTranslatedStrings[s].pPolish;
               break;
            case Z_LANGUAGE_DUTCH:
               ReturnString = ZoeTranslatedStrings[s].pDutch;
               break;
            case Z_LANGUAGE_NORWEGIAN:
               ReturnString = ZoeTranslatedStrings[s].pNorwegian;
               break;
            case Z_LANGUAGE_DANISH:
               ReturnString = ZoeTranslatedStrings[s].pDanish;
               break;
            case Z_LANGUAGE_FINNISH:
               ReturnString = ZoeTranslatedStrings[s].pFinnish;
               break;
            case Z_LANGUAGE_SWEDISH:
               ReturnString = ZoeTranslatedStrings[s].pSwedish;
               break;
            case Z_LANGUAGE_RUSSIAN:
               ReturnString = ZoeTranslatedStrings[s].pRussian;
               break;
            default:
               ReturnString = ZoeTranslatedStrings[s].pEnglish;
               break;
         }
         break;
      }
   }

   if (ReturnString === null) {
      return NoTranslatedString;
   }

   return ReturnString;
}


//
//  translateNumber
//

var GLanguage = 0 ;

function translateNumber(StringNumber) {
   const LanguageIndex = GLanguage; // Assuming GLanguage is a global variable.
   return translateNumberTo(StringNumber, LanguageIndex);
}

