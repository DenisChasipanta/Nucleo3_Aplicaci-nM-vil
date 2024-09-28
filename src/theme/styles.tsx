import { StyleSheet } from "react-native";

export const styles=StyleSheet.create({
    root:{
        flex:1,
        justifyContent: 'center',
        padding:10,
        gap:10,
            
    },
    text:{
        fontSize:25,
        fontWeight:'bold',
        textAlign:'center',
        color: "#f7fa1d"      
    },
    message:{
        width:400
    },
    textRedirect:{
        marginTop: 20,
        textAlign: "center",
        fontSize:20,
        fontWeight: "bold",
        color: "#fdfefe"        
    },
    rootActivity:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    rootHome:{
        flex:1,
        marginHorizontal:25,
        marginVertical:50
    },
    headerHome:{
        flexDirection:"row",
        gap: 15,
        alignItems:"center",
        color: "#fdfefe" 
    },
    signOutButton: {
        marginTop: 20,
    },

})

