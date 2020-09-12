import React,{useState} from 'react'
import { View,FlatList,Dimensions} from 'react-native' 
import { CreditCard } from '.'
const w = Dimensions.get("window").width;

export function ListCard(){
    const [page, setPage] = useState(0)
    const data=[{ serial: '1234 5567 9808 4151', end: '01/24', name: 'AB Bank', country: 'Mexico' },
    { serial: '123455679808 4151', end: '01/24', name: 'AB Bank', country: 'Mexico' },{ serial: '123455679808 4151', end: '01/24', name: 'AB Bank', country: 'Mexico' }]

    const onScroll=({
        nativeEvent:{
            contentOffset:{x}
        }
    })=>{
        const index=Math.round(x/(w-100))
        setPage(index)
    }
    return(
        <View>
            <FlatList
            data={data}
            horizontal
            snapToAlignment="center"
            decelerationRate="fast"
            contentContainerStyle={{paddingHorizontal:10}}
            snapToInterval={w-55}
            onScroll={onScroll}
            pagingEnabled
            renderItem={(i,)=><CreditCard type="read" index={i.index} page={page}/>}
            showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}