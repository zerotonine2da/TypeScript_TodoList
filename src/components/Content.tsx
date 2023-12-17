import React from 'react';
import styled from 'styled-components';
import { Todo } from '../types/Todo';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { changeTodos, deleteTodos, getTodos } from '../axios/queryApi';

type Props = {
    isDone: boolean;
};

function Content({ isDone }: Props) {
    const { isLoading, isError, data } = useQuery('todos', getTodos);

    const queryClient = useQueryClient();
    const mutationDelete = useMutation(deleteTodos, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        },
    });
    const mutationChange = useMutation(changeTodos, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        },
    });

    if (isLoading) {
        return <div>로딩중..</div>;
    }

    if (isError) {
        return <div>오류가 발생했습니다</div>;
    }
    const removeHandler = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        try {
            mutationDelete.mutate(id);
        } catch (error) {
            console.log('삭제 오류', error);
        }
    };

    const changeHandler = async (e: React.MouseEvent<HTMLButtonElement>, id: string, isDone: boolean) => {
        try {
            mutationChange.mutate({ id, isDone });
        } catch (error) {
            console.log('상태 업데이트 오류', error);
        }
    };

    return (
        <>
            <StDiv> {isDone ? '✌️Done✌️' : '✍️Working'}</StDiv>
            <StDivLayout>
                {data
                    .filter((item: Todo) => item.isDone === isDone)
                    .map((todo: Todo) => {
                        return (
                            <StDivTodo key={todo.id}>
                                <h3>{todo.title}</h3>
                                <p>{todo.content}</p>

                                <StDivBtn>
                                    <DeleteButton
                                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => removeHandler(e, todo.id)}
                                    >
                                        삭제
                                    </DeleteButton>
                                    <StateButton
                                        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                                            changeHandler(e, todo.id, todo.isDone)
                                        }
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
