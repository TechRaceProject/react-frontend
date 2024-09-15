import Title from '~/components/common/title';
import { ModalProps } from '~/interfaces/components/feedback/modal.interface';
import './style.css';

function Modal({
    title,
    position = 'center',
    isOpen,
    onClose,
    icon: Icon,
    children,
}: ModalProps) {
    if (!isOpen) return null;

    const positionClass = `modal-position-${position}`;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className={`modal-content ${positionClass}`}
                onClick={(e) => e.stopPropagation()}
            >
                {title && <Title balise="h1" label={title} hasBorderBottom />}
                {Icon && <Icon className="modal-icon" />}
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
}

export default Modal;
