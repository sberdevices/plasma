import { FC } from 'react';
import { connect } from 'react-redux';

import { State } from '../store';
import { setTheme as setThemeAction } from '../store/actions';

import { Header, HeaderProps } from './Header';

interface HeaderContainerProps extends HeaderProps {}

const HeaderContainer: FC<HeaderContainerProps> = ({ theme, setTheme, ...rest }) => {
    return <Header theme={theme} setTheme={setTheme} {...rest} />;
};

const mapStateToProps = (state: State): HeaderContainerProps => ({
    theme: state.app.theme,
});
const mapDispatchToProps: HeaderContainerProps = { setTheme: setThemeAction };

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
