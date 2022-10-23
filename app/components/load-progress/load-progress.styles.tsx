import {StyleSheet} from "react-native";
import {colors} from "@constants";

export const styles = StyleSheet.create({
    Loader: {
        backgroundColor: colors.purpleFFE,
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    LoaderText: {
        color: colors.brown182,
        fontSize: 16
    },
    LoaderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    ActivityIndicator: {
        marginVertical: 20,
    },
})