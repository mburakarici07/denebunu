import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const Checkbox = ({setCheckedProduct, title, checkedProduct}) => {
  // const [checked, setChecked] = useState(false);
  const checked = checkedProduct.some(checked => title === checked);

  const selectBox = value => {
    setCheckedProduct([...checkedProduct, value]);
  };

  const unSelectBox = value => {
    setCheckedProduct([...checkedProduct.filter(item => item !== value)]);
  };

  return (
    <TouchableOpacity style={styles.productView}>
      <TouchableOpacity
        onPress={() => {
          checked ? unSelectBox(title) : selectBox(title);
        }}
        style={styles.checkbox(checked)}>
        {checked && <Text style={styles.checkboxIcon}>X</Text>}
      </TouchableOpacity>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: checked => ({
    height: 20,
    width: 20,
    borderWidth: 1,
    borderRadius: 2,
    marginRight: 8,
    borderColor: checked ? 'green' : 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  checkboxIcon: {
    fontWeight: 'bold',
    color: 'green',
  },
  productView: {
    flexDirection: 'row',
    marginTop: 16,
    flex: 1,
  },
});

export default Checkbox;
