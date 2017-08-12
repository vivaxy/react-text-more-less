/**
 * @since 2017-04-11 19:47:23
 * @author vivaxy
 */

import babel from '@vivaxy/babel-folder';

import { sourceFolder, buildFolder } from '../config';

export default async() => {
    babel(sourceFolder, buildFolder);
};
