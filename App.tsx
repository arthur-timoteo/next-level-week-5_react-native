import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';

import Routes from './src/routes';
import { PlantProps } from './src/libs/storage';

import { 
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold 
} from '@expo-google-fonts/jost';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(() => {
    //Cria uma listener que escuta as notificações quando elas são geradas e coleta os dados dela
    // const subscription = Notifications.addNotificationReceivedListener(
    //   async notification => {
    //     const data = notification.request.content.data.plant as PlantProps;
    //     console.log(data);
    //   }
    // );

    // return () => subscription.remove();

    //Lista todas as notificações agendadas no dispositivo
    //async function notifications() {
      // const data = await Notifications.getAllScheduledNotificationsAsync();
      // console.log("########### NOTIFICAÇÕES AGENDADAS ###########");
      // console.log(data);

      //Cancela todas as notificações agendadas
      //await Notifications.cancelAllScheduledNotificationsAsync();
    //}

    //notifications();
  },[]);

  //Solicita permissão no IOS para enviar notificações
  useEffect(() => {
    async function requestPermissionsAsync() {
      return await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowAnnouncements: true,
        },
      });
    }

    requestPermissionsAsync();
  },[]);

  if(!fontsLoaded)
    return <AppLoading/>

  return (
    <Routes />
  );
}
