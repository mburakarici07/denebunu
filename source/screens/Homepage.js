import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Checkbox from '../components/Checkbox';
import {styles} from './styles';

const HomePage = () => {
  const [checkedProduct, setCheckedProduct] = useState([]);
  const [products, setProducts] = useState([
    {title: 'Product 1', categoryName: null},
    {title: 'Product 2', categoryName: null},
    {title: 'Product 3', categoryName: null},
    {title: 'Product 4', categoryName: null},
    {title: 'Product 5', categoryName: null},
    {title: 'Product 6', categoryName: null},
    {title: 'Product 7', categoryName: null},
    {title: 'Product 8', categoryName: null},
    {title: 'Product 9', categoryName: null},
    {title: 'Product 10', categoryName: null},
  ]);
  const [categories, setCategory] = useState([
    {title: 'Category 1'},
    {title: 'Category 2'},
  ]);
  const [deletedCategoryName, setDeletedCategoryName] = useState(null);

  const setProductCategory = categoryName => {
    setProducts([
      ...checkedProduct.map(checked => {
        return {title: checked, categoryName: categoryName};
      }),
      ...products.filter(
        product => !checkedProduct.some(checked => checked === product.title),
      ),
    ]);
    setCheckedProduct([]);
  };

  const productsInCategory = index => {
    let tempData = products.filter(
      product => product.categoryName === categories[index].title,
    );
    return tempData;
  };
  const emptyProducts = () => {
    let tempData = products.filter(
      product =>
        !categories.some(category => category.title === product.categoryName),
    );
    return tempData;
  };

  const addCategory = () => {
    deletedCategoryName
      ? setCategory([...categories, {title: deletedCategoryName}])
      : setCategory([
          ...categories,
          {title: `Category ${categories.length + 1}`},
        ]);
    setDeletedCategoryName(null);
  };

  const removeCategory = title => {
    setCategory(categories.filter(category => category.title !== title));
    setDeletedCategoryName(title);
  };

  const renderItem = ({item}) => {
    return (
      <Checkbox
        title={item.title}
        checkedProduct={checkedProduct}
        setCheckedProduct={setCheckedProduct}
      />
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.borderWidth}>
        <Text style={styles.headerText}>Available Product</Text>
        <FlatList
          data={emptyProducts()}
          renderItem={renderItem}
          numColumns={2}
          scrollEnabled={false}
        />
      </View>
      {categories.map((category, index) => {
        return (
          <View key={index} style={styles.borderWidth}>
            <View style={styles.buttonHeaderView}>
              <Text style={styles.headerText}>{category.title} </Text>
              <TouchableOpacity
                disabled={categories.length === 1}
                onPress={() => removeCategory(category.title)}
                style={styles.removeCategoryButton(categories)}>
                <Text style={styles.removeText(categories)}>
                  Remove Category
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={productsInCategory(index)}
              renderItem={renderItem}
              numColumns={2}
              scrollEnabled={false}
            />
            <View style={styles.buttonView}>
              <TouchableOpacity
                onPress={() => setProductCategory(category.title)}
                style={styles.addProductButton}>
                <Text style={styles.addButtonText}>Add Product</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setProductCategory(null)}
                style={styles.addProductButton}>
                <Text style={styles.addButtonText}>Remove Product</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
      <TouchableOpacity
        onPress={addCategory}
        style={styles.addNewCategoryButton}>
        <Text style={styles.addNewCategoryButtonText}>Add Category</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomePage;
