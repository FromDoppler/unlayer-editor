import { React } from '../unlayer-react';
import ReactModal from 'react-modal';

interface Props {
  open: boolean;
  primaryAction?: {
    label: string;
    primaryFn?: () => void;
    style: object;
  };
  secondaryAction?: {
    label: string;
    secondaryFn?: () => void;
    style: object;
  };
  cancelAction?: {
    label: string;
    cancelFn?: () => void;
    style: object;
  };
  closeIcon?: string;
  size?: string;
  contentLabel?: string;
  content?: React.ReactNode;
  titleContent?: React.ReactNode;
  className?: string;
}

export const Modal = (props: Props) => {
  const {
    open,
    closeIcon,
    contentLabel,
    titleContent,
    content,
    size = 'M',
    primaryAction,
    secondaryAction,
    cancelAction,
  } = props;
  ReactModal.setAppElement('body');

  if (!open) return null;

  const modalSize = {
    S: '25%',
    M: '50%',
    L: '75%',
  };
  const customStyles = {
    overlay: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: '2010',
    },
    content: {
      position: 'relative',
      width: modalSize[size],
      margin: 'auto',
      borderRadius: '4px',
      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      outline: 'none',
      padding: '0px',
      top: '25%',
    },
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '16px',
    fontWeight: '600',
    padding: '15px',
    borderBottom: '1px solid rgb(238, 238, 238)',
  };

  const titleCloseBtn = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#999',
    cursor: 'pointer',
    fontSize: '1em',
  };

  const modalContainer = {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } as const;

  const modalContainerFooter = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '0.5rem',
    padding: '1rem',
    borderTop: '1px solid rgb(238, 238, 238)',
    textAlign: 'right',
    overflow: 'hidden',
    marginTop: '15px',
  } as const;

  const buttonStyle = {
    padding: '0.4rem 0.85rem',
    lineHeight: '1rem',
    height: '40px',
    minWidth: '40px',
    fontSize: '1rem',
    cursor: 'pointer',
    border: '1px solid rgb(38, 38, 38)',
    borderRadius: '2px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    ...primaryAction?.style,
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    ...cancelAction?.style,
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    ...secondaryAction?.style,
  };

  return (
    <ReactModal
      isOpen={open}
      onRequestClose={cancelAction?.cancelFn}
      style={customStyles}
      contentLabel={contentLabel || 'modal'}
    >
      <div style={headerStyle}>
        <div>{titleContent}</div>
        <button style={titleCloseBtn} onClick={cancelAction?.cancelFn}>
          {closeIcon ?? 'X'}
        </button>
      </div>

      <div style={modalContainer}>{content}</div>

      <div style={modalContainerFooter}>
        {cancelAction && (
          <button style={cancelButtonStyle} onClick={cancelAction?.cancelFn}>
            {' '}
            {cancelAction?.label}
          </button>
        )}
        {secondaryAction && (
          <button
            style={secondaryButtonStyle}
            onClick={secondaryAction?.secondaryFn}
          >
            {secondaryAction?.label}
          </button>
        )}
        {primaryAction && (
          <button style={primaryButtonStyle} onClick={primaryAction?.primaryFn}>
            {primaryAction?.label}
          </button>
        )}
      </div>
    </ReactModal>
  );
};
