import {styles} from "./load-progress.styles";
import {ActivityIndicator, Text, View} from "react-native";
import {colors} from "@constants";
import React from "react";

// Loader component
export const LoadProgress = () => {
    return(
        <View style={styles.LoaderContainer}>
            <View style={styles.Loader}>
                <ActivityIndicator
                    style={styles.ActivityIndicator}
                    hidesWhenStopped={true}
                    color={colors.redF34}
                    size="large"
                />
                <Text style={styles.LoaderText}>Loading...</Text>
            </View>
        </View>
        )
}