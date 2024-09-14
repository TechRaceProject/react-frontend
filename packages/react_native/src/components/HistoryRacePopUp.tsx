import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Alert,
} from 'react-native';

interface RaceHistoryPopupProps {
    visible: boolean;
    onClose: () => void;
}

const RaceHistoryPopup: React.FC<RaceHistoryPopupProps> = ({
    visible,
    onClose,
}) => {
    const [races, setRaces] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const calculateDuration = (startTime: string, endTime: string) => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const diffMs = end.getTime() - start.getTime();
        const minutes = Math.floor(diffMs / 60000);
        const seconds = ((diffMs % 60000) / 1000).toFixed(0);
        return `${minutes}m ${seconds}s`;
    };

    const fetchRaces = async () => {
        try {
            // @TODO : fix Url
            const response = await fetch(
                'http://10.0.2.2:8000/api/users/1/races',
                {
                    method: 'GET',
                    headers: {
                        // @TODO : fix Token
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJleHAiOjE3MjYxOTkxNzJ9.efdris3dzTMPXr-4aDjjyxa_kuSQ_f9yzxIKXnVDpMk',
                    },
                }
            );

            const data = await response.json();
            if (response.ok) {
                setRaces(data.data);
                setLoading(false);
            } else {
                Alert.alert('Erreur', 'Impossible de récupérer les courses.');
            }
        } catch (error) {
            Alert.alert(
                'Erreur',
                'Une erreur est survenue lors de la récupération des courses.'
            );
        }
    };

    const deleteRace = async (raceId: number) => {
        try {
            // @TODO : fix Url
            const response = await fetch(
                `http://10.0.2.2:8000/api/races/${raceId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization:
                            // @TODO : fix token
                            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJleHAiOjE3MjYxOTkxNzJ9.efdris3dzTMPXr-4aDjjyxa_kuSQ_f9yzxIKXnVDpMk',
                    },
                }
            );

            if (response.ok) {
                setRaces((prevRaces) =>
                    prevRaces.filter((race) => race.ID !== raceId)
                );
                Alert.alert('Succès', 'Course supprimée avec succès.');
            } else {
                const data = await response.json();
                Alert.alert('Erreur', 'Impossible de supprimer la course.');
            }
        } catch (error) {
            Alert.alert(
                'Erreur',
                'Une erreur est survenue lors de la suppression de la course.'
            );
        }
    };

    useEffect(() => {
        if (visible) {
            fetchRaces();
        }
    }, [visible]);

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.card}>
            <View style={styles.raceDetails}>
                <Text style={styles.raceName}>{item.name}</Text>
                <Text style={styles.raceStatus}>Statut: {item.status}</Text>
                <Text style={styles.raceDuration}>
                    Durée:{' '}
                    {item.start_time && item.end_time
                        ? calculateDuration(item.start_time, item.end_time)
                        : 'Non terminée'}
                </Text>
            </View>
            <TouchableOpacity onPress={() => deleteRace(item.ID)}>
                <Text style={styles.deleteButton}>🗑️</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>
                        Historique des courses
                    </Text>
                    {loading ? (
                        <Text style={styles.loadingText}>Chargement...</Text>
                    ) : (
                        <FlatList
                            data={races}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.ID.toString()}
                        />
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        height: '70%',
        backgroundColor: '#121216',
        padding: 20,
        borderRadius: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    modalTitle: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Orbitron-Black',
    },
    loadingText: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,
    },
    card: {
        backgroundColor: '#1e1e24',
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    raceDetails: {
        flex: 1,
    },
    raceName: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 5,
    },
    raceStatus: {
        fontSize: 14,
        color: '#bbb',
        marginBottom: 5,
    },
    raceDuration: {
        fontSize: 14,
        color: '#bbb',
    },
    deleteButton: {
        fontSize: 24,
        color: 'red',
    },
});

export default RaceHistoryPopup;
