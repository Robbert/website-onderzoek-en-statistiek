import React, { memo, useState } from 'react';
import styled from 'styled-components';
import { ContainerFluid, PluginHeader, Button} from 'strapi-helper-plugin';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';

import { importDatabase, exportDatabase } from '../../utils/api';
import { readLocalFile } from '../../utils/upload.js';

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [sql, setSql] = useState(null);

  const onClickHandlerExport = () => {
    setLoading(true);
    exportDatabase().then(({ok, body, env}) => {
      if(ok){
        const timestamp = format(new Date(), 'yyyy-MM-dd-hh-mm-ss')
        const filename = `os-cms-dump-${env}-${timestamp}.sql`;
        const file = new File([body], filename);
        saveAs(file);
        strapi.notification.toggle({
          message: 'Successfully exported database.'
        });
      }
      else {
        throw {message: 'Something went wrong!'}
      }
    }).catch((error) => {
      strapi.notification.toggle(
        {type: 'warning', 
        message: error.message
      });
    }).finally(() => {
      setLoading(false);
    })
  };

  const onClickHandlerImport = () => {
    setLoading(true);
    if(sql){
      importDatabase(sql).then(({ok}) => {
        if(ok){
          strapi.notification.toggle({
            message: 'Successfully imported database.'
          });          
        }
        else {
          throw {message: 'Something went wrong!'}
        }
      }).catch((error) => {
        strapi.notification.toggle(
          {type: 'warning', 
          message: error.message
        });
      }).finally(() => {
        setLoading(false);
      })
    }
    else {
      strapi.notification.toggle({
        type: 'warning', 
        message: 'Please upload a sql dump first.'
      });
    }
  } 

  const onSourceFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSql(null);
      setLoading(true);
      readLocalFile(event.target.files[0])
        .then(setSql)
        .catch((error) => {
          strapi.notification.toggle({
            type: 'warning', 
            message: 'Something wrong when uploading the file.'
          });
        })
        .finally(() => {
          setLoading(false);
        })
    }
  };

  const Row = styled.div`
    margin: 12px 0;
  `;

  return (
    <ContainerFluid>
      <PluginHeader
        title="Utilities"
        description="Custom utilities for the OS CMS"
      />

      <Row>
        <Button disabled={loading}
                onClick={onClickHandlerExport}
                primary>Export database</Button>
      </Row>
      
      <Row>
        <Button disabled={loading}
                onClick={onClickHandlerImport}
                primary>Import database</Button>

        <input id="source"
                name="source"
                accept={".sql"}
                type="file"
                onChange={onSourceFileChange}
        />
      </Row>  

    </ContainerFluid>
  );
};

export default memo(HomePage);