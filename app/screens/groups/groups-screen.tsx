import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TouchableOpacity, Modal, Alert, Pressable, StyleSheet } from "react-native"
import { Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { FlatList } from "react-native-gesture-handler"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

function generateGroupJSON() {
  return ({
    id: Math.floor(Math.random() * 10000),
    name: "Nome",
    status: true,
    about: "Descrição do grupo",
    privacy: "public",
    authorID: 1,
    _key_admins: [1, 2, 3],
    approved: true,
    avatar: "https://...jpg",
    cover: "https://...jpg",
    parentid: 1,
    phone: "5511977037926"
  })
}

function GroupListItem(item) {
  return <View style={styles.listItem} >
    <Text style={{ color: color.palette.black }}>{`${item.id} - ${item.about}`}</Text>
  </View>
}

export const GroupsScreen = observer(function GroupsScreen() {
  // Pull in one of our MST stores
  const { groupStore } = useStores()

  const [modalVisibility, setModalVisibility] = useState(false);
  const [groupString, setGroupString] = useState(JSON.stringify(generateGroupJSON()));

  function addGroup() {
    try {
      groupStore.addGroup(JSON.parse(groupString))
      setGroupString(JSON.stringify(generateGroupJSON()))
      setModalVisibility(false)
    }
    catch (e) {
      console.error(e)
      Alert.alert(`${e}`)
    }
  }

  function showModal() {
    setGroupString(JSON.stringify(generateGroupJSON()))
    setModalVisibility(true)
  }

  function deleteAllGroups() {
    groupStore.deleteAll();
  }


  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <FlatList
        style={{ flex: 1 }}
        data={groupStore.groups.slice()} //@TODO: Find why observable is not working
        ListEmptyComponent={() => <View style={{height: 200, justifyContent: 'center', alignItems: 'center'}}><Text style={{color: color.palette.black}}>Lista de grupos vazia.</Text></View>}
        renderItem={({ item }) => GroupListItem(item)}
      />
      <TouchableOpacity style={styles.buttonOpen}
        onPress={() => showModal()}>
        <Text style={{ color: color.palette.white, fontSize: 34 }}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonDelete}
        onPress={() => deleteAllGroups()}>
        <Text style={{ color: color.palette.white, fontSize: 13 }}>Limpar</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibility}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibility(!modalVisibility);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setModalVisibility(false)} style={{ alignSelf: "flex-end", padding: 16 }}>
              <Text style={{ color: color.palette.orangeDarker }}>Fechar</Text>
            </TouchableOpacity>
            <TextField
              style={{ margin: 16 }}
              label="Insira um grupo no formato JSON"
              numberOfLines={5}
              multiline={true}
              placeholder={"Insira o objeto JSON de um grupo."}
              inputStyle={{ color: color.palette.lightGrey }} value={groupString}
              onChangeText={(text) => setGroupString(text)}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => addGroup()}
            >
              <Text style={styles.textStyle}>Adicionar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Screen>
  )
})

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "stretch",
    marginTop: 22
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    margin: 20,
    elevation: 2
  },
  buttonDelete: {
    backgroundColor: color.palette.orangeDarker,
    elevation: 5,
    position: 'absolute',
    top: 20, right: 20,
    justifyContent: 'center', alignItems: 'center',
    borderRadius: 5,
    padding: 13
  },
  buttonOpen: {
    backgroundColor: color.palette.orangeDarker,
    elevation: 5,
    position: 'absolute',
    bottom: 20, right: 20,
    justifyContent: 'center', alignItems: 'center',
    borderRadius: 50, width: 50, height: 50
  },
  buttonClose: {
    backgroundColor: color.palette.orangeDarker,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  listItem: {
    flex: 1,
    backgroundColor: color.palette.offWhite,
    height: 50,
    padding: 16,
    marginBottom: 5,
    elevation: 5
  }
});
