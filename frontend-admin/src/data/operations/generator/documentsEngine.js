/*
=========================================================

SMARTLOGIX

DOCUMENT ENGINE

=========================================================
*/

import {

    generateDocumentStatus

} from "../documents";

import {

    generateInvoiceId,

    generateCreditNoteId,

    generateShippingLabelId

} from "./ids";

import {

    formatDateTime,

    now

} from "./dates";

export function buildDocuments(index){

    const status=

    generateDocumentStatus();

    const generatedAt=

    formatDateTime(now());

    return{

        invoice:{

            id:generateInvoiceId(index),

            generated:status.invoice,

            generatedAt,

            printable:true,

            downloadable:true

        },

        creditNote:{

            id:generateCreditNoteId(index),

            generated:status.creditNote,

            generatedAt,

            printable:true,

            downloadable:true

        },

        shippingLabel:{

            id:generateShippingLabelId(index),

            generated:status.shippingLabel,

            generatedAt,

            printable:true,

            downloadable:true

        },

        pickingList:{

            generated:status.pickingList,

            generatedAt

        }

    };

}

export default buildDocuments;