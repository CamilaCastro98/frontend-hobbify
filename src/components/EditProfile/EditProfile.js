import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";

const user = {
    img: require("../../../assets/no-pic.png"),
    name: "pedrito1",
    email: "pedrito@example.com",
    aboutMe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    hobbies: ["Boxeo", "Motocross", "Tejer"]
};

const availableHobbies = [
    "Boxeo", "Motocross", "Tejer", "Fishing", "Reading", "Hiking", "Gaming", "Cooking", "Photography"
];

const EditProfile = () => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [aboutMe, setAboutMe] = useState(user.aboutMe);



    const handleSave = () => {
        // Save profile logic
        console.log("Profile saved");
    };

    const handleCancel = () => {
        // Reset fields to original values
        setName(user.name);
        setEmail(user.email);
        setAboutMe(user.aboutMe);
    };

    return (
        <View style={styles.container}>
            <Header user={user} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.profileSection}>
                    <TouchableOpacity style={styles.profileImageContainer}>
                        <Image source={user.img} style={styles.profileImage} />
                        <Text style={styles.changePhotoText}>Change Photo</Text>
                    </TouchableOpacity>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>About Me</Text>
                        <TextInput
                            style={[styles.input, styles.multilineInput]}
                            value={aboutMe}
                            onChangeText={setAboutMe}
                            multiline
                        />
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <NavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1D1E2C",
    },
    scrollContainer: {
        padding: 20,
    },
    profileSection: {
        alignItems: "center",
        marginBottom: 20,
    },
    profileImageContainer: {
        marginBottom: 20,
        alignItems: "center",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    changePhotoText: {
        marginTop: 10,
        color: "#7E78D2",
    },
    inputContainer: {
        width: "100%",
        marginBottom: 15,
    },
    label: {
        color: "#808080",
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#FEF9EF",
        padding: 10,
        borderRadius: 10,
        color: "#000",
    },
    multilineInput: {
        minHeight: 100,
        textAlignVertical: "top",
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
    },
    selectedTag: {
        backgroundColor: "#7E78D2",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        margin: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    selectedTagText: {
        color: "#fff",
        fontSize: 14,
        marginRight: 5,
    },
    removeTagContainer: {
        marginLeft: 5,
    },
    removeTagText: {
        color: "#fff",
        fontSize: 14,
    },
    availableTagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
    },
    availableTag: {
        backgroundColor: "#3299ab",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        margin: 5,
    },
    selectedAvailableTag: {
        backgroundColor: "#7E78D2", // Change to a different color or style as per your design
    },
    availableTagText: {
        color: "#fff",
        fontSize: 14,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    button: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5,
        backgroundColor: "#7E78D2",
    },
    cancelButton: {
        backgroundColor: "#FF6F61",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default EditProfile;