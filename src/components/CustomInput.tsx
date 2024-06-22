import {
  AlertCircleIcon,
  Box,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
} from '@gluestack-ui/themed';
import React from 'react';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';

interface Props {
  label: string;
  type: 'text' | 'password';
  defaultValue?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  value?: string;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  containerProps?: any;
}

const CustomInput = (props: Props) => {
  return (
    <Box w="$72" {...props.containerProps}>
      <FormControl
        size="md"
        isDisabled={props.isDisabled}
        isInvalid={props.isInvalid}
        isReadOnly={props.isReadOnly}
        isRequired={props.isRequired}>
        <FormControlLabel mb="$1">
          <FormControlLabelText>{props.label}</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            type={props.type}
            defaultValue={props.defaultValue}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
          />
        </Input>
        {props.helperText && (
          <FormControlHelper>
            <FormControlHelperText>{props.helperText}</FormControlHelperText>
          </FormControlHelper>
        )}
        {props.isInvalid && props.errorText && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{props.errorText}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
    </Box>
  );
};

export default CustomInput;
