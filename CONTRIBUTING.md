# Contributing to Inbound Saml

First of all, thanks for taking the time to contriute! 🎉🎉🎉🎉 👍

The following is a seet of guidelines for contributing to **inbound-saml** and its packages, which are hosted in the project's github. **These are mostly guidelines, not rules**. Use your best judgment, and feel free to propose changes to this document in a pull request.

## How can I contribute

______________________________

### Reporting Bugs

- Ensure the bug was not already reported by searching on GitHub under Issues.

- If you're unable to find an open issue addressing the problem, open a new one. Be sure to include a title and clear description, as much relevant information as possible, and a code sample or an executable test case demonstrating the expected behavior that is not occurring.

### Suggesting Enhancement

Enhancement suggestions are tracked as GitHub issues.

- Use a clear and descriptive title for the issue to identify the suggestion.
Provide a step-by-step description of the suggested enhancement in as many details as possible.
- Provide specific examples to demonstrate the steps. Include copy/pasteable snippets which you use in those examples, as Markdown code blocks.
- Describe the current behavior and explain which behavior you expected to see instead and why.
- Explain why this enhancement would be useful to most Inbound Saml users and isn't something that can or should be implemented as a community package.

### Your First Code Contribution

Unsure where to begin contributing to Inbound Saml? You can start by looking through these `good-first-issue` and `help-wanted` issues.

- **Beginner issues** - issues which should only require a few lines of code, and a test or two.
- **Help wanted issues** - issues which should be a bit more involved than beginner issues.

Both issue lists are sorted by total number of comments. While not perfect, number of comments is a reasonable proxy for impact a given change will have.

## Styleguides

### Git Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

A good tool for following Conventional Commits is [commitizen](https://commitizen-tools.github.io/commitizen/). We recommend you to check it.

### Code

For now we follow `standard typescript`. Please feel free to suggest anything different.

## Documentation

Documentation is required for breaking changes or new features.

## ADRS

Take some time to check our Architecture Decision Records in our wiki.

## Package Manager
Lerna for publishing and yarn (workspaces) for package manager

## Tests
TDD is recommended
98% coverage should be maintained
  - `*.spec.ts`: unit tests
  - `*.test.ts`: integration tests
- Run `docker-compose -f docker-compose-test.yml up -d` to start services needed for (integration) tests
- You can turn on test watch mode while you develop using `yarn test:watch`
- To run all tests `yarn test`

## Pull Requests

Submit your PR, all checks must pass. Code will be reviewed.

### Interfaces / Protocols
There are some generic interfaces that may be implemented

## Tools and Tips

