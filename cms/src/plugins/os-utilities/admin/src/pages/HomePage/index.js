/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
import React, { memo, useState } from 'react';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import styled from 'styled-components';
import { BaseHeaderLayout } from '@strapi/design-system/Layout';
import { Button as ButtonComponent } from '@strapi/design-system/Button';
import { Alert } from '@strapi/design-system/Alert';

import { importDatabase, exportDatabase, downloadMedia } from '../../utils/api';
import readLocalFile from '../../utils/upload';

const Container = styled.div`
  margin: 12px 56px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AlertBox = styled.div`
  height: 80px;
`;

const Label = styled.label`
  -webkit-box-align: center;
  align-items: center;
  padding: 6px 16px 7px 16px;
  background: rgb(73, 69, 255);
  border: 1px solid rgb(73, 69, 255);
  border-radius: 4px;
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
  width: 150px;
  line-height: 1.33;
  :hover {
    border: 1px solid rgb(123, 121, 255);
    background: rgb(123, 121, 255);
  }
`;

const Button = styled(ButtonComponent)`
  width: 150px;
`;

const FileInput = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
`;

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [downloading, setDownLoading] = useState(false);
  const [sql, setSql] = useState(null);
  const [message, setMessage] = useState();

  const onClickHandlerDownloadMedia = () => {
    setDownLoading(true);
    setMessage({
      variant: 'information',
      text: 'creating media zip file',
    });
    downloadMedia()
      .then(({ ok, body, env }) => {
        if (ok) {
          const timestamp = format(new Date(), 'yyyy-MM-dd-hh-mm-ss');
          saveAs(body, `cms-files-${env}-${timestamp}.zip`);
        } else {
          setMessage({
            variant: 'danger',
            text: 'Something went wrong while creating the archive!',
          });
        }
      })
      .catch((error) => {
        setMessage({
          variant: 'success',
          text: error.message,
        });
      })
      .finally(() => {
        setDownLoading(false);
        setMessage({
          variant: 'success',
          text: 'Successfully downloaded media files',
        });
      });
  };

  const onClickHandlerExport = () => {
    setLoading(true);
    exportDatabase().then(({ ok, body, env }) => {
      if (ok) {
        const timestamp = format(new Date(), 'yyyy-MM-dd-hh-mm-ss');
        const filename = `os-cms-dump-${env}-${timestamp}.sql`;
        const file = new File([body], filename);
        saveAs(file);
        setMessage({
          variant: 'success',
          text: 'Successfully exported database.',
        });
      } else {
        setMessage({
          variant: 'danger',
          text: 'Something went wrong!',
        });
      }
    }).catch((error) => {
      setMessage({
        variant: 'success',
        text: error.message,
      });
    }).finally(() => {
      setLoading(false);
    });
  };

  const onClickHandlerImport = () => {
    setLoading(true);
    if (sql) {
      importDatabase(sql).then(({ ok }) => {
        if (ok) {
          setMessage({
            variant: 'success',
            text: 'Successfully imported database.',
          });
        } else {
          setMessage({
            variant: 'danger',
            text: 'Something went wrong!',
          });
        }
      }).catch((error) => {
        setMessage({
          variant: 'danger',
          text: error.message,
        });
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setMessage({
        variant: 'danger',
        text: 'Please upload a sql dump first.',
      });
    }
  };

  const onSourceFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSql(null);
      setLoading(true);
      readLocalFile(event.target.files[0])
        .then(setSql)
        .catch(() => {
          setMessage({
            variant: 'danger',
            text: 'Something wrong when uploading the file.',
          });
        })
        .finally(() => {
          setLoading(false);
          setMessage({
            variant: 'success',
            text: 'Successfully loaded sql.',
          });
        });
    }
  };

  return (
    <>
      <BaseHeaderLayout
        title="O&S Utilities"
        subtitle="Custom utilities for the OS CMS "
        as="h2"
      />

      <Container>
        <AlertBox>
          { message && <Alert closeLabel="Close alert" variant={message.variant} onClose={() => setMessage()}>{message.text}</Alert>}
        </AlertBox>

        <Button
          disabled={downloading}
          onClick={onClickHandlerDownloadMedia}
          primary
        >
          Download media
        </Button>

        <Button
          disabled={loading}
          onClick={onClickHandlerExport}
          primary
        >
          Export database
        </Button>

        <Label htmlFor="source">
          Upload sql-file
          <FileInput
            id="source"
            name="source"
            accept=".sql"
            type="file"
            onChange={onSourceFileChange}
          />
        </Label>

        <Button
          disabled={loading || !sql}
          onClick={onClickHandlerImport}
          primary
        >
          Import database
        </Button>

      </Container>

    </>
  );
};

export default memo(HomePage);
