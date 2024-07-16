import { useEffect,useState,useContext } from "react";
import Message from "../components/Message/Message"
import Loading from "./Loading";
import { Context } from "../contexts/Context";
import { Text } from "react-native";
import { getUserById } from "../helpers/petitions";



const SuccessScreen = ({navigation}) => {

    const {updateHobbies,user,token,setIsPremium} = useContext(Context)

    const [isUserPremium, setIsUserPremium] = useState(false);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const checkPremiumStatus = async () => {
            try {
              const response = await getUserById(user,token)
              if (response.payments.length > 0) {
                console.log('entro al if para update user')
                await updateHobbies(response)
                setIsPremium(true);
                setIsUserPremium(true)
                setLoading(false);
              } else {
                 setTimeout(checkPremiumStatus, 5000)
               }
            } catch (error) {
              console.error("Error checking premium status:", error);
              setLoading(false);
            }
          }
      checkPremiumStatus();
    }, []);

      
    // useEffect(() => {
    //   const checkPremiumStatus = async () => {
    //     try {
    //         setTimeout(()=> {

    //             setIsPremium(true);
    //             setLoading(false);
    //         },20000)
    //       }
    //      catch (error) {
    //       console.error("Error checking premium status:", error);
    //       setLoading(false);
    //     }
    //   };
  
    //   checkPremiumStatus();
    // }, []);

    if (loading) {
        return (
          <Loading />
        );
      }
    
      return (
          isUserPremium ? (
             <Message
             navigation={navigation}
             title="Your Purchase was Succesful"
             text1="Thank you for your purchase!"
             text2="You can now enjoy your subscription benefits."
             nav="SubscriptionScreen"
             button="Go back to Account"
         />
          ) : (
            <Text>Failed to verify premium status. Please try again later.</Text>
          )

      );
    };

export default SuccessScreen


