import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  SafeAreaView,
} from 'react-native';
import {useRef} from 'react';
import {faker} from '@faker-js/faker';

// create a list of 100 items with random data and images
const DATA = [...Array(100)].map((_, i) => ({
  id: i.toString(),
  name: faker.name.fullName,
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
}));

const ITEM_SIZE = 50 + 20 * 3;

export default function FakerList() {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView>
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}
        data={DATA}
        renderItem={({item, index}) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          console.log('🚀  scale', scale);

          return (
            <Animated.View
              style={[
                styles.item,
                {
                  transform: [{scale}],
                },
              ]}>
              <Image style={styles.avatar} source={{uri: item.avatar}} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </Animated.View>
          );
        }}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
});
