import React, { useState } from 'react';
import { Button, View, Text, TextInput, StyleSheet, FlatList, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider, Appbar, Menu } from 'react-native-paper';

// Calendar Component
const Calendar = () => {
  const dates = [];
  for (let i = 1; i <= 31; i++) {
    dates.push(`April ${i}`);
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.calendarContainer}>
        {dates.map((date, index) => (
          <View key={index} style={styles.dateContainer}>
            <Text style={styles.dateText}>{date}</Text>
            {/* You can add more content for each date if needed */}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};


export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState('');
  const [foodList, setFoodList] = useState([]);
  const [currentPage, setCurrentPage] = useState('Homepage'); // Track current page

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleFoodChange = (text) => setFood(text);
  const handleCaloriesChange = (text) => {
    // Ensure only numeric values are set for calories
    if (/^\d+$/.test(text) || text === '') {
      setCalories(text);
    }
  };

  const handleSend = () => {
    if (food !== '' && calories !== '') {
      setFoodList([...foodList, { food: food, calories: calories }]);
      setFood('');
      setCalories('');
    }
  };

  const getTotalCalories = () => {
    return foodList.reduce((total, item) => total + parseInt(item.calories), 0);
  };

  const navigateToPage = (page) => {
    setCurrentPage(page);
    closeMenu(); // Close menu after selecting a page
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Appbar.Action icon="menu" style={styles.hamburger} onPress={openMenu}/>
        </Appbar.Header>
        <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={<Text>Menu</Text>}>
            <Menu.Item onPress={() => navigateToPage('Homepage')} title="Homepage" />
            <Menu.Item onPress={() => navigateToPage('Calendar')} title="Calendar" />
          </Menu>
        <Text style={styles.headerText}>
          {currentPage === 'Homepage' ? 'Prototype Calorie Counter' : 'Calendar'}
        </Text>
        {/* Render current page based on state */}
        {currentPage === 'Homepage' ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={handleFoodChange}
              value={food}
              placeholder="Enter consumed food"
            />
            <TextInput
              style={styles.input}
              onChangeText={handleCaloriesChange}
              value={calories}
              placeholder="Enter calories"
              keyboardType="numeric" // Only allow numeric input
            />
            <Button onPress={handleSend} title="Send" />
          </View>
        ) : (
          <Calendar />
        )}
        {currentPage === 'Homepage' && (
          <Text style={styles.totalCaloriesText}>
            Total amount of calories consumed: {getTotalCalories()}
          </Text>
        )}
      </View>
      <View style={styles.tableContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.contentContainer}>
            <Text style={styles.tableHeader}>Consumed</Text>
            <Text style={styles.tableHeader}>Amount of Calories</Text>
            <FlatList
              data={foodList}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <Text>{item.food}</Text>
                  <Text>{item.calories}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}


const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    backgroundColor: '#B1DFF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#3F51B5', // A nice blue shade
    width: 500,
    paddingTop: 30,
    paddingBottom: 20, // Padding bottom for some space below the text
    alignItems: 'center', // Centers horizontally
    justifyContent: 'center', // Centers vertically
    zIndex: 1,
  },
  headerText: {
    color: 'white', // White color for the text
    fontSize: 25, // Font size
    fontWeight: 'bold', // Bold text
    backgroundColor: '#3F51B5',
    padding: 20,
    marginTop: 10,
    marginBottom: 20
  },
  hamburger: {
    color: 'white'
  },
  input: {
    height: 40,
    width: '100%', // Take full width of the parent container
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingRight: 10,
  },
  inputContainer: {
    alignItems: 'center', // Center horizontally
    justifyContent: 'center',
    width: '80%', // Set width to 80% of the screen width
  },
  tableContainer: {
    flex: 1,
    backgroundColor: '#B1DFF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 20, // Adjust the paddingTop to provide space at the top
    paddingBottom: 20 // Adjust the paddingBottom to provide space at the bottom
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 5
  },
  totalCaloriesContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  totalCaloriesText: {
    fontWeight: 'bold',
    fontSize: 18
  }
});
