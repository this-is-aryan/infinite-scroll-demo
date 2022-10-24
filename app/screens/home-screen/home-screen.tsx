import React, {useEffect, useState} from 'react'
import {View, SafeAreaView, FlatList, RefreshControl, ActivityIndicator, Image, Text} from 'react-native'
import { styles } from "./home-screen.styles";
import { LoadProgress} from "@components";
import {ACCESS_KEY, API_ENDPOINT, INITIAL_PAGE_NUM, RECORD_LIMIT, TOTAL_RECORDS, colors} from '@constants';
import axios from "axios";

type HomeScreenProps = {}
export const HomeScreen: React.FunctionComponent<HomeScreenProps> = (props) => {
    const [pageNum, setPageNum] = useState(INITIAL_PAGE_NUM)
    const [isLoadingFromBottom, setLoadingFromBottom] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [images, setImages] = useState([])
    const [emptyState, setEmptyState] = useState(false)

    // API Call to Unsplash. Must be moved to API service later on.
     const fetchImages = (pageNum: number) => {
        axios
            .get(`${API_ENDPOINT}/photos/random?client_id=${ACCESS_KEY}&count=${TOTAL_RECORDS}`)
            .then(res => {
                setImages([...images, ...res.data])
            }).catch(error => {
                console.log(error)
            setEmptyState(true)
        })
         setPageNum(pageNum + 1)
    };

    const emptyView = () => {
        return (
            <View style={styles.EmptyView}>
                <Text style={styles.ErrorMessage}>Oops! We're unable to fetch the data :(</Text>
            </View>
        )
    }

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            await fetchImages(INITIAL_PAGE_NUM)
            setIsLoading(false)
        })()
    }, [images])

    // Rendering each item of the list

    const renderItem = ({ item }) => {
        return(
            <View style={styles.ImagesListContainer}>
                <Image style={styles.SingleImage} source={{uri: item.urls.small}} key={item.key} resizeMode={"cover"}  />
            </View>
        )
    }

    const listKeyExtractor = (item, index) => `renderItem-${index}`

    // Pagination on reaching the end of the list
    const onEndReached = async () => {
        if (isLoadingFromBottom) return
        setLoadingFromBottom(true)
        await fetchImages(pageNum + 1)
        setPageNum(pageNum + 1)
        setLoadingFromBottom(false)
    }

    // Footer component while the new data is loading from bottom
    const ListFooterComponent = () =>
        isLoadingFromBottom ? (
            <ActivityIndicator
                style={styles.ActivityIndicator}
                hidesWhenStopped={true}
                color={colors.redF34}
                size="large"
            />
        ) : null

    // Pull to refresh effect
    const onRefresh = async () => {
        setIsRefreshing(true)
        await fetchImages(INITIAL_PAGE_NUM)
        setIsRefreshing(false)
    }

    return (
       <SafeAreaView style={styles.DroidSafeArea}>
          <View style={styles.ImageContainer}>
              {
                  isLoading && images.length === 0 ?
                      <LoadProgress />
                          :
                      (<FlatList
                          data={images}
                          renderItem={renderItem}
                          keyExtractor={listKeyExtractor}
                          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor={colors.redF34} />}
                          onEndReachedThreshold={0.5}
                          onEndReached={onEndReached}
                          ListFooterComponent={ListFooterComponent}
                      />)
              }
              {
                  emptyState && images.length === 0 ? emptyView() : null
              }
          </View>
       </SafeAreaView>
    )
}