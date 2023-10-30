import React from 'react';
import Modal from 'react-bootstrap/Modal';
import AppInput from '../AppInput';
import AppButton from '../AppButton';
import { useAppContext } from '../../Context';
import './RegisterModal.css';

const RegistroModal = () => {
  const context = useAppContext();
  return (
    <Modal show={context.showModal} onHide={context.closeModal}>
      <form onSubmit={context.insertAndReset}>
        <Modal.Header closeButton>
          <Modal.Title>
            {!context.isEditing ? 'New' : 'Edit'} register
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Type:</h6>
          <div className='register-type'>
            {['Appointment', 'Income', 'Expense', 'Balance'].map(
              (option, index) => (
                <AppInput
                  key={index}
                  className={option}
                  type='radio'
                  label={option}
                  name='type'
                  value={option}
                  checked={context.formData.type === option}
                  onChange={context.handleInputChange}
                />
              )
            )}
          </div>
          <hr />
          <h6>Data:</h6>
          <div className='register-data'>
            <AppInput
              className='short'
              type='date'
              label='Date'
              name='date'
              value={context.formData.date}
              onChange={context.handleInputChange}
            />
            <AppInput
              className='short'
              type='time'
              label='Time'
              name='time'
              value={context.formData.time}
              onChange={context.handleInputChange}
            />
            <AppInput
              className='short'
              type='number'
              label='Amount'
              name='amount'
              value={context.formData.amount}
              onChange={context.handleInputChange}
            />

            <AppInput
              className='short'
              type='select'
              label='Wallet'
              name='wallet'
              selected={context.formData.wallet}
              selectList={[
                { value: 'Cash', label: 'Cash' },
                { value: 'Funds', label: 'Funds' },
              ]}
              onChange={context.handleInputChange}
            />

            <AppInput
              className='full'
              type='text'
              label='Description'
              name='description'
              value={context.formData.description}
              onChange={context.handleInputChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {context.isEditing && (
            <>
              <AppButton
                classes='app-button'
                type='button'
                label='Delete'
                onClick={() => context.deleteHandler([context.formData.id])}
                icon='RemoveCircleOutline'
              />
              <AppButton
                classes='app-button'
                type='button'
                label='Duplicate'
                onClick={() => context.duplicateHandler([context.formData.id])}
                icon='ContentCopy'
              />
            </>
          )}
          <AppButton
            classes='app-button'
            type='submit'
            label={!context.isEditing ? 'Save' : 'Update'}
            icon='Save'
          />
          <AppButton
            classes='app-button'
            type='button'
            label='Cancel'
            onClick={context.closeModal}
            icon='Close'
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default RegistroModal;
