import { useState } from 'react';
import Modal from '~/components/feedback/modal';
import Form from '~/components/common/form';
import Alert from '~/components/feedback/alert';
import { profileUpdateQuestions } from '~/data/profile.data';
import ProfileDefault from '~/assets/images/profile-default.svg';
import './style.css';

interface SettingProps {
    isOpen: boolean;
    onClose: () => void;
}

function Setting({ isOpen, onClose }: SettingProps) {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const handleFileChange = () => {
        setShowAlert(true);
    };

    return (
        <Modal
            title="Mettre à jour le profil"
            isOpen={isOpen}
            onClose={onClose}
        >
            <img
                src={ProfileDefault}
                alt="Profile"
                className="profile-picture-preview"
            />
            <Form
                dataQuestion={profileUpdateQuestions}
                handleSubmit={handleFileChange}
                className="Form-setting "
                dataArr={formData}
                setDataArr={setFormData}
                label="Mettre à jour"
                outline={false}
            />
            {showAlert && (
                <Alert
                    type="warning"
                    message="Cette fonctionnalité est en cours de traitement et n'est pas encore disponible."
                    duration={5000}
                />
            )}
        </Modal>
    );
}

export default Setting;
