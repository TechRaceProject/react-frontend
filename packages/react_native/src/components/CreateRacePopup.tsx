import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

interface CreateRacePopupProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (raceName: string, raceId: number) => void;
}

const CreateRacePopup: React.FC<CreateRacePopupProps> = ({
                                                           visible,
                                                           onClose,
                                                           onSubmit,
                                                         }) => {
  const [raceName, setRaceName] = useState('');

  const handleSubmit = async () => {
    const payload = {
      type: 'manual',
      name: raceName,
      status: 'not_started',
      vehicle_id: 1,
    };

    try {
      // @TODO : fix Url
      const response = await fetch(
          'http://10.0.2.2:8000/api/users/1/races',
          {
            method: 'POST',
            headers: {
              // @TODO : fix token
              Authorization:
                  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJleHAiOjE3MjYxOTkxNzJ9.efdris3dzTMPXr-4aDjjyxa_kuSQ_f9yzxIKXnVDpMk',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          }
      );

      const data = await response.json();
      if (response.ok) {
        const raceId = data.data.ID;
        Alert.alert(
            'Succès',
            `Course créée avec succès : ${data.data.name}`
        );

        onSubmit(raceName, raceId);
        onClose();
      } else {
        Alert.alert(
            'Erreur',
            `Échec de la création de la course : ${data.message || 'Erreur inconnue'}`
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(
            'Erreur',
            `Une erreur est survenue lors de la création de la course : ${error.message}`
        );
      } else {
        console.error('Erreur inattendue:', error);
        Alert.alert('Erreur', 'Une erreur inattendue est survenue.');
      }
    }
  };

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
            <Text style={styles.modalTitle}>Créez une course</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom de la course"
                placeholderTextColor="#888"
                value={raceName}
                onChangeText={setRaceName}
            />
            <Text style={styles.informativeText}>
              <Text style={styles.boldPS}>PS</Text>: La course
              commencera dès que la voiture se déplacera.
            </Text>
            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
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
    width: '80%',
    backgroundColor: '#121216',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
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
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'Orbitron-Black',
  },
  input: {
    width: '100%',
    borderColor: '#3730A3',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#3730A3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  informativeText: {
    width: '100%',
    color: 'white',
    fontSize: 10,
    marginBottom: 20,
    fontFamily: 'Orbitron-Medium',
  },
  boldPS: {
    fontFamily: 'Orbitron-Black',
    marginRight: 10,
  },
});

export default CreateRacePopup;
