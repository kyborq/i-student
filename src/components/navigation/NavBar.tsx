import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { TIcon } from '../Icon';
import { NavButton } from './NavButton';

const TabBarIcons: { [key: string]: string } = {
  Schedule: 'calendar',
  Tasks: 'check',
  Home: 'home',
  Subjects: 'book',
  Contacts: 'users',
};

export const NavBar = ({
  navigation,
  state,
  descriptors,
}: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const icon = TabBarIcons[route.name] as TIcon;

        return (
          <NavButton
            key={`${label}${index}`}
            icon={icon}
            label={`${label}`}
            active={isFocused}
            onPress={() => navigation.navigate(route.name)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    overflow: 'visible',
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
});
