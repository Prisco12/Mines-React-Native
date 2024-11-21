import { StyleSheet, View } from "react-native"
import Field from "./Filed"


export default function MineField(props: any) {
    const rows = props.board.map((row: any, r: any) => {
        const columns = row.map((field: any, c: any) => {
            return <Field {...field} key={c} 
            onOpen={() => props.onOpenField(r,c)}
            onSelect={() => props.onSelectField(r,c)}
            />
        })
        return <View style={{flexDirection: 'row'}} key={r}>{columns}</View>
    })
    return <View style={styles.container}>{rows}</View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE',
    }
})