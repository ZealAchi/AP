import React from 'react';
import LoadingContext from './Load.Context';
import VariablesContext from './Variables.Context';
import DataContext from './Datos.Context';
import ContactsContext from './Contacts.Context';
import StyledContext from './Styled.Context';
import ModalContext from './Modal.Context';

export function Context({ children }) {
  return (
    <StyledContext>
      <LoadingContext>
        <VariablesContext>
          <DataContext>
            <ContactsContext>
              <ModalContext>{children}</ModalContext>
            </ContactsContext>
          </DataContext>
        </VariablesContext>
      </LoadingContext>
    </StyledContext>
  );
}
