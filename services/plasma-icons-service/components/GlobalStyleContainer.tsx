import type { FC } from 'react';
import { connect } from 'react-redux';

import { State } from '../store';

import { GlobalStyle, GlobalStyleProps } from './GlobalStyle';

const GlobalStyleContainer: FC<GlobalStyleProps> = (props) => {
    return <GlobalStyle {...props} />;
};

const mapStateToProps = (state: State): GlobalStyleProps => ({
    theme: state.app.theme,
    isPanelOpen: state.app.isPanelOpen,
});

export default connect(mapStateToProps)(GlobalStyleContainer);
