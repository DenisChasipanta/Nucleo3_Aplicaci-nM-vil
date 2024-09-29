import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        gap: 10,

    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#f7fa1d"
    },
    message: {
        width: 400
    },
    textRedirect: {
        marginTop: 20,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "#fdfefe"
    },
    rootActivity: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    rootHome: {
        flex: 1,
        marginHorizontal: 25,
        marginVertical: 50,
        color: "#fdfefe"
    },
    header: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
        color: "#fdfefe"
    },
    iconHeader: {
        alignItems: "center",
        flex: 1
    },
    modalProfile: {
        paddingHorizontal: 20,
        padding: 20,
        marginHorizontal: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        gap: 10
    },
    rootListCollection: {
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        gap: 20
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    rootDeatil:{
        flex:1,
        marginTop: 20,        
        padding: 20,
        gap:20
    },
    botonesEditar:{
        color: "#03ab0b"
    },
    botonEliminar:{
        color: "#de2040"
    },
    sinOut:{
        marginTop:25,
        alignItems:"center",
        color: "#fdfefe"
    }
    

})

