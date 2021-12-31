import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../../components/Header';
import { Input } from '../../components/inputs/Input';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { completeTask, TTask } from '../../redux/tasksSlice';
import { TaskCard } from './components/TaskCard';

export const TasksScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const tasks: TTask[] = useAppSelector((state) => state.tasks.tasks);

  const handleAddTask = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'EditTask',
      }),
    );
  };

  const handleViewTask = (id: string) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'ViewTask',
        params: { id },
      }),
    );
  };

  const handleCompleteTask = (id: string) => {
    dispatch(completeTask(id));
  };

  return (
    <View style={styles.container}>
      <Header label="Мои задачи" onAction={handleAddTask} />
      <View style={styles.content}>
        <Input placeholder="Поиск" />
        {tasks.map((t) => (
          <TaskCard
            key={t.id}
            label={t.label}
            status={t.status}
            archived={t.deleted}
            onCheck={() => handleCompleteTask(t.id)}
            onPress={() => handleViewTask(t.id)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    flex: 1,
  },
});
