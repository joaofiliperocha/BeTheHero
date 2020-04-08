import React from 'react'
import { Feather } from '@expo/vector-icons'
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import logoImg from '../../assets/logo.png'
import styles from './styles'
import * as MailComposer from 'expo-mail-composer'

export default function Detail() {

    const route = useRoute();

    const incident = route.params.incident;
    const message = `Olá ${incident.name}, estou entrando em contacto porque quero ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(incident.value)}`
    const navigation = useNavigation();

    function navigateBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Heroi do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }

    function sendWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity style={styles.detailsButton} onPress={navigateBack}>
                    <Feather name='arrow-left' size={28} color="#0E2041" />
                </TouchableOpacity>
            </View>
            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]} >ONG:</Text>
                <Text style={styles.incidentValue} >{incident.name} de {incident.city} / {incident.uf}</Text>
                <Text style={styles.incidentProperty} >Caso:</Text>
                <Text style={styles.incidentValue} >{incident.title} </Text>
                <Text style={styles.incidentProperty} >Valor:</Text>
                <Text style={styles.incidentValue} >{Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(incident.value)}</Text>
            </View>
            <View style={styles.contact}>
                <Text style={styles.heroTite} >Salve o dia</Text>
                <Text style={styles.heroTite} >Seja o Heroi deste caso</Text>
                <Text style={styles.heroDescription} >Entre em contacto</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}