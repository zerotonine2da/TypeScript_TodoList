import React from 'react';
import { Todo } from '../App';
import styled from 'styled-components';

type Props = {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    isDone: boolean;
};

function Content({ todos, setTodos, isDone }: Props) {
    return (
        <>
            <StDiv> {isDone ? '✌️Done✌️' : '✍️Working'}</StDiv>
            <StDivLayout>
                {todos
                    .filter((item) => item.isDone === isDone)
                    .map((todo) => {
                        return (
                            <StDivTodo key={todo.id}>
                                <h3>{todo.title}</h3>
                                <p>{todo.content}</p>

                                <StDivBtn>
                                    <DeleteButton
                                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                            const deleted = todos.filter((item) => {
                                                return todo.id !== item.id;
                                            });
                                            setTodos(deleted);
                                        }}
                                    >
                                        삭제
                                    </DeleteButton>
                                    <StateButton
                                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                            const stateChange = todos.map((item) => {
                                                if (item.id === todo.id) {
                                                    return { ...item, isDone: !item.isDone };
                                                } else {
                                                    return item;
                                                }
                                            });
                                            setTodos(stateChange);
                                        }}
                                    >
                                        {isDone ? '취소' : '완료'}
                                    </StateButton>
                                </StDivBtn>
                            </StDivTodo>
                        );
                    })}
            </StDivLayout>
        </>
    );
}

const StDiv = styled.div`
    font-weight: 700;
    font-size: 20px;
`;

const StDivLayout = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap; /* 가능한 영역 내에서 벗어나지 않고 여러행으로 나누어짐*/
`;

const StDivTodo = styled.div`
    border: 2px solid #8dd2ef;
    padding: 20px;
    width: 250px;
    border-radius: 20px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;

    & h3 {
        font-size: 20px;
    }
`;

const StDivBtn = styled.div`
    display: flex;
    justify-content: end;
    gap: 10px;

    & button {
        height: 28px;
        border: none;
        border-radius: 12px;
        width: 80px;
        font-size: 15px;
        font-weight: 600;
    }
`;

const DeleteButton = styled.button`
    color: white;
    background-color: #cc7676;
    border: 1px solid #cc7676;
    &:hover {
        border: 1px solid #cc7676;
        box-shadow: rgb(204, 118, 118, 0.4) 0px 0px 0px 3px;
    }
`;

const StateButton = styled.button`
    color: white;
    background-color: #77af9c;
    border: 1px solid #77af9c;
    &:hover {
        border: 1px solid #77af9c;
        box-shadow: rgb(119, 175, 156, 0.4) 0px 0px 0px 3px;
    }
`;

export default Content;
