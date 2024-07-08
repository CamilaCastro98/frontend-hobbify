import Message from "../components/Message/Message"


const SubmitedHobby = ({navigation}) => {

    return (
            <Message
                navigation={navigation}
                title="Your Hobby was Submited"
                text1="We have sent the information you just submited to our admin. We will notify you once your request has been reviewed."
                text2="In the meantime, you can go back and choose another hobby to start chatting right away."
                nav="HobbySelector"
                button="Return to Hobby Selector"
            />
    )
}

export default SubmitedHobby