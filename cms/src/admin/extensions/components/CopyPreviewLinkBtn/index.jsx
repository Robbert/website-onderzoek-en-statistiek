import React, { useState, useEffect } from 'react';
import { Button } from '@strapi/design-system/Button';
import File from '@strapi/icons/File';
import Check from '@strapi/icons/Check';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

const CopyPreviewLinkBtn = () => {
  const [succes, setSucces] = useState(false);
  const { slug, initialData } = useCMEditViewDataManager();

  useEffect(() => {
    if (succes) {
      setTimeout(() => {
        setSucces(false);
      }, 2500);
    }
  }, [succes]);

  const handleClick = () => {
    navigator.clipboard.writeText(`https://onderzoek.amsterdam.nl/api/preview?type=${slug.split('.')[1]}&slug=${initialData.slug}`)
      .then(
        () => {
          setSucces(true);
        },
      );
  };

  return (
    <Button
      variant="secondary"
      onClick={handleClick}
      startIcon={succes ? <Check /> : <File />}
    >
      Copy preview link
    </Button>
  );
};

export default CopyPreviewLinkBtn;
