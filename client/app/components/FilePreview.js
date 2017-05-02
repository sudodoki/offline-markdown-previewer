import React from 'react';

const FilePreview = props => {
  const { currentFile } = props;

  const article = currentFile.title.includes('.md')
    ? <article className='markdown-body entry-content' dangerouslySetInnerHTML={currentFile} />
    : <article className='markdown-body entry-content'><pre>{currentFile.__html}</pre></article>;

  return (
    <div id='readme' className='readme boxed-group clearfix announce instapaper_body md'>
        <h3><i className='fa fa-file-code-o'></i> {currentFile.title}</h3>
        {article}
    </div>
  );
};

export default FilePreview;
