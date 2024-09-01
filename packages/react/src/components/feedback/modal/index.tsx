import './style.css';
import { ModalProps } from '~/interfaces/components/feedback/modal.interface';

function Modal({ children }: ModalProps) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">{children}</div>
        </div>
    );
}

export default Modal;
