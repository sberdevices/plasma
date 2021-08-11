/**
 * Для сокрытия ненужных пропсов, которые автогенерируются
 * аддоном Controls
 */
export const disableProps = (props: string[]) => {
    const disabled = {};
    props.forEach((prop) => {
        disabled[prop] = { table: { disable: true } };
    });
    return disabled;
};
