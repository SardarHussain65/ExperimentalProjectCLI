import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { supabase } from '../../../utils/supabase'

const SettingsScreen = () => {
    return (
        <View>
            <Text>SettingsScreen</Text>
            <Button
                title="Logout"
                onPress={() => supabase.auth.signOut()}
            />
        </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({})