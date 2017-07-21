import React from 'react';
import PropTypes from 'prop-types';

const FlexIframe = ({ src }) => (
    <div>
        <iframe id="iframe" src={ src } scrolling="no" frameBorder="0"></iframe>
    </div>
);

FlexIframe.propTypes = {
    src: PropTypes.string.isRequired
};

export default FlexIframe;
