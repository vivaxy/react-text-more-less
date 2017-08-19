/**
 * @since 2017-04-11 19:10:08
 * @author vivaxy
 */

import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import PropTypes from 'prop-types';
import shave from 'shave';

const showLessTextClassName = 'js-show-less-text';
const jsShaveCharClassName = 'js-shave-char';
const resizeEventName = 'resize';

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
        rootProps: PropTypes.object,
    };

    static defaultProps = {
        collapsed: true,
        className: undefined,
        showMoreText: '...',
        showMoreElement: undefined,
        showLessElement: undefined,
        onClick: () => {
        },
        rootProps: {},
    };

    componentDidMount() {
        window.addEventListener(resizeEventName, this.setDOM);
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
        this.resetDOM();
        window.removeEventListener(resizeEventName, this.setDOM);
    }

    setRootRef = (root) => {
        this.root = root;
    };

    setDOM = () => {
        const { className, collapsed, showMoreText, lessHeight, showMoreElement, showLessElement } = this.props;
        if (collapsed) {
            shave(this.root, lessHeight, { classname: className, character: showMoreText });
            const shaveChar = this.root.querySelector(`.${jsShaveCharClassName}`);
            if (shaveChar && showMoreElement) {
                // 如果不需要 ellipse，则没有 `shaveChar`
                render(showMoreElement, shaveChar);
            }
        } else {
            const hasShowLess = !!this.root.querySelector(`.${showLessTextClassName}`);
            if (this.root.offsetHeight > lessHeight && showLessElement && !hasShowLess) {
                // 如果需要收起，则展示文字
                const collapse = document.createElement('span');
                collapse.setAttribute('class', showLessTextClassName);
                render(showLessElement, collapse);
                this.root.appendChild(collapse);
            }
        }
    };

    resetDOM() {
        // clean up everything
        const { collapsed, showMoreElement } = this.props;
        if (collapsed) {
            const shaveChar = this.root.querySelector(`.${jsShaveCharClassName}`);
            if (shaveChar && showMoreElement) {
                unmountComponentAtNode(shaveChar);
            }
            this.root.innerHTML = this.props.text;
        } else {
            const collapse = this.root.querySelector(`.${showLessTextClassName}`);
            if (collapse) {
                unmountComponentAtNode(collapse);
                this.root.removeChild(collapse);
            }
        }
    }

    render() {
        const { className, text, onClick, rootProps } = this.props;
        return (
            <div // eslint-disable-line jsx-a11y/no-static-element-interactions
                ref={this.setRootRef}
                className={className}
                onClick={onClick}
                {...rootProps}
            >{text}</div>
        );
    }

}
