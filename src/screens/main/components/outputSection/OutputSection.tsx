import React, { FC } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import i18next from 'i18next';
import { Canvas } from 'reaflow';
import { useAppSelector } from 'app/hooks';
import { selectData, selectError } from '../../mainSlice';

import './styles.css';

const OutputSection: FC = () => {
  const data = useAppSelector(selectData);
  const error = useAppSelector(selectError);

  const renderOutputMessage = () => {
    let outputMessage = '';

    if (error) {
      outputMessage = error;
    } else if (data.nodes.length || data.edges.length) {
      outputMessage = i18next.t('main.success');
    }

    if (!outputMessage) {
      return null;
    }

    return (
      <div className="output-message-block">
        <Typography variant="h6" gutterBottom component="div">
          {outputMessage}
        </Typography>
      </div>
    );
  };

  const renderData = () => {
    if (!data.nodes.length || !data.edges.length) {
      return null;
    }

    return (
      <Paper elevation={0}>
        <Canvas nodes={data.nodes} edges={data.edges} maxHeight={768} maxWidth={1024} />
      </Paper>
    );
  };

  return (
    <Container maxWidth="lg">
      {renderOutputMessage()}
      {renderData()}
    </Container>
  );
};

export default OutputSection;
