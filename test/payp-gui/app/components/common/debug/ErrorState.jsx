import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import testResize from '../utils/resize';

const Container = styled.div`
    overflow-y: scroll;
`;

const Json = styled.pre`
    outline: 1px solid #ccc; 
    padding: 5px; 
    margin: 5px; 
    .string { color: green; }
    .number { color: blue; }
    .boolean { color: darkorange; }
    .null { color: darkorange; }
    .key { color: black; }
`;

class ErrorState extends React.Component {
    componentDidMount = () => {
        testResize();
    };
    render() {
        return (
            <Container>
                <Json>
                    { JSON.stringify(this.props.errorState, undefined, 4) }
                </Json>
            </Container>
        );
    }
}

ErrorState.propTypes = {
    errorState: PropTypes.object
};

export default ErrorState;
