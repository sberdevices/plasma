import { useState } from 'react';
import styled from 'styled-components';
import { DatePicker, TimePicker, Footnote2, Switch } from '@sberdevices/plasma-ui';
import { isSberBox } from '@sberdevices/plasma-ui/utils';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 1rem;
    height: 100%;
`;
const StyledPickers = styled.div`
    display: grid;
    grid-template-columns: repeat(3, max-content);
    gap: 2rem;
    align-items: center;
`;

const isSberbox = isSberBox();

export default function PickersPage() {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const min = new Date(2000, 0, 1, 0, 0, 0);
    const max = new Date(2030, 11, 31, 23, 59, 59);
    const scrollSnapType = isSberbox ? 'none' : 'mandatory';
    const [isFullDay, setIsFullDay] = useState(false);

    return (
        <StyledWrapper>
            <StyledPickers>
                <DatePicker
                    id="datepicker"
                    value={date}
                    min={min}
                    max={max}
                    controls={true}
                    autofocus={true}
                    scrollSnapType={scrollSnapType}
                    onChange={(d) => setDate(d)}
                />
                <TimePicker
                    id="timepicker"
                    value={time}
                    min={min}
                    max={max}
                    controls={true}
                    autofocus={false}
                    scrollSnapType={scrollSnapType}
                    disabled={isFullDay}
                    onChange={(t) => setTime(t)}
                />
                <Switch
                    label="Целый день"
                    checked={isFullDay}
                    onChange={(event) => setIsFullDay(event.target.checked)}
                />
            </StyledPickers>
            <Footnote2>
                Date/Time: {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()} {time.getHours()}:
                {time.getMinutes()}:{time.getSeconds()}
            </Footnote2>
        </StyledWrapper>
    );
}
