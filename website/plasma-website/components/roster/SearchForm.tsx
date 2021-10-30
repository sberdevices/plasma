import { memo, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { TextField, TextFieldProps, Button } from '@sberdevices/plasma-b2c';
import { IconSearch } from '@sberdevices/plasma-icons';
import { tertiary } from '@sberdevices/plasma-tokens-b2c';

interface SearchFormProps {
    onInput: TextFieldProps['onInput'];
}

const StyledForm = styled.form``;
const StyledButton = styled(Button)`
    cursor: text;
`;

export const SearchForm = memo<SearchFormProps>(({ onInput }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const onIconClick = useCallback(() => inputRef.current?.focus(), []);

    return (
        <StyledForm>
            <TextField
                ref={inputRef}
                placeholder="Search"
                size="m"
                onInput={onInput}
                contentLeft={
                    <StyledButton
                        type="button"
                        view="clear"
                        shiftLeft
                        contentLeft={<IconSearch color={tertiary} />}
                        onClick={onIconClick}
                    />
                }
            />
        </StyledForm>
    );
});
