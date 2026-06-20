/*
=========================================================

SMARTLOGIX

NOTIFICATION ENGINE

=========================================================
*/

import {

    probability

} from "./random";

import {

    formatDateTime,

    now

} from "./dates";

export function buildNotifications(){

    return{

        emailSent:

        probability(96),

        smsSent:

        probability(72),

        pushSent:

        probability(83),

        whatsappSent:

        probability(68),

        courierNotified:

        probability(98),

        customerNotified:

        probability(95),

        lastNotification:

        formatDateTime(now())

    };

}

export function notificationSummary(

notifications

){

    return[

        {

            label:"Correo",

            value:

            notifications.emailSent

        },

        {

            label:"SMS",

            value:

            notifications.smsSent

        },

        {

            label:"Push",

            value:

            notifications.pushSent

        },

        {

            label:"WhatsApp",

            value:

            notifications.whatsappSent

        },

        {

            label:"Courier",

            value:

            notifications.courierNotified

        }

    ];

}

export function hasAnyNotification(

notifications

){

    return(

        notifications.emailSent||

        notifications.smsSent||

        notifications.pushSent||

        notifications.whatsappSent

    );

}

export default buildNotifications;