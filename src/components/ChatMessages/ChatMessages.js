import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
  SafeAreaView,
  Image,
  Animated,
  BackHandler,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
const messagess = [
  { message: "Hola, ¿te gustan las bicicletas?", rec: 1 },
  { message: "Sí, me encantan. ¿Y a ti?", rec: 2 },
  { message: "¡Claro! Siempre me ha gustado andar en bicicleta.", rec: 1 },
  { message: "¿Tienes alguna bicicleta en particular que te guste?", rec: 2 },
  {
    message: "Tengo una bicicleta de montaña que uso para hacer senderismo.",
    rec: 1,
  },
  { message: "¡Qué genial! Yo prefiero las bicicletas de carretera.", rec: 2 },
  {
    message: "He escuchado que las bicicletas de carretera son muy rápidas.",
    rec: 1,
  },
  {
    message:
      "Sí, lo son. Me encanta la velocidad que puedes alcanzar con ellas.",
    rec: 2,
  },
  { message: "Deberíamos salir a andar en bicicleta algún día.", rec: 1 },
  { message: "¡Definitivamente! Sería muy divertido.", rec: 2 },
  { message: "¿Con qué frecuencia sales a andar en bicicleta?", rec: 1 },
  { message: "Trato de salir al menos una vez a la semana. ¿Y tú?", rec: 2 },
  {
    message: "Yo suelo salir los fines de semana, cuando tengo más tiempo.",
    rec: 1,
  },
  { message: "Eso suena genial. ¿Cuál es tu ruta favorita?", rec: 2 },
  {
    message: "Me gusta mucho ir a las montañas. Las vistas son increíbles.",
    rec: 1,
  },
  { message: "A mí también me gusta la naturaleza. Es muy relajante.", rec: 2 },
  {
    message: "¿Alguna vez has participado en una carrera de bicicletas?",
    rec: 1,
  },
  {
    message:
      "Sí, participé en una carrera local el año pasado. Fue muy emocionante.",
    rec: 2,
  },
  {
    message: "¡Qué bien! Me encantaría participar en una carrera algún día.",
    rec: 1,
  },
  { message: "Deberías intentarlo. Es una experiencia única.", rec: 2 },
  {
    message:
      "¿Tienes algún consejo para alguien que quiera empezar a andar en bicicleta?",
    rec: 1,
  },
  {
    message:
      "Solo asegúrate de tener una bicicleta adecuada y siempre usa casco.",
    rec: 2,
  },
  { message: "Eso es muy importante. La seguridad es lo primero.", rec: 1 },
  {
    message: "Exactamente. También es bueno unirse a un grupo de ciclistas.",
    rec: 2,
  },
  {
    message: "Buena idea. Es más divertido andar en bicicleta con compañía.",
    rec: 1,
  },
  { message: "Sí, y además puedes aprender mucho de los demás.", rec: 2 },
  { message: "¿Has hecho algún viaje largo en bicicleta?", rec: 1 },
  {
    message:
      "Sí, hice un viaje de 100 km el verano pasado. Fue todo un desafío.",
    rec: 2,
  },
  { message: "¡Impresionante! ¿Cómo te preparaste para ese viaje?", rec: 1 },
  {
    message: "Entrené regularmente y me aseguré de estar bien hidratado.",
    rec: 2,
  },
  {
    message:
      "Eso es muy importante. ¿Cuánto tiempo te llevó completar el viaje?",
    rec: 1,
  },
  {
    message: "Me tomó alrededor de 5 horas. Fue agotador pero gratificante.",
    rec: 2,
  },
  { message: "Me imagino. Debió ser una gran experiencia.", rec: 1 },
  { message: "Sí, definitivamente lo fue. Lo repetiría sin duda.", rec: 2 },
  {
    message: "Tal vez algún día pueda unirme a ti en uno de esos viajes.",
    rec: 1,
  },
  { message: "¡Sería genial! Me encantaría tener compañía.", rec: 2 },
  {
    message: "¿Qué tipo de bicicleta recomiendas para un viaje largo?",
    rec: 1,
  },
  {
    message:
      "Una bicicleta de touring es ideal para viajes largos. Son cómodas y resistentes.",
    rec: 2,
  },
  { message: "Gracias por el consejo. Lo tendré en cuenta.", rec: 1 },
  {
    message: "De nada, pero cuando iras?",
    rec: 2,
  },
];
const messagess1 = [
  {
    email: 1,
    type: "text",
    message: "Hola todo bien Hola todo bien Hola todo bien Hola todo bien",
    reactions: [],
    createdAt: "20:15",
  },
  {
    email:2,
    type: "text",
    message:" prueba prueba prueba",
    reactions: ["👍"],
    createdAt: "20:15",
  },
  {
    email: 1,
    type: "text",
    message:
      "Lorem ipsum dolor sit amet it amet, consectetur adipiscing elit, sed do eiusmod tempor in it amet, consectetur adipiscing elit, sed do eiusmod tempor in it amet, consectetur adipiscing elit, sed do eiusmod tempor in it amet, consectetur adipiscing elit, sed do eiusmod tempor in, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    reactions: [],
    createdAt: "20:15",
  },
  {
    email:2,
    type: "text",
    message:
      "Lorem ipsum dolor sit amet, it amet, consectetur adipiscing elit, sed do eiusmod tempor in it amet, consectetur adipiscing elit, sed do eiusmod tempor in it amet, consectetur adipiscing elit, sed do eiusmod tempor in it amet, consectetur adipiscing elit, sed do eiusmod tempor in consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    reactions: [],
    createdAt: "20:15",
  },
  {
    email: 1,
    type: "text",
    message: "Hola todo bien Hola todo bien Hola todo bien Hola todo bien",
    reactions: [],
    createdAt: "20:15",
  },
  {
    email:2,
    type: "text",
    message:" prueba prueba prueba",
    reactions: ["👍"],
    createdAt: "20:15",
  },
  {
    email: 1,
    type: "text",
    message: "Hola todo bien Hola todo bien Hola todo bien Hola todo bien",
    reactions: [],
    createdAt: "20:15",
  },
  {
    email:2,
    type: "text",
    message:" prueba prueba prueba",
    reactions: ["👍"],
    createdAt: "20:15",
  },
];
const reactionsEmojis = ["👍", "🤣", "💖", "😡", "🤢", "👊", "X"];

const converToTime = (dateToConver) => {
  const date = new Date(dateToConver);
  const optionsDate = { day: "2-digit", month: "2-digit", year: "numeric" };
  const optionsTime = { hour: "2-digit", minute: "2-digit" };
  const formattedDate = date.toLocaleDateString("es-ES", optionsDate);
  const formattedTime = date.toLocaleTimeString("es-ES", optionsTime);

  return `${formattedDate} ${formattedTime}`;
};

const EMsj = ({
  msj,
  keyNumb,
  scrolling,
  touched,
  setDisableTouch,
  block,
  setBlock,
  numb,
}) => {
  const [msj1, setMsj1] = useState(msj);
  const [isPressed, setIsPressed] = useState(false);
  const [positionMsj, setPositionMsj] = useState({ x: 0, y: 0, h: 0 });
  const handlePress = () => {
    console.log(positionMsj);
    if (!block) {
      isPressed ? setIsPressed(false) : setIsPressed(true);
      setDisableTouch(true);
      setBlock(true);
    }
  };
  const viewRef = useRef(null);
  useEffect(() => {
    if (isPressed) {
      setIsPressed(false);
      setBlock(false);
    }
  }, [touched, scrolling]);
  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.measure((fx, fy, width, height, px, py) => {
        setPositionMsj({ x: px, y: py, h: height });
        if (numb === 0) {
          console.log("measure values:", { py });
          console.log("measure values:", positionMsj.y);
        }
      });
    }
  }, [scrolling]);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (isPressed) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    } else {
      // Animar la escala de 1 a 0
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isPressed]);
  useEffect(() => {
    const backAction = () => {
      if (isPressed) {
        setIsPressed(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isPressed]);
  const handleEmojiTouch = (emoji) => {
    if(emoji!=="X"){

      console.log(emoji);
      const newMsj = msj1;
      newMsj.reactions = [emoji];
      setMsj1(newMsj);
      setBlock(false);
    }else{
      const newMsj = msj1;
      newMsj.reactions = [];
      setMsj1(newMsj);
      setBlock(false);
    }
  };

  return (
    <Pressable
      ref={viewRef}
      style={{ zIndex: 1 }}
      onLongPress={() => {
        handlePress();
      }}
    >
      <View key={keyNumb} style={styles.eMsgContainer}>
        <View style={styles.eMessage}>
          <Text style={styles.eMsg}>{msj.message}</Text>
          <View style={styles.eMsgTimeContainer}>
            <Text style={styles.eMsgTime}>{converToTime(msj.createdAt)}</Text>
          </View>
        </View>
        {isPressed && <View style={styles.overlay} />}
      </View>
      {isPressed && (
        <Animated.View
          style={[
            {
              position: "absolute",
              backgroundColor: "white",
              flexDirection: "row",
              padding: 3,
              borderRadius: 999,
              zIndex: 999,
              left: 50,
            },
            positionMsj.y <= 350 ? { top: positionMsj.h - 5 } : { top: -38.5 },
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {reactionsEmojis.map((emoji, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleEmojiTouch(emoji)}
            >
              <Text style={{ color: "black", fontSize: 28, marginRight: 10 }}>
                {emoji}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}
      <View>
        {msj1?.reactions?.length && positionMsj?.y ? (
          <View
            style={[

              {
                
                marginLeft:20,
                bottom:15,
                flex:1,
                alignItems:"flex-start",
                alignContent:"center"
              },
            ]
            }
          >
            <Text style={{ 
              fontSize: 18,
              backgroundColor: "white",
              padding:3,
              borderRadius:999,
              paddingLeft:5,
              paddingRight:5
               }}>{msj.reactions}</Text>
          </View>
        ) : (
          ""
        )}
      </View>
    </Pressable>
  );
};
const OMsj = ({ msj, keyNumb }) => {
  const [isPressed, setIsPressed] = useState(false);
  const handlePress = () => {
    isPressed ? setIsPressed(false) : setIsPressed(true);
    console.log(isPressed);
  };

  return (
    <Pressable
      style={{ position: "relative" }}
      onLongPress={() => handlePress()}
    >
      <View key={keyNumb} style={styles.oMsgContainer}>
        <View style={styles.oMessage}>
          <Text style={styles.oMsg}>{msj.message}</Text>
          <View style={styles.oMsgTimeContainer}>
            <Text style={styles.oMsgTime}>{converToTime(msj.createdAt)}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const ChatMessages = ({
  touched,
  setDisableTouch,
  disableTouch,
  block,
  setBlock,
  messages,
  socket,
  user
}) => {
  
  const [scrolling, setScrolling] = useState(0);
  const handleScrolling = () => {
    scrolling === 0 ? setScrolling(1) : setScrolling(0);
  };
  useEffect(() => {
    setScrolling(1);
    console.log(messages);
  }, []);

  
  return (
    <View style={styles.container}>
      <ScrollView style={{flex:1}} onScroll={handleScrolling}>
      {messages.map((msj, key) =>
          msj.from.userId === user.userId ? (
            <OMsj msj={msj} key={key} />
          ) : (
            <EMsj
              msj={msj}
              key={key}
              keyNumb={key}
              scrolling={scrolling}
              touched={touched}
              setDisableTouch={setDisableTouch}
              block={block}
              setBlock={setBlock}
              numb={key}
            />
          )
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eMsgContainer: {
    alignSelf: "stretch",
    alignItems: "flex-start",
    marginBottom: 5,
    minWidth:100
  },
  eMessage: {
    backgroundColor:"rgba(122, 122, 122, 0.5)",
    maxWidth: 300,
    borderRadius: 5,
    marginTop: 5,
    padding: 3,
    paddingLeft: 3,
    paddingRight: 3,
    marginLeft: 5,
    minWidth:100,
    borderWidth:0.5,
    borderColor:"white"
  },
  eMsg: {
    color: "white",
    fontSize: 15,
    marginLeft: 2,
    marginRight: 2,
  },
  eMsgTimeContainer: {
    alignSelf: "stretch",
    alignItems: "flex-end",
    marginTop: 3,
  },
  eMsgTime: {
    color: "#EAE8F5",
    fontStyle: "italic",
    fontSize: 12,
  },
  oMessage: {
    backgroundColor: "rgba(122, 122, 122, 0.2)",
    maxWidth: 300,
    borderRadius: 5,
    marginTop: 5,
    padding: 3,
    paddingLeft: 3,
    paddingRight: 3,
    marginRight: 5,
    borderWidth:0.5,
    borderColor:"white"
  },
  oMsgContainer: {
    alignSelf: "stretch",
    alignItems: "flex-end",
    marginBottom: 5,
    zIndex: 0,
    minWidth:100
  },
  oMsg: {
    color: "white",
    fontSize: 15,
    marginLeft: 2,
    marginRight: 2,
    minWidth:100
  },
  oMsgTimeContainer: {
    alignSelf: "stretch",
    alignItems: "flex-start",
    marginTop: 3,
  },
  oMsgTime: {
    color: "#EAE8F5",
    fontStyle: "italic",
    fontSize: 12,
  },
  modalContent: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "flex-end",
    flexDirection: "column",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(99, 91, 214, 0.4)",
    marginTop: 5,
  },
});

export default ChatMessages;
