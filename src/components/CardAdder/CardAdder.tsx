import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { useDispatch } from 'react-redux';
import { StoreDispatch } from '../../redux/store';
import { IColumnProps } from '../../types';
import { IoIosAdd } from "react-icons/io";

export const CardAdder: React.FC<IColumnProps> = ({
  labelText,
  addHandler,
  removeHandler,
  completedHandler,
  selectorState,
  droppableId,
  updateTextShowed,
}) => {
  const [isError, setIsError] = useState({
    isShow: false,
    text: '',
  });

  const [textDescription, setTextDescription] = useState('');
  const [isAdderOpened, setIsAdderOpened] = useState(false);
  const dispatch = useDispatch<StoreDispatch>();

  const onChangeInputHandler = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setTextDescription(value);

    setIsError({
      isShow: value.length > 200,
      text:
        value.length > 200
          ? 'The input value cannot be more than 200 characters'
          : '',
    });
  };

  const onBlurInputHandler = () => {
    setIsError({ ...isError, isShow: false });
  };

  const onClickHandler = () => {
    if (!isError.isShow) {
      dispatch(addHandler(textDescription));
      setTextDescription('');
    }
  };

  const onKeyDownInputHandler = ({
    target,
    key,
  }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      if (
        (target as HTMLInputElement).value.length > 0 &&
        (target as HTMLInputElement).value.length <= 200
      ) {
        onClickHandler();
      } else {
        setIsError({
          isShow: true,
          text: 'The input value cannot be empty',
        });
      }
    }
  };

  return isAdderOpened ? (
    <>
      <TextField
        fullWidth
        label={labelText}
        onChange={onChangeInputHandler}
        onBlur={onBlurInputHandler}
        onKeyDown={onKeyDownInputHandler}
        value={textDescription}
        variant='outlined'
        size='small'
      />

      <Collapse in={isError.isShow}>
        <Alert severity='error' sx={{ my: 1 }}>
          {isError.text}
        </Alert>
      </Collapse>

      <Box width='100%' display='flex' justifyContent='center'>
        <Button
          size='medium'
          sx={{ my: 1, maxWidth: 200 }}
          variant='outlined'
          color='primary'
          onClick={onClickHandler}
          onKeyDown={({ key }) => key === 'Enter' && onClickHandler()}
          disabled={
            textDescription.length === 0 || textDescription.length > 200
          }
        >
          +
        </Button>
      </Box>
    </>
  ) : (
    <div onClick={() => setIsAdderOpened(true)}>
      <IoIosAdd />
      <p> Add a card </p>
    </div>
  );
};
