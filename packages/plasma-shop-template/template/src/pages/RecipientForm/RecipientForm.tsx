import React from 'react';
import { Form, isSberBoxLike, Header } from '@sberdevices/plasma-temple';
import { Button } from '@sberdevices/plasma-ui';
import { IconKeyboard } from '@sberdevices/plasma-icons';

import { PageComponentProps, Recipient } from '../../types';
import { RecipientInfoContext } from '../MakeOrder/RecipientInfoContext';

import { FormContent } from './components/FormContent/FormContent';

interface ManualModeButtonProps {
    visible: boolean;
    onClick: () => void;
}

const ManualModeButton: React.FC<ManualModeButtonProps> = ({ onClick, visible }) => {
    if (!visible || isSberBoxLike()) {
        return null;
    }

    return <Button contentLeft={<IconKeyboard />} text="Клавиатура" view="clear" size="s" onClick={onClick} />;
};

export const RecipientForm: React.FC<PageComponentProps<'recipient'>> = ({ name: screen, popScreen, header }) => {
    const [manualMode, setManualMode] = React.useState(true);

    const { recipient, changeRecipientInfo } = React.useContext(RecipientInfoContext);

    const onSubmitHandler = React.useCallback(
        (data: Recipient) => {
            changeRecipientInfo({ recipient: data });
            popScreen();
        },
        [popScreen, changeRecipientInfo],
    );

    const headerProps = {
        ...header,
        children: <ManualModeButton visible={!manualMode} onClick={() => setManualMode(true)} />,
        title: 'Данные получателя',
    };

    return (
        <>
            <Header {...headerProps} />
            <Form initialData={recipient} onSubmit={onSubmitHandler} sequence={['address', 'name', 'phone', 'email']}>
                {(formProps) => (
                    <FormContent screen={screen} manualMode={manualMode} setManualMode={setManualMode} {...formProps} />
                )}
            </Form>
        </>
    );
};
