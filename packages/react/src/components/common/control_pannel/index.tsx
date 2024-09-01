import './style.css'; // Ensure the updated CSS is included
import { IoIosVideocam } from 'react-icons/io';
import { RiAlarmWarningFill } from 'react-icons/ri';

export default function ControlPanel() {
    return (
        <div className="control-panel">
            <p className="control-panel-title">Panneau de contrôle</p>

            <div className="control-item">
                <div className="control-item-row">
                    <div className="icon-box">
                        <IoIosVideocam size={30} color="#5aa9e6" />
                    </div>

                    <input type="checkbox" name="hello" id="hello" />

                    <span>Activer le flux vidéo</span>
                </div>

                <div className="control-item-row">
                    <div className="icon-box">
                        <RiAlarmWarningFill size={30} color="#5aa9e6" />
                    </div>

                    <input type="checkbox" name="hello" id="hello" />

                    <span>Activer l&apos;alarme du véhicule</span>
                </div>
            </div>

            <button className="control-item--save-button">Sauvegarder</button>
        </div>
    );
}
