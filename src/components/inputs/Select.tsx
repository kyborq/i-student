import React, { useState } from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { TOUCHABLE_COLOR } from '../../colors';
import { uuid4 } from '../../utils';
import { Icon, TIcon } from '../Icon';
import { ModalView } from '../modals/ModalView';
import { SelectItem, TItem } from './SelectItem';

type Props = {
  icon: TIcon;
  label?: string;
  value?: string;
  placeholder?: string;
  items: TItem[];
  onSelect?: (value?: string) => void;
};

export const Select = ({
  icon,
  label,
  placeholder,
  value,
  items,
  onSelect,
}: Props) => {
  const [popupVisible, setPopupVisible] = useState(false);

  const handleShowPopup = () => {
    setPopupVisible(!popupVisible);
  };

  const handleSelect = (value?: string) => {
    onSelect && onSelect(value);
    handleShowPopup();
  };

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        background={TOUCHABLE_COLOR}
        onPress={handleShowPopup}>
        <View
          style={{
            paddingHorizontal: 24,
            paddingVertical: 8,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{ flex: 1 }}>
            {!!label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.input}>
              <Icon icon={icon} color="#c7c7c7" />
              <Text style={[styles.value, !value && styles.placeholder]}>
                {value || placeholder}
              </Text>
            </View>
          </View>
          <Icon icon="chevronDown" color="#c7c7c7" />
        </View>
      </TouchableNativeFeedback>

      <ModalView visible={popupVisible} onClose={handleShowPopup}>
        {!!placeholder && (
          <SelectItem
            title={placeholder}
            active={!value}
            onSelect={handleSelect}
          />
        )}
        {items.map((item) => (
          <SelectItem
            key={uuid4()}
            title={item.title}
            active={item.title === value}
            value={item.value}
            onSelect={handleSelect}
          />
        ))}
      </ModalView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  label: {
    fontSize: 12,
    color: '#c7c7c7',
    marginBottom: 8,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 16,
  },
  placeholder: {
    color: '#C7C7C7',
  },
});
