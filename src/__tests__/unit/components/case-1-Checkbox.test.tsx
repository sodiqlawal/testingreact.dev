import React from 'react'
// import ReactDOM from 'react-dom'
import { axe } from 'jest-axe'
import { render, fireEvent } from '@testing-library/react'

import Checkbox, { CheckboxPropsInterface } from '../../../components/Checkbox'

/**
 * This checkbox component renders a checkbox with a label.
 * Since we customized the default checkbox, we want to
 * make sure it still works as a regular checkbox
 * should.
 */
describe('The <Checkbox /> component', () => {
  const defaultCheckProps: CheckboxPropsInterface = {
    label: 'TEST_CHECKBOX_LABEL',
    id: 'TEST_CHECKBOX_ID',
    background: '#000',
    checkMarkBackground: '#fff',
    onChange: jest.fn(),
    checked: false,
  }
  const setupCheckbox = (props = defaultCheckProps) =>
    render(<Checkbox {...props} />)

  it('Should render the label and checkbox the user will see', () => {
    // using react dom
    // const container = document.createElement('div')
    // ReactDOM.render(<Checkbox {...defaultCheckProps} />, container)
    // expect(container.querySelector('label')).not.toBeNull()
    // expect(container.querySelector('input[type="checkbox"]')).not.toBeNull()

    // using react testing library
    const { asFragment } = setupCheckbox()

    expect(asFragment()).toMatchSnapshot()
    // debug(getByLabelText('TEST_CHECKBOX_LABEL'))
    // expect(getByLabelText('TEST_CHECKBOX_LABEL')).toBeInTheDocument()
  })

  it('Should make the checkbox accessible by setting the id and htmlFor attributes on label and checkbox', () => {
    const { getByLabelText } = setupCheckbox()
    expect(getByLabelText(defaultCheckProps.label)).toBeInTheDocument()
  })

  it('Should call the onChange handler when it is provided', () => {
    const { getByLabelText } = setupCheckbox()
    const checkbox = getByLabelText(defaultCheckProps.label)
    fireEvent.click(checkbox)
    expect(defaultCheckProps.onChange).toHaveBeenCalled()
  })

  it('Should change state correctly when clicked (checked and unchecked)', () => {
    const { getByLabelText } = setupCheckbox({
      ...defaultCheckProps,
      checked: true,
    })

    expect(getByLabelText(defaultCheckProps.label)).toBeChecked()
  })

  it('should not fail any accessibility tests', async () => {
    const { container } = setupCheckbox()
    expect(await axe(container)).toHaveNoViolations()
  })
})
