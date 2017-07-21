import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    textarea {
        width: 100%;
        height: 200px;
    }
`;

const Paste = ({ onChange }) => (
    <Container>
        <textarea placeholder="Paste splunk error here..." onChange={onChange}></textarea>
    </Container>
);

Paste.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default Paste;
