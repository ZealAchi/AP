import {Dimensions} from 'react-native'
const { height,width } = Dimensions.get("window");
const diagonal=Math.sqrt(Math.pow(width/2,2)+Math.pow(height/2,2));
export const wp=(percent)=>width*percent/2;
export const hp=(percent)=>height*percent/2;
export const dp=(percent)=>diagonal*percent/2;