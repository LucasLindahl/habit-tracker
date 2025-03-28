import React, { createContext, useState, useEffect, useContext } from "react";
import { saveHabits, getHabits } from "../app/storage/storage"

type HabitFrequency =
  | "daily"
  | "weekly"
  | "monthly"
  | "once"
  | "twoDays"
  | "threeDays"
  | "fourDays"
  | "fiveDays"
  | "sixDays"
  | "twoWeeks"
  | "threeWeeks";

type HabitColor = 
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "purple"
  | "pink"
  | "brown"
  | "orange"

type Habit = {
  id: string;
  title: string;
  frequency: HabitFrequency;
  color: string;
  colorName: HabitColor;
  notificationTime: string;
  startDate: string;
  completedDates: string[];
};

type HabitContextType = {
  habits: Habit[];
  addHabit: (habit: Habit) => void;
  editHabit: (updatedHabit: Habit) => void;
  deleteHabit: (id: string) => void;
  loadHabits: (username: string) => void;
  toggleHabitCompletion: (id: string, date: string) => void;
};

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider = ({ children }: { children: React.ReactNode }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  // Load habits for the logged-in user
  const loadHabits = async (username: string) => {
    const storedHabits = await getHabits(username);
    setCurrentUser(username);
    setHabits(storedHabits);
  };

  // Add a new habit
  const addHabit = (habit: Habit) => {
    const updatedHabits = [...habits, habit];
    setHabits(updatedHabits);
    if (currentUser) saveHabits(currentUser, updatedHabits);
  };

  // Edit an existing habit
  const editHabit = (updatedHabit: Habit) => {
    const updatedHabits = habits.map((habit) =>
      habit.id === updatedHabit.id ? updatedHabit : habit
    );
    setHabits(updatedHabits);
    if (currentUser) saveHabits(currentUser, updatedHabits);
  };

  // Delete a habit
  const deleteHabit = (id: string) => {
    const updatedHabits = habits.filter((habit) => habit.id !== id);
    setHabits(updatedHabits);
    if (currentUser) saveHabits(currentUser, updatedHabits);
  };

  const toggleHabitCompletion = (id: string, date: string) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === id) {
        const isCompleted = habit.completedDates.includes(date);
        return {
          ...habit,
          completedDates: isCompleted
            ? habit.completedDates.filter((d) => d !== date) // Remove date if already completed
            : [...habit.completedDates, date], // Add date if not completed
        };
      }
      return habit;
    });
    setHabits(updatedHabits);
    if (currentUser) saveHabits(currentUser, updatedHabits);
  };

  return (
    <HabitContext.Provider
      value={{ habits, addHabit, editHabit, deleteHabit, loadHabits, toggleHabitCompletion }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabitContext = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("useHabitContext must be used within a HabitProvider");
  }
  return context;
};