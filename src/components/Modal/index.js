import PropTypes from 'prop-types';
import { Overlay, Container, Footer } from './styles';

import Button from '../Button';
import ReactPortal from '../ReactPortal';
import { useAnimatedUnmount } from '../../hooks/useAnimatedUnmount';

export default function Modal({
  visible,
  danger,
  isLoading,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}) {
  const { animatedRef, shouldRender } = useAnimatedUnmount(visible);

  if (!shouldRender) return null;

  return (
    <ReactPortal containerId="modal-root">
      <Overlay ref={animatedRef} isLeaving={!visible}>
        <Container danger={danger} isLeaving={!visible}>
          <h1>{title}</h1>

          {children && <div className="modal-body">{children}</div>}

          <Footer>
            <button disabled={isLoading} onClick={onCancel} className="cancel-button" type="button">
              {cancelLabel}
            </button>

            <Button isLoading={isLoading} onClick={onConfirm} danger={danger} type="button">
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  isLoading: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  danger: false,
  isLoading: false,
  children: null,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
};
