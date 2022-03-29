/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-throw-literal */
/* eslint-disable import/no-extraneous-dependencies */
import React, { memo, useState } from 'react';
import styled from 'styled-components';
import { ContainerFluid, PluginHeader, Button as ButtonComponent } from 'strapi-helper-plugin';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';

import {
  importDatabase, exportDatabase, downloadMedia,
} from '../../utils/api';
import readLocalFile from '../../utils/upload';

const Row = styled.div`
  margin: 12px 0;
`;

const Label = styled.label`
  height: 3rem;
  border-radius: 0.3rem;
  font-size: 13px;
  cursor: pointer;
  font-family: Lato;
  font-weight: 500;
  border: 1px solid;
  background-color: #007eff;
  -webkit-font-smoothing: antialiased;
  color: white;
  text-align: center;
  display: inline-block;
  padding: 1px 6px;
  min-width: 14rem;
  margin: 0;
  :hover {
    opacity: 0.9;
  }
`;

const FileInput = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
`;

const Message = styled.span`
  margin-left: 12px;
`;

const Button = styled(ButtonComponent)`
  min-width: 14rem;
  :disabled {
    background: grey;
  }
`;

const Divider = styled.hr`
  max-width: 14rem;
  margin: 0;
`;

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [sql, setSql] = useState(null);
  const [downloading, setDownloading] = useState(false);

  const onClickHandlerDownloadMedia = () => {
    setDownloading(true);
    downloadMedia()
      .then(({ ok, body, env }) => {
        if (ok) {
          const timestamp = format(new Date(), 'yyyy-MM-dd-hh-mm-ss');
          saveAs(body, `cms-files-${env}-${timestamp}.zip`);
        } else {
          throw { message: 'Something went wrong while creating the archive!' };
        }
      })
      .catch((error) => {
        strapi.notification.toggle(
          {
            type: 'warning',
            message: error.message,
          },
        );
      })
      .finally(() => setDownloading(false));
  };

  const onClickHandlerExport = () => {
    setLoading(true);
    exportDatabase()
      .then(({ ok, body, env }) => {
        if (ok) {
          const timestamp = format(new Date(), 'yyyy-MM-dd-hh-mm-ss');
          const filename = `os-cms-dump-${env}-${timestamp}.sql`;
          const file = new File([body], filename);
          saveAs(file);
          strapi.notification.toggle({
            message: 'Successfully exported database.',
          });
        } else {
          throw { message: 'Something went wrong while exporting the database!' };
        }
      })
      .catch((error) => {
        strapi.notification.toggle(
          {
            type: 'warning',
            message: error.message,
          },
        );
      })
      .finally(() => setLoading(false));
  };

  const onClickHandlerImport = () => {
    setLoading(true);
    if (sql) {
      importDatabase(sql)
        .then(({ ok }) => {
          if (ok) {
            strapi.notification.toggle({
              message: 'Successfully imported database.',
            });
          } else {
            throw { message: 'Something went wrong while importing the database!' };
          }
        })
        .catch((error) => {
          strapi.notification.toggle(
            {
              type: 'warning',
              message: error.message,
            },
          );
        })
        .finally(() => setLoading(false));
    } else {
      strapi.notification.toggle({
        type: 'warning',
        message: 'Please upload a sql dump first.',
      });
    }
  };

  const onSourceFileChange = (event) => {
    setSql(null);
    if (event.target.files && event.target.files.length > 0) {
      setLoading(true);
      readLocalFile(event.target.files[0])
        .then(setSql)
        .catch(() => {
          strapi.notification.toggle({
            type: 'warning',
            message: 'Something wrong when uploading the file.',
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <ContainerFluid>
      <PluginHeader
        title="Utilities"
        description="Custom utilities for the OS CMS"
      />

      <Row>
        <Button
          disabled={downloading}
          onClick={onClickHandlerDownloadMedia}
          primary
        >
          Download media
        </Button>
        { downloading
        && (
        <Message>
          creating archive...
        </Message>
        )}
      </Row>

      <Divider />

      <Row>
        <Button
          disabled={loading}
          onClick={onClickHandlerExport}
          primary
        >
          Export database
        </Button>
      </Row>

      <Divider />

      <Row>
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
        { sql && <Message>SQL loaded</Message>}
      </Row>
      <Row>
        <Button
          disabled={loading || !sql}
          onClick={onClickHandlerImport}
          primary
        >
          Import database
        </Button>

      </Row>

    </ContainerFluid>
  );
};

export default memo(HomePage);
