import {

    useEffect,

    useState

} from "react";

import {

    createFleet

} from "../simulation/carrierSimulation";

import {

    moveFleet

} from "../simulation/movementEngine";

export default function useCarrierSimulation(

    total = 18,

    interval = 1000

){

    const [

        carriers,

        setCarriers

    ] = useState(

        () => createFleet(total)

    );

    useEffect(() => {

        const timer = setInterval(() => {

            setCarriers(

                previous =>

                    moveFleet(previous)

            );

        }, interval);

        return () =>

            clearInterval(timer);

    }, [interval]);

    return carriers;

}