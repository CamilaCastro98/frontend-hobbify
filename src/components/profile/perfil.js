import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { perfilStyles } from "./perfilStyles";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";

const user = {
    img: require("../../../assets/no-pic.png"),
    name: "pedrito1",
};

const Perfil = ({ categories }) => {
    return (
        <View style={perfilStyles.container}>
            <Header user={user} />
            {/* Header */}
            <View style={perfilStyles.header}>
                <Image
                    source={{ uri: 'https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg' }} // Replace with the URL of the profile picture
                    style={perfilStyles.profileImage}
                />
                <View style={perfilStyles.headerTextContainer}>
                    <Text style={perfilStyles.nameText}>John Doe</Text>
                    <Text style={perfilStyles.infoText}>Email: xxxxxx</Text>
                </View>
            </View>

            {/* Information */}
            <View style={perfilStyles.informationContainer}>
                <Text style={perfilStyles.infoText}>ABOUT ME</Text>
                <View style={perfilStyles.aboutMeCard}>
                    <Text style={perfilStyles.aboutMeText}>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </Text>
                </View>
                <View style={perfilStyles.tagsContainer}>
                    <Text style={perfilStyles.infoText}>Hobbies:</Text>
                    <View style={perfilStyles.tags}>
                        {categories.map((category, index) => (
                            <View key={index} style={perfilStyles.tag}>
                                <Text style={perfilStyles.tagText}>{category}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            {/* Contact and Edit Profile Buttons */}
            <View style={perfilStyles.buttonsContainer}>
                <TouchableOpacity style={[perfilStyles.button, perfilStyles.contactButton]}>
                    <Text style={perfilStyles.buttonText}>Contactar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[perfilStyles.button, perfilStyles.editButton]}>
                    <Text style={perfilStyles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <NavBar />
        </View>
    );
};

export default Perfil;
