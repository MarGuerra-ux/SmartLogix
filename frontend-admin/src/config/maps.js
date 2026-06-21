export const GOOGLE_MAPS_API_KEY =
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const DEFAULT_CENTER = {
    lat: -33.4489,
    lng: -70.6693
};

export const DEFAULT_ZOOM = 11;

export const GLOBAL_MAP_ZOOM = 11;

export const MODAL_MAP_ZOOM = 15;

export const MAP_ID = "SMARTLOGIX_MAP";

export const MAP_OPTIONS = {

    gestureHandling: "greedy",

    disableDefaultUI: false,

    clickableIcons: false,

    streetViewControl: false,

    fullscreenControl: true,

    mapTypeControl: false

};