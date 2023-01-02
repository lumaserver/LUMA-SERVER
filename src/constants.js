// Acolit status
const ACOLIT_AWAKE_STATUS = 'awake'
const ACOLIT_SLEEP_STATUS = 'sleeping'
const ACOLIT_TIRED_STATUS = 'tired'
const ACOLIT_UNCONSCIOUS_STATUS = 'unconscious'

// Valores de bajada o subida de resistencia en el CRON
const DESCENT_RESISTENCE = -1
const RISE_RESISTENCE = 10


// Valores de bajada o subida de concentración en el CRON
const DESCENT_CONCENTRATION = -1
const RISE_CONCENTRATION = 10

/*Valores para controlar en minimo y maximo de la resistencia en el filtro del UPDATEMANY 
porque los min y max del esquema esta funcion no las tiene en cuenta*/
const RESISTANCE_MIN_VALUE = 10
const RESISTANCE_MAX_VALUE = 100
const RESISTANCE_EXHAUSTED_VALUE = 20

const POTION_RESISTANCE_VALUE = 40


module.exports = {
    ACOLIT_AWAKE_STATUS,
    ACOLIT_SLEEP_STATUS,
    ACOLIT_TIRED_STATUS,
    ACOLIT_UNCONSCIOUS_STATUS,

    DESCENT_RESISTENCE,
    RISE_RESISTENCE,

    DESCENT_CONCENTRATION,
    RISE_CONCENTRATION,

    RESISTANCE_MIN_VALUE,
    RESISTANCE_MAX_VALUE,
    RESISTANCE_EXHAUSTED_VALUE,

    POTION_RESISTANCE_VALUE,
};

