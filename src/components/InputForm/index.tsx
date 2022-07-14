import { FC, useState } from "react";
import "./styles.css";
import Spin from "../Spin";
import FormData from "./types";
import { Button, Form, Input, Modal, Result } from "antd";
import { ResultStatusType } from "antd/lib/result";

const InputForm: FC = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [modalText, setModalText] = useState("");
  const [statusIcon, setStatusIcon] = useState<ResultStatusType>("success");

  const onFinish = async (values: FormData) => {
    setIsModalVisible(true);
    setIsSpinning(true);
    const { name, dateOfBirth, email, phone } = values;
    try {
      let response = await fetch("http://127.0.0.1:8881/addEmployee", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          dob: dateOfBirth,
          mobile: phone,
        }),
      });

      const { status, statusText } = response;
      if (status === 200) {
        form.resetFields();
        setIsSpinning(false);
        setModalText("Successfully submitted data");
        setStatusIcon("success");
      } else {
        setIsSpinning(false);
        setModalText(`Error occurred while submitting data, ${statusText}`);
        setStatusIcon("error");
      }
    } catch (err) {
      setIsSpinning(false);
      console.log(err);
      setModalText("Failed to post data");
      setStatusIcon("error");
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title="POST RESULT"
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={closeModal}
      >
        {isSpinning ? (
          <Spin />
        ) : (
          <Result status={statusIcon} title={modalText} />
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
          data-testid="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Name" maxLength={100} className="input__box" />
        </Form.Item>

        <Form.Item
          name="email"
          data-testid="email"
          rules={[
            {
              type: "email",
              message: "Please enter correct email address",
            },
            {
              required: true,
              message: "Please enter your E-mail",
            },
          ]}
        >
          <Input
            placeholder="Email"
            maxLength={100}
            className="input__box"
            data-testid="email-input"
          />
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          data-testid="dateOfBirth"
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
          <Input
            placeholder="Date of Birth"
            className="input__box"
            data-testid="dob-input"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          data-testid="phone"
          rules={[
            { required: true, message: "Please enter phone number" },
            {
              pattern: new RegExp(
                "^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$"
              ),
              message: "Please enter correct phone number",
            },
          ]}
        >
          <Input
            className="input__box"
            placeholder="Phone number"
            data-testid="phone-input"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="submit__button"
            data-testid="submit-btn"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default InputForm;
