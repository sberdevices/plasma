import { useState } from 'react';
import styled from 'styled-components';
import { DatePicker, TimePicker, Footnote2 } from '@sberdevices/plasma-ui';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 1rem;
    height: 100%;
`;
const StyledPickers = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
`;
const StyledDatePicker = styled(DatePicker)`
    /* height: 100%; */
`;
const StyledTimePicker = styled(TimePicker)`
    /* height: 100%; */
    margin-left: 2rem;
`;

export default function PickersPage() {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const min = new Date(2000, 0, 1, 0, 0, 0);
    const max = new Date(2030, 11, 31, 23, 59, 59);

    return (
        <StyledWrapper>
            <StyledPickers>
                <StyledDatePicker
                    id="datepicker"
                    value={date}
                    min={min}
                    max={max}
                    controls={true}
                    autofocus={true}
                    onChange={(d) => setDate(d)}
                />
                <StyledTimePicker
                    id="timepicker"
                    value={time}
                    min={min}
                    max={max}
                    controls={true}
                    autofocus={false}
                    onChange={(t) => setTime(t)}
                />
            </StyledPickers>
            <Footnote2>
                Date/Time: {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate() + 1} {time.getHours()}:
                {time.getMinutes()}:{time.getSeconds()}
            </Footnote2>
        </StyledWrapper>
    );
}
