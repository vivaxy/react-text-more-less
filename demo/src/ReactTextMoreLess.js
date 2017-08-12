/**
 * @since 2017-04-11 19:10:08
 * @author vivaxy
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import shave from 'shave';

export default class ReactTextMoreLess extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        lessHeight: PropTypes.number.isRequired,
        collapsed: PropTypes.bool,
        className: PropTypes.string,
        showMoreText: PropTypes.string,
        showMoreElement: PropTypes.element,
        showLessElement: PropTypes.element,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        collapsed: true,
        className: undefined,
        showMoreText: '...',
        showMoreElement: undefined,
        showLessElement: undefined,
        onClick: () => {

        },
    };

    componentDidMount() {
        window.addEventListener('resize', this.setDOM);
        this.setDOM();
    }

    componentWillUpdate() {
        // 更新前把 DOM 重置回去，让 React 正常渲染
        this.resetDOM();
    }

    componentDidUpdate() {
        this.setDOM();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setDOM);
    }

    resetDOM() {
        this.root.innerHTML = this.props.text;
    }

    setDOM = () => {
        const { className, collapsed, showMoreText, lessHeight, showMoreElement, showLessElement } = this.props;
        if (collapsed) {
            shave(this.root, lessHeight, { classname: className, character: showMoreText });
            const shaveChar = this.root.querySelector('.js-shave-char');
            if (shaveChar && showMoreElement) {
                // 如果不需要 ellipse，则没有 `shaveChar`
                render(showMoreElement, shaveChar);
            }
        } else {
            const showLessTextClassName = 'js-show-less-text';
            if (this.root.offsetHeight > lessHeight && showLessElement && !this.root.querySelector('.' + showLessTextClassName)) {
                // 如果需要收起，则展示文字
                const collapse = document.createElement('span');
                collapse.setAttribute('class', showLessTextClassName);
                render(showLessElement, collapse);
                this.root.appendChild(collapse);
            }
        }
    };

    setRootRef = (root) => {
        this.root = root;
    };

    render() {
        const { className, text, onClick } = this.props;
        return <div ref={this.setRootRef} className={className} onClick={onClick}>{text}</div>;
    }

}
