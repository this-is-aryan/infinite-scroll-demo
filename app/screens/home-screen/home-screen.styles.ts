import {Platform, StyleSheet} from "react-native";
import {colors} from "@constants";

export const styles = StyleSheet.create({
    ImageContainer: {
        flex: 1,
        backgroundColor: colors.purple937
    },
    DroidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 30 : 0
    },
    ActivityIndicator: {
        marginVertical: 20,
        alignSelf: 'center'
    },
    SingleImage: {
        width: '100%',
        height: '100%',
    },
    ImagesListContainer: {
        height: 300,
        width: '100%'
    },
    ErrorMessage: {
        fontSize: 16,
    },
    EmptyView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})