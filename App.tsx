import 'react-native-gesture-handler';
// import MovingBox from './src/LeftToRight';
// import BottomSheet from './src/BottomSheet';
import {View, StyleSheet} from 'react-native';
import Slider from './src/apple-bedtime/Slider';
import Dropdown from './src/Dropdown';
import {RadioButton} from './src/CheckBox';
// import SimulationCard from './src/SimulationCard';
// import {faker} from '@faker-js/faker';

const App = () => {
  // const data = Array.from({length: 10}).map((_, index) => ({
  //   id: faker.datatype.uuid(),
  //   avatar: faker.image.animals(),
  // }));
  return (
    <View style={styles.container}>
      {/* <BottomSheet ref={ref}>
        <MovingBox />
      </BottomSheet> */}
      {/* {data.map((item, index) => (
        <SimulationCard key={item.id} data={item} index={index} />
      ))} */}
      {/* <Slider /> */}
      {/* <Dropdown /> */}
      <RadioButton options={[1, 2, 3]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
