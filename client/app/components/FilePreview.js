import React from 'react';

const FilePreview = (props) => {
  const { currentFile } = props;

  const article = currentFile.title.includes('.md')
    ? <article className='markdown-body entry-content' dangerouslySetInnerHTML={currentFile} />
    : <article className='markdown-body entry-content'>{currentFile.__html}</article>;

  return (
    <div id='readme' className='readme boxed-group clearfix announce instapaper_body md'>
        <h3>{currentFile.title}</h3>
        {article}
    </div>
  );
};

export default FilePreview;
