import Message from "../components/Message/Message"


const CancelScreen = ({navigation}) => {

    return (
            <Message
                navigation={navigation}
                title="Your Purchase was Canceled"
                text1="If you feel this is an error, please contact our support team."
                text2="You can reconsider the purchase of our plans whenever you want!"
                nav="SubscriptionScreen"
                button="Go back to Account"
            />
    )
}

export default CancelScreen