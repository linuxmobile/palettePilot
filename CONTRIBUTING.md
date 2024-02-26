# Contributing

## Reporting issues

If you have found what you think is a bug, please [file an issue](https://github.com/linuxmobile/palettePilot/issues). **PLEASE NOTE**: Issues that are identified as implementation questions or non-issues will be immediately closed.

## Suggesting new features

If you are here to suggest a feature, first create an issue if it does not already exist. From there, we will discuss use-cases for the feature and then finally discuss how it could be implemented.

## Development

If you have been assigned or volunteer to fix an issue or develop a new feature, please follow these steps to get started:

- Fork this repository.
- Install dependencies by running `bun install`.
- Run development server using `bun run dev` or `bun run dev -o` to directly visualize the project.
- Implement your changes.
- Document your changes if necessary.
- Git stage your required changes and commit (see below commit guidelines).
- Submit PR for review.

## Commit message conventions

Each commit message consists of a header, a body (optional) and a footer (optional). The header has a special format that includes a **type**, a **scope**, and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

**Simple commit example**:

```
feat: share palette via url
```

Any line of the commit message cannot be longer than 100 characters! This allows the message to be easier to read on GitHub as well as in various git tools.

### Type

Must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semicolons, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

### Scope

The scope could be anything specifying place of the commit change.

You can use `*` when the change affects more than a single scope.

### Subject

The subject contains succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter
- no dot (.) at the end

### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>`, where the hash is the SHA of the commit being reverted.
