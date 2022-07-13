import { FC, useState } from "react";
import "./styles.css";
import Spin from "../Spin";
import FormData from "./types";
import { Button, Form, Input, Modal, Result } from "antd";

const InputForm: FC = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const onFinish = async (values: FormData) => {
    setIsModalVisible(true);
    setIsSpinning(true);
    const { name, dateOfBirth, email, phone } = values;
    try {
      let response = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          dob: dateOfBirth,
          phoneNumber: phone,
        }),
      });

      const { status, statusText } = response;
      if (status === 200) {
        form.resetFields();
        setIsSpinning(false);
      } else {
        console.log(
          "Error occurred while submitting data",
          statusText
        );
      }
    } catch (err) {
      setIsModalVisible(false);
      alert(err);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal title="form-submit" visible={isModalVisible} onOk={handleOk}>
        {isSpinning ? (
          <Spin />
        ) : (
          <Result status="success" title="Successfully submitted data" />
        )}
      </Modal>
      <Form
        form={form}
        name="user-form"
        className="user__form"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <p className="form__title">Please enter following details</p>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input placeholder="Name" maxLength={100} className="input__box" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "This is not a valid E-mail",
            },
            {
              required: true,
              message: "Please enter your E-mail!",
            },
          ]}
        >
          <Input placeholder="Email" maxLength={100} className="input__box" />
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          preserve={false}
          rules={[
            {
              pattern: new RegExp(
                `^(?:0[1-9]|[12]\\d|3[01])([\\/.-])(?:0[1-9]|1[012])\\1(?:19|20)\\d\\d$`
              ),
              message: "Date is incorrect, please enter as DD/MM/YYYY",
            },
            {
              required: true,
              message: "Please enter your date of birth",
            },
          ]}
        >
          <Input placeholder="Date of Birth" className="input__box" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please enter phone number!" },
            {
              pattern: new RegExp(
                "^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$"
              ),
              message: "Please enter correct phone number",
            },
          ]}
        >
          <Input className="input__box" placeholder="Phone number" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="save__button">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default InputForm;
