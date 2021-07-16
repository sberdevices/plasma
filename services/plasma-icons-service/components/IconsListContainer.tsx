import { FC, useCallback } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { iconSectionsSet } from '@sberdevices/plasma-icons';

import { State } from '../store';
import { openPanel as showPanelAction } from '../store/actions';
import { setWizardItem as setWizardItemAction } from '../store/actions/wizard';
import { WizardItemType } from '../store/types';
import { Data, Item } from '../types';

import { IconsList } from './IconsList';

export interface StateProps {
    itemName?: string;
}
export interface DispatchProps {
    setWizardItem: Function;
}
export interface OwnProps {
    searchQuery?: string;
}
interface IconsListContainerProps extends StateProps, DispatchProps, OwnProps {}

const icons = Object.entries(iconSectionsSet).reduce((acc, [groupName, group]) => {
    acc.push({
        name: groupName,
        items: Object.entries(group).reduce((a, [iconName, component]) => {
            a.push({ name: iconName, component });

            return a;
        }, [] as Item[]),
    });

    return acc;
}, [] as Data);

const IconsListContainer: FC<IconsListContainerProps> = ({ searchQuery, itemName, setWizardItem, ...rest }) => {
    const onItemClick = useCallback((name) => setWizardItem('icon', name), [setWizardItem]);

    let items = icons;
    if (searchQuery) {
        const searchRegExp = new RegExp(searchQuery);
        items = icons
            .map((group) => ({ ...group, items: group.items.filter((item) => item.name.search(searchRegExp) !== -1) }))
            .filter((group) => group.items.length);
    }

    if (!items.length) {
        return <div>Nothing found</div>;
    }

    return <IconsList items={items} size="s" activeItemName={itemName} onItemClick={onItemClick} {...rest} />;
};

const mapStateToProps = (state: State) => ({ itemName: state.wizard.name });
const mapDispatchToProps = (dispatch: Dispatch): IconsListContainerProps => ({
    setWizardItem: (type: WizardItemType, name: string) => {
        dispatch(setWizardItemAction(type, name));
        dispatch(showPanelAction());
    },
});

export default connect<StateProps, DispatchProps, OwnProps, State>(
    mapStateToProps,
    mapDispatchToProps,
)(IconsListContainer);
