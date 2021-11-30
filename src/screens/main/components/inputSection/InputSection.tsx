import React, { FC, useState } from 'react';
import { Button, Container, TextareaAutosize, Typography } from '@mui/material';
import i18next from 'i18next';
import { InputNodeMapType } from 'types/InputNodeMapType';
import { useDispatch } from 'react-redux';
import initialData from 'utils/data.json';
import { doSubmit } from '../../mainSlice';

import './styles.css';

const initialNodeMapInput = initialData as InputNodeMapType;

const InputSection: FC = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>(
    JSON.stringify(initialNodeMapInput, null, 2),
  );

  const attemptToSubmit = () => {
    dispatch(doSubmit(inputValue));
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h6" gutterBottom component="div">
        {i18next.t('main.formTitle')}
      </Typography>
      <TextareaAutosize
        className="text-area"
        minRows={10}
        maxRows={10}
        placeholder={i18next.t('main.textAreaPlaceholder')}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button variant="contained" onClick={attemptToSubmit}>
        {i18next.t('main.submitButton')}
      </Button>
    </Container>
  );
};

export default InputSection;
