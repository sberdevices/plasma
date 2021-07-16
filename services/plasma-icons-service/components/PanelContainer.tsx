import { FC, HTMLAttributes, useCallback } from 'react';
import { connect } from 'react-redux';

import { State } from '../store';
import { closePanel as closePanelAction } from '../store/actions';

import { Panel } from './Panel';

interface PanelContainerStateProps {
    isOpen?: boolean;
    name: string;
}
interface PanelContainerFunctionProps {
    closePanel: Function;
}

interface PanelContainerProps
    extends PanelContainerStateProps,
        PanelContainerFunctionProps,
        HTMLAttributes<HTMLDivElement> {}

const PanelContainer: FC<PanelContainerProps> = ({ isOpen, name, closePanel, ...rest }) => {
    const onClose = useCallback(() => closePanel(), [closePanel]);

    return <Panel isOpen={Boolean(isOpen)} onClose={onClose} heading={name} {...rest} />;
};

const mapStateToProps = (state: State): PanelContainerStateProps => ({
    isOpen: state.app.isPanelOpen,
    name: state.wizard.name,
});
const mapDispatchToProps: PanelContainerFunctionProps = { closePanel: closePanelAction };

export default connect(mapStateToProps, mapDispatchToProps)(PanelContainer);
