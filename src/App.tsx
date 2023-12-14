import { useState } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import uuid from 'react-uuid';
import Content from './components/Content';
import styled from 'styled-components';

export type Todo = {
    id: string;
    title: string;
    content: string;
    isDone: boolean;
};

function App() {
    const initialState: Todo = {
        id: uuid(),
        title: '제목1',
        content: '내용1',
        isDone: false,
    };

    const [todos, setTodos] = useState<Todo[]>([initialState]);

    return (
        <StDiv>
            <StHeader>
                <p>My Todo List📝</p>
                <p>React</p>
            </StHeader>
            <StMain>
                <InputForm todos={todos} setTodos={setTodos} />
                <Content todos={todos} setTodos={setTodos} isDone={false} />
                <Content todos={todos} setTodos={setTodos} isDone={true} />
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
