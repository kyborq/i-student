import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../inputs/Button';
import { ModalView } from './ModalView';

type Props = {
  title: string;
  message?: string;
  visible?: boolean;
  onContinue?: () => void;
  onCancel?: () => void;
};

export const Dialogue = ({
  title,
  message,
  visible,
  onCancel,
  onContinue,
}: Props) => {
  return (
    <ModalView title={title} visible={visible} onClose={onCancel}>
      <Text
        style={{
          paddingHorizontal: 24,
          marginBottom: 24,
          fontSize: 16,
          color: '#c7c7c7',
        }}>
        {message}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 24,
          paddingBottom: 16,
        }}>
        <Button
          size={10}
          label="Продолжить"
          onPress={onContinue}
          primary
          style={{ flex: 1, marginRight: 16 }}
        />
        <Button
          size={10}
          onPress={onCancel}
          label="Отменить"
          style={{ flex: 1 }}
        />
      </View>
    </ModalView>
  );
};
