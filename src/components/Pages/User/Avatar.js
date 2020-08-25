import PropTypes from 'prop-types';
import ReactAvatarEdit from 'react-avatar-edit';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

export const Avatar = ({ className = '' }) => {
  const [previewSrc, setPreview] = useState('');
  const onClose = () => {
    setPreview('');
  };
  const onCrop = (previewSrcNew) => {
    setPreview(previewSrcNew);
  };
  const onBeforeFileLoad = (e) => {
    if (e.target.files[0].size > 71680) {
      alert('Avatar image is too big');
      e.target.value = '';
    }
  };
  const onFileLoad = (file) => {
    // backend
  };
  return (
    <Row className={className}>
      <Col className="mr-lg-5 mb-4 mb-lg-0" lg="auto">
        <ReactAvatarEdit
          e="Choose Avatar Image"
          height={295}
          width={420}
          onBeforeFileLoad={onBeforeFileLoad}
          onClose={onClose}
          onCrop={onCrop}
          onFileLoad={onFileLoad}
        />
      </Col>
      {previewSrc && (
        <Col className="d-lg-flex align-items-md-center">
          <img alt="Avatar preview" src={previewSrc} title="Avatar preview" />
        </Col>
      )}
    </Row>
  );
};

Avatar.propTypes = {
  className: PropTypes.string,
};
