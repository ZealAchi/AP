import React, { useState, useEffect, useContext } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import ImagePicker from 'react-native-image-picker';


import { Block } from '../../UI/Block'
import { Texto } from '../../UI/Texto'
import Colors from '../../UI/Colors'
import { Button } from '../../UI/Button'
import { ScreenContainer } from '../../Components/ScreenContainer'
import { Header } from '../../UI/Header'
import { useData } from '../../Hooks/useData'
import { DataContext } from '../../Context/Datos.Context';
import { AlertMessage } from '../../Components/Alert';
const options = {
    title: 'Secciona tu  Avatar',
    takePhotoButtonTitle: 'Tomar Foto...',
    chooseFromLibraryButtonTitle: 'Seleccionar desde tu galeria...',
    cancelButtonTitle: 'Cancelar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
export function FotoPerfil({ navigation }) {

    const [image, setImage] = useState('')
    const { state, setState } = useContext(DataContext)

    const UploadImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response, 'response');
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                const source = { uri: response.uri };
                setImage(source);
                const uploadImg = { data: response.data, type: response.type }
                setState({ ...state, NewUser: [{ ...state.NewUser[0], uploadImg, image: image }] })
            }
        });
    }
    const next = () => {
        if (image !== '') {
            navigation.navigate('IngresaTusDocumentos')
        }else{
            AlertMessage({message:'Primero debes seleccionar una foto.'})
        }
    }
    return (
        <ScreenContainer backgroundColor={'transparent'} barBackgroundColor={'transparent'} padding>
            <Block>
                <Header Return />
                <Texto Bold size={13}>¿Quieres subir una foto de perfil?</Texto>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => UploadImage()} style={{ backgroundColor: 'rgb(232,233,236)', width: 120, height: 120, borderRadius: 80 }}>
                            {image === '' && <><View style={{ top: 12, justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesome size={70} name="user-o" color={Colors.Primary} />
                            </View>
                                <View style={{ bottom: -10, left: 35, postion: 'absolute', backgroundColor: Colors.Primary, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', borderRadius: 80 }}>
                                    <Feather size={20} name="camera" color={'white'} />
                                </View></>}
                            {image !== '' && <>
                                <Image source={image} style={{ width: 120, height: 120 }} borderRadius={75} />
                                <View style={{ marginTop: -30, left: 35, postion: 'absolute', backgroundColor: Colors.Primary, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', borderRadius: 80 }}>
                                    <Feather size={20} name="camera" color={'white'} />
                                </View>
                            </>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>


                <Button onPress={() => navigation.navigate('IngresaTusDocumentos')} backgroundColor={'transparent'} styleButton={{ position: 'absolute', bottom: 80, right: 50, left: 50, borderRadius: 18 }} color={Colors.Primary} label="Subir después" />
                <Button onPress={() => next()} styleButton={{ position: 'absolute', bottom: 20, right: 50, left: 50, borderRadius: 18 }} label="CONTINUAR" />
            </Block>
        </ScreenContainer>
    )
}