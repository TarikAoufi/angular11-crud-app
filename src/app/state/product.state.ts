export enum DataStateEnum {
    LOADING, // Données en cours de chargement
    LOADED,  // Données chargées
    ERROR    // Erreur
}

export interface AppDataState<T> {
    dataState:DataStateEnum,  // Etat des données 
    data?:T,                  // Type de données 
    errorMessage?:string 
}

export enum ProductActionsTypes {
    GET_ALL_PRODUCTS="[products] Get All products",
    GET_SELECTED_PRODUCTS="[products] Get Selected products",
    GET_AVAILABLE_PRODUCTS="[products] Get Available products",
    SEARCH_PRODUCTS="[products] Search products",
    ADD_PRODUCT="[products] Add product",
    SELECT_PRODUCT="[products] Select product",
    EDIT_PRODUCT="[products] Edit product",
    DELETE_PRODUCT="[products] Delete product"
}

export interface ActionEvent {
    type: ProductActionsTypes,
    payload?:any
}