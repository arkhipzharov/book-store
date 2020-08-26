import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import * as h from '@/js/helpers';
import { useLocation } from 'react-router';

const BASE_INPUTS_DATA_AND_STATE = {
  username: {
    placeholder: 'SpiderMan',
    value: '',
  },
  password: {
    placeholder: 'Sup3rs3cr3t&_',
    value: '',
  },
};

export const AuthForm = () => {
  const { pathname } = useLocation();
  const { register, handleSubmit } = useForm(
    h.baseInputsStateFromDataAndState(BASE_INPUTS_DATA_AND_STATE),
  );
  const onSubmit = (inputsData) => {
    console.log(inputsData);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {Object.entries(BASE_INPUTS_DATA_AND_STATE).map(
        ([name, data], i, arr) => (
          <Form.Group
            key={name}
            className={i === arr.length - 1 && 'mb-4'}
            controlId={name}
          >
            <Form.Label sm={1.5} column>
              {_.upperFirst(name)}:
            </Form.Label>
            <Form.Control
              ref={register}
              name={name}
              placeholder={data.placeholder}
            />
          </Form.Group>
        ),
      )}
      <Button type="submit" block>
        {pathname === '/login' ? 'Log In' : 'Sign Up'}
      </Button>
    </Form>
  );
};
