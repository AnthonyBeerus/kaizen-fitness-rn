import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Animated } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import PageTabbutton, { PageTabButtonType } from '@/components/navigation/PageTabbutton';
import { useEffect, useState } from 'react';
import React from 'react';
import { SearchBar } from 'react-native-screens';
import ThemedSearchbar from '@/components/ThemedSearchbar';
import { lists, Task, tasks } from '@/db/schema';
import { useSQLiteContext } from 'expo-sqlite';
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
import * as schema from '@/db/schema';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { d } from 'drizzle-kit/index-Z-1TKnbX';
import { eq } from 'drizzle-orm';
import { SectionList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useScroll } from '@/components/ScrollContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

interface Section{
  title: string;
  data: Task[];
}


export default function Recipes() {

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, {schema})
  useDrizzleStudio(db);
  const [sections, setSections] = useState<Section[]>([]);

  const {data} = useLiveQuery(
    drizzleDb.select().from(tasks).leftJoin(lists, eq(tasks.list_id, lists.id))
  );
  console.log(data);

  useEffect(() => {
    if (!data) return;

    const formatedData = data?.map((item) => ({
      ...item.tasks,
      list_name: item.lists?.name,
    }));

    const groupedByListId = formatedData?.reduce(
      (acc: { [key: string]: Task[] }, task) => {
        if (!acc[task.list_id]) {
          acc[task.list_id] = [];
        }
        acc[task.list_id].push(task);
        return acc;
      },
      {}
    );

    setSections(Object.entries(groupedByListId).map(([title, data]) => ({
      title,
      data,
    }))
    );
  }, [data]);

  const handleDeleteTask = async (taskId: number) => {
    try {
      await drizzleDb.delete(tasks).where(eq(tasks.id, taskId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddDummyTask = async () => {
    // Add to the first list by default
    await drizzleDb.insert(tasks).values({
      name: `Task ${Math.floor(Math.random() * 1000)}`,
      list_id: 1,
    });
  };

  const { scrollY } = useScroll();
   const backgroundColor = useThemeColor(
      {
        light: Colors.light.background,
        dark: Colors.dark.background,
      },
      "background"
    );
    
  return (
    <Animated.ScrollView
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16} // Adjust this value to control animation smoothness
      style={{ backgroundColor: backgroundColor, paddingHorizontal: 16 }}>
      <ThemedSearchbar />
      <Button
        icon={(props) => <Ionicons name="add" {...props} />}
        onPress={handleAddDummyTask}
        children={undefined}
      />
      <SectionList
        sections={sections}
        renderItem={({ item }) => (
          <ThemedView
            variant={"default"}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <ThemedText>{item.name}</ThemedText>
            <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
              <ThemedText>Delete</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}
        renderSectionHeader={({ section }) => (
          <ThemedView
            variant={"default"}
            style={{
              height: 40,
              justifyContent: "center",
              paddingLeft: 16,
              backgroundColor: "red",
            }}>
            <ThemedText>List:{section.title}</ThemedText>
          </ThemedView>
        )}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <ThemedView variant={"default"} />}
        ListFooterComponent={
          <Button
            icon={(props) => <Ionicons name="add" {...props} />}
            onPress={handleAddDummyTask}
            children={undefined}
          />
        }
      />
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
