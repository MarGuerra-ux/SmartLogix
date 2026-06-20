/*
=========================================================

SMARTLOGIX

RANDOM ENGINE

=========================================================
*/

export function random(min,max){

    return Math.floor(

        Math.random()*

        (max-min+1)

    )+min;

}

export function randomFloat(

    min,

    max,

    decimals=2

){

    return Number(

        (

            Math.random()*

            (max-min)+

            min

        ).toFixed(decimals)

    );

}

export function randomBoolean(

    probability=0.5

){

    return Math.random()<=probability;

}

export function randomItem(array){

    return array[

        random(

            0,

            array.length-1

        )

    ];

}

export function randomQuantity(){

    return random(

        1,

        5

    );

}

export function randomPriority(){

    const value=Math.random();

    if(value<0.20){

        return "Alta";

    }

    if(value<0.70){

        return "Media";

    }

    return "Baja";

}

export function randomShippingService(){

    return randomBoolean(0.30)

        ? "Express"

        : "Normal";

}

export function randomOrderStatus(){

    return randomItem([

        "Pendiente",

        "Procesando",

        "Preparando",

        "En Tránsito",

        "En Reparto",

        "Entregado"

    ]);

}

export function randomPaymentMethod(){

    return randomItem([

        "WebPay",

        "MercadoPago",

        "Transferencia",

        "Débito",

        "Crédito"

    ]);

}

export function randomDiscount(){

    return randomItem([

        0,

        0,

        0,

        5,

        10,

        15

    ]);

}

export function randomProcessingTime(){

    return random(

        3,

        45

    );

}

export function probability(percent){

    return Math.random()<=(percent/100);

}