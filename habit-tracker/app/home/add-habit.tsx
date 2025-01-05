import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text , Modal} from "react-native";
import { useHabitContext } from "@/contexts/HabitContext";
import DateTimePicker from "react-native-modal-datetime-picker";
import { scheduleNotification } from "../../notifications/notifications";
import { Picker } from "@react-native-picker/picker";

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

export default function AddHabit() {
  const { addHabit } = useHabitContext();
  const [title, setTitle] = useState("");
  const [notificationTime, setNotificationTime] = useState("");
  const [isTimePickerVisaile, setTimePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [isStartDatePickerVisaile, setStartDatePickerVisibility] = useState(false);
  const [frequency, setFrequency] = useState<HabitFrequency>("daily");
  const [isFrequencyPickerVisaile, setFrequencyPickerVisibility] = useState(false);
  const [color, setColor] = useState<HabitColor>("blue");
  const [isColorPickerVisaile, setColorPickerVisibility] = useState(false);

  const frequencyLabels = {
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    once: "Once",
    twoDays: "Every 2 Days",
    threeDays: "Every 3 Days",
    fourDays: "Every 4 Days",
    fiveDays: "Every 5 Days",
    sixDays: "Every 6 Days",
    twoWeeks: "Every 2 Weeks",
    threeWeeks: "Every 3 Weeks",
  };

  const colorHexCodes: Record<string, string> = {
    blue: "#007BFF",
    green: "#28A745",
    red: "#DC3545",
    yellow: "#FFD700",
    purple: "#6F42C1",
    pink: "#E83E8C",
    brown: "#795548",
    orange: "#FD7E14",
  };

  const handleConfirmTime = (time: Date) => {
    const formattedTime = time.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
    setNotificationTime(formattedTime);
    setTimePickerVisibility(false);
  }

  const handleConfirmDate = (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setStartDate(formattedDate);
    setStartDatePickerVisibility(false);
  }

  const handleSaveFrequency = () => {
    setFrequencyPickerVisibility(false);
    console.log("Selected Frequency:", frequency);
  };

  const handleSaveColor = () => {
    setColorPickerVisibility(false);
    console.log("Selected Color:", color);
  };

  const handleSave = async () => {
    if (title && frequency && color && notificationTime && startDate) {
      addHabit({
        id: Date.now().toString(),
        title: title,
        frequency: frequency,
        color: colorHexCodes[color],
        colorName: color,
        notificationTime: notificationTime,
        startDate: startDate,
        completedDates: [],
      });
    }

    if (notificationTime) {
        await scheduleNotification(notificationTime, title, startDate, frequency);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Habit Title"
        value={title}
        onChangeText={setTitle}
      />
      <TouchableOpacity onPress={() => setTimePickerVisibility(true)} style={styles.timePickerContainer} >
        <Text style={styles.buttonText}>
          {notificationTime ? `Notification Time: ${notificationTime}` : "Set Notification Time"}
        </Text>
      </TouchableOpacity>
      <DateTimePicker 
        isVisible={isTimePickerVisaile}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={() => setTimePickerVisibility(false)}
      />
      <TouchableOpacity onPress={() => setStartDatePickerVisibility(true)} style={styles.timePickerContainer} >
        <Text style={styles.buttonText}>
          {startDate ? `Start Date: ${startDate}` : "Set Start Date"}
        </Text>
      </TouchableOpacity>
      <DateTimePicker 
        isVisible={isStartDatePickerVisaile}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setStartDatePickerVisibility(false)}
      />
      <TouchableOpacity onPress={() => setFrequencyPickerVisibility(true)} style={styles.timePickerContainer} >
        <Text style={styles.buttonText}>
          {frequency ? `Frequency: ${frequencyLabels[frequency]}` : "Set Frequency"}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={isFrequencyPickerVisaile}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setFrequencyPickerVisibility(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Select Frequency:</Text>
            <Picker
              selectedValue={frequency}
              onValueChange={(value) => setFrequency(value)}
              style={styles.picker}
            >
              <Picker.Item label="Daily" value="daily" />
              <Picker.Item label="Weekly" value="weekly" />
              <Picker.Item label="Monthly" value="monthly" />
              <Picker.Item label="Once" value="once" />
              <Picker.Item label="Every 2 Days" value="twoDays" />
              <Picker.Item label="Every 3 Days" value="threeDays" />
              <Picker.Item label="Every 4 Days" value="fourDays" />
              <Picker.Item label="Every 5 Days" value="fiveDays" />
              <Picker.Item label="Every 6 Days" value="sixDays" />
              <Picker.Item label="Every 2 Weeks" value="twoWeeks" />
              <Picker.Item label="Every 3 Weeks" value="threeWeeks" />
            </Picker>
            <Button title="Save" onPress={handleSaveFrequency}/>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setColorPickerVisibility(true)} style={styles.timePickerContainer} >
        <Text style={styles.buttonText}>
          {color ? `Color: ${color.charAt(0).toUpperCase() + color.slice(1)}` : "Set Color"}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={isColorPickerVisaile}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setColorPickerVisibility(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Select Frequency:</Text>
            <Picker
              selectedValue={color}
              onValueChange={(value) => setColor(value)}
              style={styles.picker}
            >
              <Picker.Item label="Blue" value="blue" />
              <Picker.Item label="Green" value="green" />
              <Picker.Item label="Red" value="red" />
              <Picker.Item label="Yellow" value="yellow" />
              <Picker.Item label="Purple" value="purple" />
              <Picker.Item label="Pink" value="pink" />
              <Picker.Item label="Brown" value="brown" />
              <Picker.Item label="Orange" value="orange" />
            </Picker>
            <Button title="Save" onPress={handleSaveColor}/>
          </View>
        </View>
      </Modal>
      <View style={styles.buttonContainer}>
        <Button title="Save Habit" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16,
    backgroundColor: "#151718"
    },
  input: { 
    backgroundColor: "#3A3D40",
    color: "#FFF",
    height: 40,
    margin: 2,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  buttonContainer: {
    paddingVertical: 16
  },
  timePickerContainer: {
    backgroundColor: "#007BFF",
    padding: 12,
    marginTop: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  label: {
    color: "#FFF",
    marginBottom: 8,
  },
  pickerContainer: { 
    backgroundColor: "#3A3D40", 
    borderRadius: 4 
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  modalContent: {
    backgroundColor: "#3A3D40",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  picker: {
    color: "#FFF", // For iOS picker text
  },
});
