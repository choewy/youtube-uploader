import { useState } from 'react';

const Mypage = (props) => {
  const { user } = props;
  const [editable, setEditable] = useState(false);
  const [values, setValues] = useState(user);

  if (!user) return <></>;

  const valuesChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setValues({ ...values, [name]: value });
  };

  const editMode = () => setEditable(true);
  const diseditableMode = () => setEditable(false);

  const valuesSave = () => {
    setEditable(false);
  };

  return (
    <div className="mypage">
      {!editable ? (
        <>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <button onClick={editMode}>수정</button>
        </>
      ) : (
        <>
          <input
            type="text"
            name="name"
            value={values.name}
            placeholder="이름을 입력하세요."
            autoComplete="off"
            onChange={valuesChange}
          />
          <button onClick={valuesSave}>저장</button>
          <button onClick={diseditableMode}>취소</button>
        </>
      )}
    </div>
  );
};

export default Mypage;
