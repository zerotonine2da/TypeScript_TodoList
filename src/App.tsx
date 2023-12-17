import './App.css';
import InputForm from './components/InputForm';
import Content from './components/Content';
import styled from 'styled-components';
import { useEffect } from 'react';
import { __getTodos } from './redux/modules/todoSlice';
import { useAppDispatch } from './redux/config/configStore';

function App() {
    const dispatch = useAppDispatch();

    //데이터 가져오기
    useEffect(() => {
        dispatch(__getTodos());
    }, [dispatch]);

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
