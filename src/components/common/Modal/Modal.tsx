import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const GModal = ({ visible, closeModal, title, description }: { visible: boolean, closeModal: () => void, title: string, description: string }) => {

    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={() => closeModal()} >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>{title}</Text>
                    <Text style={styles.modalText}>{description}</Text>
                    <TouchableOpacity onPress={() => closeModal()}>
                        <Text style={styles.modalText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default GModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
    },
})