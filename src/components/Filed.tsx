import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import params from "../param"
import Mines from "./Mines"
import Flag from "./Flag"

export default function Field(props: any) {
    const { mined, opened, nearMines, exploded, flagged} = props
    const styleField: any[] = [styles.field]
    // outros estilos aqui
    if (opened) styleField.push(styles.opened)
    if (exploded) styleField.push(styles.exploded)
    if (flagged) styleField.push(styles.flagged)
    if (!opened && !exploded) styleField.push(styles.regular)
    let color = '#000'
    if(nearMines > 0) {
        if(nearMines === 1) color = '#2A28D7'
        if(nearMines === 2) color = '#2B520F'
        if(nearMines > 2 && nearMines < 6) color = '#F9060A'
        if(nearMines >= 6) color = '#F221A9'
    }
    return (
        <TouchableWithoutFeedback onPress={props.onOpen} onLongPress={props.onSelect} >
            <View style={styleField}>
                {!mined && opened && nearMines > 0 ? 
                    <Text style={[styles.label, {color: color}]}>
                        {nearMines}</Text> : false}
                {mined && opened ? <Mines /> : false}
                {flagged && !opened ? <Flag /> : false}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles =  StyleSheet.create({
    field: {
        height: params.blockSize,
        width: params.blockSize,
        borderWidth: params.borderSize,
    },
    regular: {
        backgroundColor: '#999',
        borderLeftColor: '#CCC',
        borderTopColor: '#CCC',
        borderRightColor: '#333',
        borderBottomColor: '#333',
    },
    opened: {
        backgroundColor: '#999',
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontWeight: 'bold',
        fontSize: params.fontSize,
        height: 100,
        textAlignVertical: 'center',
    },
    exploded: {
        backgroundColor: 'red',
        borderColor: 'red',
    },
    flagged: {},
})