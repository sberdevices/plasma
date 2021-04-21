
# Clean
rm -f README.stories.mdx
rm -f Tokens.stories.mdx

# Prepend mdx info while coping README.md to README.stories.mdx
cat - README.md > README.stories.mdx <<- EOM
import { Meta } from "@storybook/addon-docs/blocks";

<Meta title="About" />

EOM

# Prepend mdx info while coping README.md to README.stories.mdx
cat - ../plasma-tokens/README.md > Tokens.stories.mdx <<- EOM
import { Meta } from "@storybook/addon-docs/blocks";

<Meta title="Tokens" />

EOM
