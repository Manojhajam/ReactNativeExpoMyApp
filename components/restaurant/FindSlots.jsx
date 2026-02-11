import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDoc, collection } from "firebase/firestore";
import { Formik } from "formik";
import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from "../../config/firebaseConfig";
import validationSchema from "../../utils/guestFormSchema";

const FindSlots = ({
  date,
  slots,
  selectedNumber,
  selectedSlot,
  setSelectedSlot,
  restaurant,
}) => {
  // console.log("slots:", slots, typeof slots);

  const [slotsVisible, setSlotsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formVIsible, setFormVisible] = useState(false);

  const handlePress = () => {
    setSlotsVisible(!slotsVisible);
  };

  const handleSlotPress = (slot) => {
    let prevSlot = selectedSlot;
    if (prevSlot == slot) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot(slot);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      await addDoc(collection(db, "bookings"), {
        ...values,
        slot: selectedSlot,
        date: date.toISOString(),
        guests: selectedNumber,
        restaurant: restaurant,
      });
      alert("Booking successfully Done!");
      setModalVisible(false);
      setFormVisible(false);
      setSelectedSlot(null);
    } catch (error) {
      console.log("Booking Error", error);
    }
  };

  const handleClosemodal = () => {
    setModalVisible(false);
  };

  const handleBooking = async () => {
    const userEmail = await AsyncStorage.getItem("userEmail");
    const guestStatus = await AsyncStorage.getItem("isGuest");
    if (userEmail) {
      try {
        await addDoc(collection(db, "bookings"), {
          email: userEmail,
          slot: selectedSlot,
          date: date.toISOString(),
          guests: selectedNumber,
          restaurant: restaurant,
        });
        alert("Booking successfully Done!");
      } catch (error) {
        console.log("Booking Error", error);
      }
    } else if (guestStatus === "true") {
      setFormVisible(true);
      setModalVisible(true);
    }
  };

  return (
    <View className="flex-1">
      <View className={`flex ${selectedSlot != null && "flex-row"}`}>
        <View className={`flex ${selectedSlot != null && "flex-1"}`}>
          <TouchableOpacity onPress={handlePress}>
            <Text className="text-center text-lg font-semibold bg-[#f49b33] p-2 my-3 mx-2 rounded-lg">
              Find Slots
            </Text>
          </TouchableOpacity>
        </View>
        {selectedSlot != null && (
          <View className="flex-1">
            <TouchableOpacity onPress={handleBooking}>
              <Text className="text-center text-white text-lg font-semibold bg-[#f49b33] p-2 my-3 mx-2 rounded-lg">
                Book Slot
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {slotsVisible && Array.isArray(slots) && (
        <View className="flex-wrap flex-row mx-2 p-2 bg-[#474747] rounded-lg">
          {slots.map((slot, index) => (
            <TouchableOpacity
              key={index}
              className={`m-2 p-4 bg-[#f49b33] rounded-lg items-center justify-center ${selectedSlot && selectedSlot !== slot ? "opacity-50" : ""}`}
              onPress={() => handleSlotPress(slot)}
              disabled={
                selectedSlot == slot || selectedSlot == null ? false : true
              }
            >
              <Text className="text-white font-bold">{slot}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        style={{
          flex: 1,
          justifyContent: "flex-end",
          margin: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View className="flex-1 bg-[#00000080] justify-end">
          <View className="bg-[#474747] mx-4 rounded-t-lg p-4 pb-6">
            {formVIsible && (
              <Formik
                initialValues={{ fullName: "", phoneNumber: "" }}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <View className="w-full">
                    <View className="flex-row justify-end">
                      <Ionicons
                        name="close-sharp"
                        size={30}
                        color={"#f49b33"}
                        onPress={handleClosemodal}
                      />
                    </View>
                    <Text className="text-[#f49b33] mt-4 mb-2">Name</Text>
                    <TextInput
                      className="border border-white text-white rounded"
                      onChangeText={handleChange("fullName")}
                      value={values.fullName}
                      onBlur={handleBlur("fullName")}
                    />
                    {touched.fullName && errors.fullName && (
                      <Text className="text-red-500 text-xs mb-2">
                        {errors.fullName}
                      </Text>
                    )}

                    <Text className="text-[#f49b33] mt-4 mb-2">
                      Phone Number
                    </Text>
                    <TextInput
                      className="border border-white text-white rounded"
                      onChangeText={handleChange("phoneNumber")}
                      value={values.phoneNumber}
                      onBlur={handleBlur("phoneNumber")}
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                      <Text className="text-red-500 text-xs mb-2">
                        {errors.phoneNumber}
                      </Text>
                    )}
                    <View>
                      <TouchableOpacity
                        onPress={handleSubmit}
                        style={{ marginTop: 30 }}
                        className="p-2 bg-[#f49b33] text-black rounded-lg "
                      >
                        <Text className="text-xl font-semibold text-center">
                          Submit
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Formik>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FindSlots;
