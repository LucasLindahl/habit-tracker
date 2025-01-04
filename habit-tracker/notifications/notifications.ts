import * as Notifications from "expo-notifications";



const calculateTriggerSeconds = (startDate: string, time: string): number => {
  const [hour, minute] = time.split(":").map(Number);
  const now = new Date();

  const start = new Date(startDate);
  start.setHours(hour, minute, 0, 0);

  if (start < now) {
    start.setDate(start.getDate() + 1); // Move to the next day
  }

  return Math.floor((start.getTime() - now.getTime()) / 1000);
}



export const scheduleNotification = async (
  time: string,
  title: string,
  startDate: string, 
  frequency: "daily" | "weekly" | "monthly" | "once" | "twoDays" | "threeDays" | "fourDays" | "fiveDays" | "sixDays" | "twoWeeks" |"threeWeeks" | "custom",


) => {
  try {
    const secondsUntilTrigger = calculateTriggerSeconds(startDate, time);

    const triggerConfig : Notifications.NotificationTriggerInput = {
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
      repeats: frequency !== "custom",
      seconds: secondsUntilTrigger,
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Habit Reminder",
        body: `It's time to complete: ${title}`,
        sound: true,
      },
      trigger: triggerConfig
    });

    console.log("Notification scheduled for:", time);
  } catch (error) {
    console.error("Failed to schedule notification:", error);
  }
};

// Function to cancel all notifications
export const cancelAllNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log("All notifications canceled.");
  } catch (error) {
    console.error("Failed to cancel notifications:", error);
  }
};