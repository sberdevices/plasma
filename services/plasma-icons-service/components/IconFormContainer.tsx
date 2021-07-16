import { FC, HTMLAttributes } from 'react';
import { connect } from 'react-redux';

import { State } from '../store';

import { IconForm } from './IconForm';

interface IconFormContainer extends HTMLAttributes<HTMLFormElement> {
    name: string;
    children?: never;
}

const IconFormContainer: FC<IconFormContainer> = ({ name, ...rest }) => {
    return <IconForm iconName={name} {...rest} />;
};

const mapStateToProps = (state: State) => ({ name: state.wizard.name });

export default connect(mapStateToProps)(IconFormContainer);
