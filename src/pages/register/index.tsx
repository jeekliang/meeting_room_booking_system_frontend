import { Form, Input, Button, message, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useRequest } from 'ahooks';
import styles from './index.module.scss';
import { getCaptcha, register } from '../../service/user';

const layout1 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

const layout2 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 }
}

export function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { run: runGetCaptcha } = useRequest(getCaptcha, {
    manual: true,
    onSuccess: (res: any) => {
      console.log('getCaptcha', res);
      message.success(res?.data);
    }
  });
  const { run: runRegister } = useRequest(register, {
    manual: true,
    onSuccess: (res: any) => {
      console.log('register', res);
      message.success(res?.data);
      navigate('/login');
    }
  });
  const handleSubmit = async () => {
    const { username, nickname, password, email, captcha } = form.getFieldsValue();
    runRegister({ username, nickname, password, email, captcha });
  }
  const handleSendCaptcha = () => {
    form.validateFields(['email']).then((res: any) => {
      const email = res.email;
      runGetCaptcha({ address: email });
    }).catch((err: any) => {
      // console.log('validateFields', err);
    });
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
        <Form.Item label="昵称" name="nickname" rules={[{ required: true, message: '请输入昵称!' }]}>
          <Input placeholder="请输入昵称" />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码!' }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item label="确认密码" name="confirmPassword" rules={[{ required: true, message: '请输入密码!' }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item label="邮箱" name="email" rules={[
          { required: true, message: '请输入邮箱!' },
          { type: 'email', message: '请输入正确的邮箱格式!' }
          ]}>
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item label="验证码">
          <Row>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[{ required: true, message: '请输入验证码!' }]}
              >
                <Input placeholder="请输入验证码" />
              </Form.Item>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button type="primary" onClick={handleSendCaptcha}>发送验证码</Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item {...layout2}>
          <div className={styles.links}>
            <Link to="/login">已有账号？去登录</Link>
          </div>
        </Form.Item>
        <Form.Item {...layout2}>
          <Button block type="primary" htmlType="submit" onClick={handleSubmit}>注册</Button>
        </Form.Item>
      </Form>
    </div>
  </div>   
}