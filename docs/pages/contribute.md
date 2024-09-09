# Contribute

Thank you for investing your time in contributing to our project!

Read our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community approachable and respectable.

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and merging the PR.

## New contributor guide

To get an overview of the project, read the [README](../README.md) file. Here are some resources to help you get started with open source contributions:

- [Finding ways to contribute to open source on GitHub](https://docs.github.com/en/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github)
- [Set up Git](https://docs.github.com/en/get-started/quickstart/set-up-git)
- [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Collaborating with pull requests](https://docs.github.com/en/github/collaborating-with-pull-requests)

## Getting started

### Issues

#### Create a new issue

If you spot a problem with the docs, [search if an issue already exists](https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-issues-and-pull-requests#search-by-the-title-body-or-comments). If a related issue doesn't exist, you can open a new issue using a relevant [issue form](https://github.com/LunaCrew/accounts-core/issues).

#### Solve an issue

Scan through our [existing issues](https://github.com/LunaCrew/accounts-core/issues) to find one that interests you. You can narrow down the search using `labels` as filters. See "[Label reference](https://docs.github.com/en/contributing/collaborating-on-github-docs/label-reference)" for more information. As a general rule, we don’t assign issues to anyone. If you find an issue to work on, you are welcome to open a PR with a fix.

### Documentation

Improving the documentation is always appreciated. If you find something that's unclear or missing, feel free to open an issue or submit a pull request with your changes.

!!! tip
    You can find the documentation source files in the `docs` directory of the repository.

### Translations

We use the [typesafe-i18n](https://www.npmjs.com/package/typesafe-i18n) package to make translations easy. Theses translations are used in our emails.

#### Add a new language

!!! tip
    If you need help setting up the project check the [**Make changes**](#make-changes) section.

1. With the repository cloned and its dependencies installed, go to the `src/i18n` folder.
2. Create a copy of a language folder that your are comfortable to translate from and rename it to the language that you are going to translate to.

    !!! example
        Copy the `en-us` *(English from US)* folder as `it` *(Italian)*

3. In the folder you just created, go to the `index.ts` file and translate the values to the language.

    !!! example "File you copied from English US `en-us`"

        ```ts
        import type { BaseTranslation } from '../i18n-types'

        const en_us = {
            hi_name: 'Hi {name}!',
        } satisfies BaseTranslation

        export default en_us
        ```

    !!! example "How it should be for Italian `it`"

        ```ts
        import type { BaseTranslation } from '../i18n-types'

        const it = {
            hi_name: 'Ciao {name}!',
        } satisfies BaseTranslation

        export default it
        ```

    !!! tip
        If the language code has a country code with it, use an underscore to separate it.
        **Example**: `en-us` becomes `en_us`

#### Add translation to automated emails

This step is optional but recommended if you now **Typescript**.

1. Go to the file `src\util\enum\Language.ts` and add the new language.

    !!! example
        Don't forget to adjust the unit test for the new language as well.

        ```ts
        enum Language {
            EN_US = 'en-us',
            PT_BR = 'pt-br',
            ES = 'es',
            FR = 'fr',
            DE = 'de',
            RU = 'ru',
            IT = 'it', // add the code for Italian
        }

        export default Language
        ```

2. Go to `src\util\tasks\AutoDelete.ts`.
3. In the `autoDelete()` function, create a new list for the language you added.

    !!! example "Lets say you added Italian"

        ```ts
        // Find the lists that already exists

        const listOfEmailsInEnUS: string[] = []
        const listOfEmailsInPtBr: string[] = []
        const listOfEmailsInEs: string[] = []
        // ...

        // Add the new language
        const listOfEmailsInIt: string[] = []
        ```

4. Now add the new list to the `forEach` loop

    !!! example

        ```ts
        accounts.forEach((account) => {
            switch (account.settings.language) {
                case Language.PT_BR: {
                    listOfEmailsInPtBr.push(account.email)
                    break
                }
                case Language.ES: {
                    listOfEmailsInEs.push(account.email)
                    break
                }
                // Add a new case before the default one
                
                case Language.IT: {
                    listOfEmailsInIt.push(account.email)
                    break
                }

                default: {
                    listOfEmailsInEnUS.push(account.email)
                    break
                }
            }
        })
        ```

5. Add the new list to the email batch array

    !!! example

        ```ts
        const emailBatches: EmailInfo[] = [
            {
                receiversEmail: listOfEmailsInPtBr.toString(),
                language: Language.PT_BR,
            },
            {
                receiversEmail: listOfEmailsInEs.toString(),
                language: Language.ES,
            },
            // create a new object for the Italian list
            {
                receiversEmail: listOfEmailsInIt.toString(),
                language: Language.IT,
            },
        ]
        ```

### Make Changes

#### Make changes in the UI

Click **Make a contribution** at the bottom of any docs page to make small changes such as a typo, sentence fix, or a broken link. This takes you to the `.md` file where you can make your changes and [create a pull request](https://github.com/LunaCrew/accounts-core/pulls) for a review.

#### Make changes locally

1. Fork the repository.

    - Using GitHub Desktop:
    - [Getting started with GitHub Desktop](https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/getting-started-with-github-desktop) will guide you through setting up Desktop.
    - Once Desktop is set up, you can use it to [fork the repo](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/cloning-and-forking-repositories-from-github-desktop)!

    - Using the command line:
    - [Fork the repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository) so that you can make your changes without affecting the original project until you're ready to merge them.

2. Install or update to **Node.js**, at the version specified in `package.json`.

3. Create a working branch and start with your changes!

### Commit your update

Commit the changes once you are happy with them. Don't forget to use the "[Self review checklist](https://docs.github.com/en/contributing/collaborating-on-github-docs/self-review-checklist) to speed up the review process.

### Pull Request

When you're finished with the changes, create a pull request, also known as a PR.

- Fill the "Ready for review" template so that we can review your PR. This template helps reviewers understand your changes as well as the purpose of your pull request.
- Don't forget to [link PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if you are solving one.
- Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge.
Once you submit your PR, a Docs team member will review your proposal. We may ask questions or request additional information.
- We may ask for changes to be made before a PR can be merged, either using [suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request) or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.
- As you update your PR and apply changes, mark each conversation as [resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).
- If you run into any merge issues, checkout this [git tutorial](https://github.com/skills/resolve-merge-conflicts) to help you resolve merge conflicts and other issues.

### Your PR is merged

Congratulations 🎉🎉

The Luna crew thanks you!.

Once your PR is merged, your contributions will be publicly visible on the [Contributors page](https://github.com/LunaCrew/accounts-core/graphs/contributors).
