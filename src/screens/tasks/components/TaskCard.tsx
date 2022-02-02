import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import { CardBase } from '../../../components/CardBase';
import { Check } from '../../../components/inputs/Check';
import { TTask } from '../../../redux/tasksSlice';

type Props = {
  task: TTask;
  onPress?: () => void;
  onComplete?: () => void;
};

export const TaskCard = ({ task, onPress, onComplete }: Props) => {
  return (
    <CardBase onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.checkbox}>
          <Check checked={task.completed} onPress={onComplete} />
        </View>
        <Text style={[styles.label, task.completed && styles.completedStyle]}>
          {task.title}
        </Text>
      </View>
    </CardBase>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 24,
    flex: 1,
  },
  checkbox: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    marginTop: 6,
    color: '#c7c7c7',
  },
  completedStyle: {
    color: '#c7c7c7',
    textDecorationLine: 'line-through',
  },
});
