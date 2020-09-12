import React, { useContext, useState, useEffect } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather'

import { ScreenContainer } from '../ScreenContainer'
import Colors from '../../UI/Colors'
import { Texto } from '../../UI/Texto'
import { TextInput } from '../../UI/Input'
import { Button } from '../../UI/Button'
import { DataContext } from '../../Context/Datos.Context'
import { useAPI } from './../../Hooks/useAPI'
import { Header } from '../../UI/Header';
import { ScrollView } from 'react-native-gesture-handler';
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

export function UpdatePerfil() {
    const API = useAPI()

    const Context = useContext(DataContext)
    const [state, setState] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone:"",
    })
    useEffect(() => {
        setState({
            first_name: Context.state.user.profile.first_name,
            last_name: Context.state.user.profile.last_name,
            email: Context.state.user.profile.email
        })
    }, [])
    const [image, setImage] = useState('')

    const UploadImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response, 'response');
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            } else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                // name : 'image', filename : 'image.png', type:'image/png',
                // API.PostAPI.SubirAvatar({upload:`${response.data}`})
                API.PostAPI.SubirAvatar({data:response.data,type:response.type})
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                setImage(source);
                
            }
        });
    }
    // console.log(image,'image')

    const HandleSubmit = () => {
        API.PostAPI.UpdateProfile(state)
    }


    return (<ScreenContainer backgroundColor={Colors.Secondary} padding>
        <View style={{flex:1}}>
            <ScrollView>
        <Header Return/>
        <Texto>Editar perfil</Texto>
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}></View>
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => UploadImage()}>
                    <Image source={image === '' ? { uri: `${Context.avatar}` } : image} style={{ width: 120, height: 120 }} borderRadius={75} />
                    <View style={{ marginTop: -30, left: 35, postion: 'absolute', backgroundColor: Colors.Primary, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', borderRadius: 80 }}>
                        <Feather size={20} name="camera" color={'white'} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}></View>
        </View>
        <View>
            <Texto size={12}>Nombre</Texto>
            <TextInput backgroundColor={'transparent'} placeholder="Juan" value={state.first_name} onChangeText={(e) => { setState({ ...state, first_name: e }) }}></TextInput>
        </View>
        <View>
            <Texto size={12}>Apellido</Texto>
            <TextInput backgroundColor={'transparent'} placeholder="Perez" value={state.last_name} onChangeText={(e) => { setState({ ...state, last_name: e }) }}></TextInput>
        </View>
        <View>
            <Texto size={12}>Correo</Texto>
            <TextInput backgroundColor={'transparent'} placeholder="Juan@gmail.com" value={state.email} onChangeText={(e) => { setState({ ...state, email: e }) }}></TextInput>
        </View>
        <View>
            <Texto size={12}>Telefono</Texto>
            <TextInput backgroundColor={'transparent'} placeholder="7721235778" value={state.phone} onChangeText={(e) => { setState({ ...state, phone: e }) }}></TextInput>
        </View>
        </ScrollView>
        </View>
        <View style={{flex:0,paddingRight: 50, paddingLeft: 50}}>
        <Button onPress={() => HandleSubmit()} styleButton={{   borderRadius: 18 }} label="GUARDAR" />
        </View>
    </ScreenContainer>)
}