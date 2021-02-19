
# Clean
rm -f README.stories.mdx

# Prepend mdx info while coping README.md to README.stories.mdx
cat - README.md > README.stories.mdx <<- EOM
import { Meta } from "@storybook/addon-docs/blocks";

<Meta title="Plasma/About" />

EOM
