import React, { PropsWithChildren, useState } from 'react';
import uuid from 'react-uuid';
import { Todo } from '../App';
import styled from 'styled-components';

type Props = {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

function InputForm({ todos, setTodos }: Props) {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const inputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const inputContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title === '' || content === '') {
            alert('제목/내용 모두 입력해야합니다.');
            return;
        }

        const newData = {
            id: uuid(),
            title,
            content,
            isDone: false,
        };

        setTodos([...todos, newData]);
        setTitle('');
        setContent('');
    };
    return (
        <StForm onSubmit={formSubmit}>
            <label>제목</label>
            <input value={title} onChange={inputTitle}></input>
            <label>내용</label>
            <input value={content} onChange={inputContent}></input>
            <button type="submit">추가하기</button>
        </StForm>
    );
}

const StForm = styled.form`
    display: flex;
    align-items: center;
    gap: 5px;
    height: 70px;
    background-color: #8dd2ef;
    border-radius: 12px;
    & input {
        width: 340px;
        border: none;
        height: 28px;
        border-radius: 12px;
    }
    & label {
        width: 70px;
        font-weight: 600;
        padding-left: 8px;
        text-align: center;
    }
    & button {
        margin-left: 20px;
        height: 28px;
        border: none;
        border-radius: 12px;
        width: 80px;
        background-color: #e09dd3;
        color: white;
        font-size: 15px;
        font-weight: 600;

        &:hover {
            border: 1px solid #c95fea;
            box-shadow: rgb(201, 95, 234, 0.4) 0px 0px 0px 3px;
            cursor: pointer;
        }
    }
`;

export default InputForm;