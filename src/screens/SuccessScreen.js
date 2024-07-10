import Message from "../components/Message/Message"


const SuccessScreen = ({navigation}) => {

    return (
            <Message
                navigation={navigation}
                title="Your Purchase was Succesful"
                text1="Thank you for your purchase!"
                text2="You can now enjoy your subscription benefits."
                nav="SubscriptionScreen"
                button="Go back to Account"
            />
    )
}

export default SuccessScreen

