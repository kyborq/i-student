import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../components/Header';
import { InfoLine } from '../../components/InfoLine';
import { RootStackParamList } from '../../components/navigation/Navigation';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  completeTask,
  deleteTask,
  permanentDeleteTask,
  TTask,
} from '../../redux/tasksSlice';
import { Empty } from '../../components/Empty';

export const ViewTask = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'ViewTask'>>();

  const id = route?.params?.id;
  const { tasks } = useAppSelector((state) => state.tasks);
  const task: TTask = tasks?.filter((t) => t.id === id)[0];

  const handleCompleteTask = () => {
    dispatch(completeTask({ id: task.id, value: !task.status }));
  };

  const handleEditTask = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'EditTask',
        params: { id: task.id },
      }),
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    dispatch(completeTask({ id: task.id, value: false }));
    !task.deleted && navigation.goBack();
  };

  const handleDeletePermanent = () => {
    dispatch(permanentDeleteTask(task.id));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        label="Просмотр задачи"
        actionIcon={task.status ? 'archive' : 'edit'}
        onAction={task.status ? handleDelete : handleEditTask}
        hideAction={task.deleted}
        onBack={handleBack}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {!task.deleted && (
          <>
            <InfoLine
              icon={task.status ? 'play' : 'checkLine'}
              label="Статус"
              text={task.status ? 'Завершен' : 'Не завершен'}
              onPress={handleCompleteTask}
            />

            <InfoLine
              icon="textInfo"
              label="Название задачи"
              text={task.label}
              disabled={task.status}
            />

            {!!task.description && (
              <InfoLine
                label="Описание задачи"
                text={task.description}
                disabled={task.status}
              />
            )}

            <InfoLine
              icon="info"
              label="Приоритет"
              text="Нет"
              onPress={handleCompleteTask}
              disabled={task.status}
            />
          </>
        )}
        {task.deleted && (
          <Empty
            text="Эта задача архвивирована. Вы можете вернуть ее или удалить навсегда"
            icon="archive"
            onDelete={handleDeletePermanent}
            onReturn={handleDelete}
          />
        )}
      </ScrollView>
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
    paddingBottom: 24,
    flexGrow: 1,
  },
});
