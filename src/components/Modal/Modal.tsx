import css from './Modal.module.css';
import {createPortal} from "react-dom";
import {useEffect} from "react";

interface ModalProps {
    children?: React.ReactNode;
    onCloseModal: () => void;
}

const Modal = ({children, onCloseModal}:ModalProps) => {
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target !== event.currentTarget) {
            return
        }
        onCloseModal()
    }
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onCloseModal()
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onCloseModal]);
    return createPortal(
        (
            <div
                onClick={handleBackdropClick}
                className={css.backdrop}
                role="dialog"
                aria-modal="true"
            >
                <div className={css.modal}>
                    {children}
                </div>
            </div>

        ), document.body
    );
};
export default Modal