# Contributing
Your help is greatly appreciated! Since I'm a one-person team trying to manage a slew of open source code along with balancing a job and family, all help provided can improve and maintain these packages. I'm not a stickler for rules, but there are some guidelines I'd like all contributors to follow to keep the code maintainable and applicable to its original intent.

**Note:** Going forward, all of my open source Node Modules are going to follow an automated release system which will greatly reduce the need of my intervention to pushing new releases to NPM. Read more about this in the [Automated Releases](#automated-releases) section below.

## Getting Started
- You must have a Github account.
- Submit an issue to this repo with the enhancement or fix you are making.
  - Include a note saying you are working on a pull request. This will help alleviate duplicate work.
  - If you are creating a PR for an existing issue, comment on the issue that you are working on it.
- Fork this repository.
- Node + NPM installed on your local machine matching the minimum version supported.

## Making Changes
- Make the code changes in your forked repository.
- Ensure the there are no ESLint errors in the code, following the `.eslintrc.yml` file in the repo.
- Write proper JSDoc for anything changed or added (if applicable).
- Write or update tests for the changes made. See more in [Tests](#tests) below.

## Commiting
All commits must use the [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0-beta.3/#specification). Githooks within this repo will prevent commit messages that are not properly formatted to this specification.

```
<type>(<scope>): <message>
```
_**Note:** Scope is not required and can be omitted._

The `type` you use will affect the automatic versioning.

## Pull Request
Create a pull request in this repo with your changes. Once a PR is created, Travis will automatically run the tests. **If the tests do not pass because of a change you made, it will not be merged until it is fixed.**

## Tests
If you are making changes to existing code:
- Update tests to reflect your changes (if applicable).
- Do not remove tests to make the suite pass.
- Run the tests locally to ensure they pass.

If you are adding new features:
- Add new tests to support the new feature.
- Run the tests locally to ensure they pass.

Code coverage is checked. I strive for 100% coverage (not including code branches), but 95% or greater is acceptable.

When contributing to this package, please follow the guidelines below:

## Automated Releases
This repo is setup to automatically release new versions of the module when a change constitutes it. In order to obtain this functionality, I've setup [Semantic Release](https://semantic-release.gitbook.io/semantic-release/). When any changes with the `type` as `feat` or `fix` in the commit message, it will trigger a version bump and release to NPM automatically. 

- `feat` will trigger a minor version bump from the last release unless `BREAKING CHANGE` exists in the commit message, which will trigger a major version bump.
- `fix` will trigger a patch version bump from the last release.

See the [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0-beta.3/#specification) for more information.

This automated process only runs when a change is made to `master` or a PR is merged into `master`. It runs as part of the Travis CI build. **Note:** Changes to the version in `package.json` will be overwritten.

In addition to releasing a new version of the package to NPM, the automated release process does the following:
- Builds the docs in the README using JSDoc from the code.
- Updates the CHANGELOG.md file.
- Pushes these changes to `master`.
