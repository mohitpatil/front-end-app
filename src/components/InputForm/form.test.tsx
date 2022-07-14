import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputForm from '.';

test('renders form component', () => {
  render(<InputForm />);
  
  const formHeader = screen.getByText(/Please enter following details/i);
  expect(formHeader).toBeInTheDocument();
  
  const nameInputBox = screen.getByTestId('name');
  expect(nameInputBox).toBeInTheDocument();
  
  const emailInputBox = screen.getByTestId('email');
  expect(emailInputBox).toBeInTheDocument();

  const dobInputBox = screen.getByTestId('dateOfBirth');
  expect(dobInputBox).toBeInTheDocument();

  const phoneInputBox = screen.getByTestId('phone');
  expect(phoneInputBox).toBeInTheDocument();
});

test('all the fields are required', async () => {
  render(<InputForm />);
  const submitButton = screen.getByTestId('submit-btn');
  userEvent.click(submitButton);
  const requiredAlert = await screen.findAllByRole('alert')
  expect(requiredAlert).toHaveLength(4);
});

test('phone number only accepts valid input', async () => {
  render(<InputForm />);
  const phoneInputBox = screen.getByTestId('phone-input');
  const submitButton = screen.getByTestId('submit-btn');

  await userEvent.type(phoneInputBox, '+918666666666');
  userEvent.click(submitButton);
  const alertsCount = await screen.findAllByRole('alert');
  expect(alertsCount).toHaveLength(3);

  await userEvent.type(phoneInputBox, '86645');
  userEvent.click(submitButton);
  const invalidInputError = await screen.findByText(/Please enter correct phone number/i);
  expect(invalidInputError).toBeInTheDocument();
  await userEvent.type(phoneInputBox, '55859345345344');
  expect(invalidInputError).toBeInTheDocument();
});

test('email only accepts valid email address', async () => {
  render(<InputForm />);
  const emailInputBox = screen.getByTestId('email-input');
  const submitButton = screen.getByTestId('submit-btn');
  await userEvent.type(emailInputBox, 'email');
  await userEvent.click(submitButton);
  const invalidInputError = await screen.findByText(/Please enter correct email address/i);
  expect(invalidInputError).toBeInTheDocument();
  await userEvent.type(emailInputBox, '@email.');
  expect(invalidInputError).toBeInTheDocument();
});

test('date of birth only accepts in format DD/MM/YYYY valid date', async () => {
  render(<InputForm />);
  const dateInputBox = screen.getByTestId('dob-input');
  const submitButton = screen.getByTestId('submit-btn');
  await userEvent.type(dateInputBox, '12/03');
  await userEvent.click(submitButton);
  const invalidInputError = await screen.findByText("Date is incorrect, please enter as DD/MM/YYYY");
  expect(invalidInputError).toBeInTheDocument();
  await userEvent.type(dateInputBox, ''); //clear input
  await userEvent.type(dateInputBox, '22/22/2011');
  expect(invalidInputError).toBeInTheDocument();
});

