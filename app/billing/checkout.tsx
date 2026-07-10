import { View, Button, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { BillService } from "../../services/billService";

export default function Checkout(){

const params=useLocalSearchParams();

const cart=JSON.parse(params.cart as string);

const total=Number(params.total);

function pay(mode:string){

const bill=BillService.save(cart,total,mode);

Alert.alert("Success",`${bill} Saved Successfully`);

router.dismissAll();

}

return(

<View style={{
flex:1,
justifyContent:"center",
padding:20,
gap:15
}}>

<Button
title="Cash"
onPress={()=>pay("Cash")}
/>

<Button
title="UPI"
onPress={()=>pay("UPI")}
/>

<Button
title="Card"
onPress={()=>pay("Card")}
/>

<Button
title="Mixed"
onPress={()=>pay("Mixed")}
/>

</View>

);

}