import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

const DatePickerComponent = ({ date, setDate }) => {
  const [show, setShow] = useState(false);

  const handlePress = () => {
    setShow(true);
  };
  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShow(false); // important for Android
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <View className="flex flex-row">
      <TouchableOpacity onPress={handlePress}>
        {Platform.OS === "android" && (
          <Text className="text-white ml-2 bg-[#474747] p-2 rounded-lg">
            {formatDate(date)}
          </Text>
        )}
        {Platform.OS === "android" && show && (
          <DateTimePicker
            accentColor="#f49b33"
            onChange={onChange}
            value={date}
            mode="date"
            display="default"
            minimumDate={new Date()}
            maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          />
        )}
        {Platform.OS == "ios" && (
          <DateTimePicker
            accentColor="#f49b33"
            textColor="#f49b33"
            onChange={onChange}
            value={date}
            mode="date"
            display="default"
            minimumDate={new Date()}
            maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DatePickerComponent;
