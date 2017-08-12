/**
 * @since 2017-04-11 19:09:25
 * @author vivaxy
 */

import Listr from 'listr';
import execa from 'execa';

const sleep = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};

let data;

const copyFiles = async() => {
    const {
        presets,
    } = data;

    const files = [
        'scripts',
        'src',
        '.babelrc',
        '.editorconfig',
        '.eslintrc',
        '.gitignore',
        '.npmignore',
        '.npmrc',
        'LICENSE',
        'yarn.lock',
    ];

    await sleep(1000);
    await presets.copyFiles(files);
};

const updatePackageJSON = async() => {
    const {
        project,
        presets,
    } = data;

    const projectGit = project.git || {};

    const filename = 'package.json';

    await sleep(1000);
    await presets.updateJson(filename, (json) => {
        const {
            version,
            description,
            main,
            scripts,
            repository,
            keywords,
            author,
            license,
            bugs,
            dependencies,
            devDependencies,
            peerDependencies,
        } = json;

        return {
            name: project.name,
            version: '0.0.0',
            gtScaffoldVersion: version,
            description,
            main,
            scripts,
            repository: {
                ...repository,
                url: projectGit.repositoryURL,
            },
            keywords,
            author,
            license,
            bugs: {
                ...bugs,
                url: undefined,
            },
            dependencies,
            devDependencies,
            peerDependencies,
        };
    });
};

const updateREADME = async() => {
    const {
        project,
        presets,
    } = data;

    const filename = 'README.md';

    await sleep(1000);
    await presets.updateFile(filename, (content) => {
        const projectData = content.split('----------\n\n')[1];
        return projectData.replace(/__________/, `${project.name}

Initialized by [vivaxy/gt-npm-package](https://github.com/vivaxy/gt-npm-package)`);
    });
};

const yarnInstall = async() => {
    await execa('yarn', ['install']);
};

export const init = async(options) => {
    data = options;

    return new Listr([
        {
            title: 'copy files',
            task: copyFiles,
        },
        {
            title: 'update package.json',
            task: updatePackageJSON,
        },
        {
            title: 'update README.md',
            task: updateREADME,
        },
        {
            title: 'run yarn install',
            task: yarnInstall,
        },
    ]);
};

export const after = async() => {
    console.log(`
    WHAM!
`);
};
