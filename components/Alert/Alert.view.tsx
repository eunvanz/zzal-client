import { useEffect, useState, useCallback } from "react";
import { unmountComponentAtNode, render } from "react-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export interface AlertProps {
  title?: string;
  isOpen: boolean;
  onClose: VoidFunction;
  children: React.ReactNode;
  okText?: string;
  cancelText?: string;
  onOk?: VoidFunction;
  onCancel?: VoidFunction;
}

const Alert = ({
  title,
  children,
  isOpen,
  onClose,
  okText = "OK",
  onOk,
  cancelText = "Cancel",
  onCancel,
}: AlertProps) => {
  const handleOnOk = useCallback(() => {
    (onOk || onClose)();
  }, [onClose, onOk]);

  const handleOnCancel = useCallback(() => {
    (onCancel || onClose)();
  }, [onCancel, onClose]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {onCancel && <Button onClick={handleOnCancel}>{cancelText}</Button>}
        <Button onClick={handleOnOk} autoFocus>
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export type DialogAlertPromiseProps = Omit<
  AlertProps,
  "isOpen" | "onClose" | "children" | "onCancel" | "cancelText" | "onOk"
> & {
  content: React.ReactNode;
};

export type DialogConfirmPromiseProps = Omit<
  AlertProps,
  "isOpen" | "onClose" | "children" | "onCancel" | "onOk"
> & {
  content: React.ReactNode;
};

function promiseAlert(props: DialogAlertPromiseProps): Promise<undefined>;
function promiseAlert(props: DialogConfirmPromiseProps): Promise<boolean>;
function promiseAlert({
  okText,
  content,
  cancelText,
}: DialogAlertPromiseProps & Partial<DialogConfirmPromiseProps>) {
  const isConfirm = cancelText !== undefined;

  return new Promise((resolve) => {
    const fragment = new DocumentFragment();

    const DialogContainer = () => {
      const [isVisible, setIsVisible] = useState(false);

      const onClose = (isConfirmed?: boolean) => {
        setIsVisible(false);
        resolve(isConfirmed);
        setTimeout(() => {
          unmountComponentAtNode(fragment);
        }, 300);
      };

      useEffect(() => {
        setIsVisible(true);
      }, []);

      return isConfirm ? (
        <Alert
          isOpen={isVisible}
          okText={okText}
          cancelText={cancelText}
          onClose={() => onClose(undefined)}
          onCancel={() => onClose(false)}
          onOk={() => onClose(true)}
        >
          {content}
        </Alert>
      ) : (
        <Alert isOpen={isVisible} okText={okText} onClose={() => onClose(undefined)}>
          {content}
        </Alert>
      );
    };

    render(<DialogContainer />, fragment);
  });
}

Alert.confirm = (props: DialogConfirmPromiseProps) =>
  promiseAlert({ ...props, cancelText: props.cancelText || "Cancel" });

Alert.show = (props: DialogAlertPromiseProps) => promiseAlert(props);

export default Alert;
