const path = require('path');

exports.onCreateWebpackConfig = (args) => {
    args.actions.setWebpackConfig({
        resolve: {
            alias: {
                react: path.resolve('../node_modules/react'),
            },
        },
    });
};
