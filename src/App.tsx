import './App.css';
import InputForm from './components/InputForm';
import Content from './components/Content';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
    return (
        <StDiv>
            <StHeader>
                <p>My Todo List📝</p>
                <p>React</p>
            </StHeader>
            <StMain>
                <InputForm />
                <Content isDone={false} />
                <Content isDone={true} />
            </StMain>
            <footer></footer>
        </StDiv>
    );
}

const StDiv = styled.div`
    max-width: 1200px;
    min-width: 800px;
    margin: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const StHeader = styled.header`
    margin: 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    & p {
        font-size: 20px;
        font-weight: 500;
    }
`;

const StMain = styled.main`
    margin: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

export default App;
