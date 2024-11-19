import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import styles from './index.module.scss';
import { login } from '../../service/user';

const layout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

const layout2 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 }
}

export function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleLogin = async () => {
    const { username, password } = form.getFieldsValue();
    const res: any = await login({ username, password });
    if (res?.code === 201 || res?.code === 200) {
      message.success(res?.message);
      // localStorage.setItem('token', res.data.token);
      navigate('/'); 
    }
  }
  return <div className={styles.container}>
    <h1>会议室预定系统</h1>
    <div>
      <Form
        form={form}
        {...layout1}
        
      >
        <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码!' }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item {...layout2}>
          <div className={styles.links}>
            <Link to="/register">创建账号</Link>
            <Link to="">忘记密码</Link>
          </div>
        </Form.Item>
        <Form.Item {...layout2}>
          <Button block type="primary" htmlType="submit" onClick={handleLogin}>登录</Button>
        </Form.Item>
      </Form>
    </div>
  </div>   
}