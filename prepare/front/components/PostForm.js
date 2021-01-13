import {Form, Input, Button} from 'antd';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST } from '../reducers/post';

const PostForm = () => {
    const dispatch = useDispatch();
    const { imagePaths, addPostDone } = useSelector(state => state.post);
    const [text, setText] = useState('');
    const imageInput = useRef();

    useEffect(() => {    // 서버가 오류를 냈는데 작성한 글이 지워지면 안되니깐
        if (addPostDone) {
          setText('');
        }
      }, [addPostDone]);

    const onSubmit = useCallback(()=> {
        dispatch({
            type: ADD_POST_REQUEST,
            data : {
                text,
            },
        });
    }, [text]);

    const onChangeText = useCallback((e)=> {
        setText(e.target.value);
    }, []);

    const onClickImageUpload = useCallback(()=>{
        imageInput.current.click();
    },[imageInput.current]);

    return (
        <Form style={{margin: '10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="무슨 일이 있었죠?" />
            <div>
                <input type="file" multiple hidden ref={imageInput}/>
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type="primart" style={{float: 'right'}} htmlType="submit">등록</Button>
            </div>
            <div>
                {imagePaths.map((v)=>(
                    <div key={v} style={{display:'inline-block'}}>
                        <img src={v} style={{width: '200px'}} alt= {v}/>
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form>
    )
}

export default PostForm;