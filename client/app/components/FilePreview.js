import React from 'react';

const FilePreview = (props) => {
  const { currentFile } = props;

  return (
    <div id='readme' className='readme boxed-group clearfix announce instapaper_body md'>
        <h3>{currentFile.title}</h3>
        <article className='markdown-body entry-content' dangerouslySetInnerHTML={currentFile} />
    </div>
  );
};

export default FilePreview;
