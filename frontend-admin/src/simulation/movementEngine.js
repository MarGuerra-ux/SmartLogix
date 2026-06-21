// ============================================
// SMARTLOGIX
// MOVEMENT ENGINE
// ============================================

function randomDirection(){

    return Math.random() * 360;

}

function toRadians(angle){

    return angle * Math.PI / 180;

}

function normalize(angle){

    if(angle < 0){

        return angle + 360;

    }

    if(angle >= 360){

        return angle - 360;

    }

    return angle;

}

export function moveCarrier(carrier){

    let direction =

        carrier.direction;

    direction +=

        (Math.random() - 0.5) * 20;

    direction =

        normalize(direction);

    const radians =

        toRadians(direction);

    const speed =

        carrier.speed;

    let lat =

        carrier.lat +

        Math.cos(radians) * speed;

    let lng =

        carrier.lng +

        Math.sin(radians) * speed;

    const distanceLat =

        lat -

        carrier.route.center.lat;

    const distanceLng =

        lng -

        carrier.route.center.lng;

    const distance =

        Math.sqrt(

            distanceLat * distanceLat +

            distanceLng * distanceLng

        );

    if(

        distance >

        carrier.route.radius

    ){

        direction += 180;

        direction =

            normalize(direction);

    }

    return {

        ...carrier,

        lat,

        lng,

        direction

    };

}

export function moveFleet(fleet){

    return fleet.map(

        carrier =>

            moveCarrier(

                carrier

            )

    );

}