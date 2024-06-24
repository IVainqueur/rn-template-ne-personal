import React from 'react';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  ButtonGroup,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Text,
} from '@gluestack-ui/themed';

interface Props {
  showAlertDialog: boolean;
  setShowAlertDialog: (show: boolean) => void;
  message: string;
  title: string;
  confirmText: string;
  onConfirm?: () => void;
}

const Dialog = ({
  showAlertDialog,
  setShowAlertDialog,
  message,
  title,
  confirmText,
  onConfirm,
}: Props) => {
  return (
    <AlertDialog
      isOpen={showAlertDialog}
      onClose={() => {
        setShowAlertDialog(false);
      }}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading>{title}</Heading>
          <AlertDialogCloseButton>
            <Icon as={CloseIcon} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text>{message}</Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <ButtonGroup>
            <Button
              onPress={() => {
                setShowAlertDialog(false);
              }}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              bgColor="red"
              onPress={() => {
                onConfirm && onConfirm();
                setShowAlertDialog(false);
              }}>
              <ButtonText>{confirmText}</ButtonText>
            </Button>
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Dialog;
