import styles from './SignInForm.module.css'
import React from 'react'
import { signIn } from '../../redux/user/slice'
import { useDispatch } from 'react-redux'
import { useSelector } from '../../redux/hooks'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Form, Input, Button, Checkbox } from 'antd'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

export const SignInForm: React.FC = () => {
  const loading = useSelector(s => s.user.loading)
  const error = useSelector(s => s.user.error)
  const jwt = useSelector(s => s.user.token)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (jwt !== null) {
      history.push('/')
    }
  }, [jwt])

  const onFinish = (values: any) => {
    dispatch(
      signIn({
        email: values.username,
        password: values.password,
      })
    )
  }

  const onFinishFailed = (errorInfo: any) => {}

  return (
    <Form className={styles['register-form']} {...layout} name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
