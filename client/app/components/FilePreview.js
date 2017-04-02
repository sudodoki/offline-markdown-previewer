import React from 'react';

const FilePreview = (props) => {
  return <div className='file-preview' dangerouslySetInnerHTML={props.fileHtml} />;
};

export default FilePreview;
