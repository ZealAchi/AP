import connectToState from "./others/connectToState";
import CCF from "./others/CreditCardInput"; 
import CV from "./others/CardView";

export const CreditCardInput = connectToState(CCF);

export const CardView = CV;
