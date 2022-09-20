import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { useDispatch } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import { StoreDispatch } from '../../redux/store';
import { IColumnProps } from '../../types';
import { Task } from '../Task/Task'

export const Column: React.FC<IColumnProps> = ({
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
  const dispatch = useDispatch<StoreDispatch>();

  const handleOnChange = ({
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

  const handleOnBlur = () => {
    setIsError({ ...isError, isShow: false });
  };

  const handleOnClick = () => {
    if (!isError.isShow) {
      dispatch(addHandler(textDescription));
      setTextDescription('');
    }
  };

  const handleInputKeyDown = ({
    target,
    key,
  }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      if (
        (target as HTMLInputElement).value.length > 0 &&
        (target as HTMLInputElement).value.length <= 200
      ) {
        handleOnClick();
      } else {
        setIsError({
          isShow: true,
          text: 'The input value cannot be empty',
        });
      }
    }
  };

  return (
    <Box borderRadius={1} width='100%' sx={{ boxShadow: 2, p: 3 }}>
      <TextField
        fullWidth
        label={labelText}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onKeyDown={handleInputKeyDown}
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
          onClick={handleOnClick}
          onKeyDown={({ key }) => key === 'Enter' && handleOnClick()}
          disabled={
            textDescription.length === 0 || textDescription.length > 200
          }
        >
          +
        </Button>
      </Box>

      <Droppable droppableId={droppableId}>
        {(provided) => (
          <List
            sx={{
              minHeight: '300px',
              li: {
                flexDirection: 'column',
              },
              '& .MuiListItemText-root': {
                width: '100%',
              },
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {selectorState.map(
              (
                { id, text, isFinished, createdAt, updatedAt, isTextShowed },
                index: number
              ) => (
                <Task
                  id={id}
                  index={index}
                  text={text}
                  isFinished={isFinished}
                  createdAt={createdAt || ''}
                  updatedAt={updatedAt || ''}
                  isTextShowed={isTextShowed || false}
                  updateTextShowed={updateTextShowed}
                  removeHandler={removeHandler}
                  completedHandler={completedHandler}
                />
              )
            )}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </Box>
  );
};
