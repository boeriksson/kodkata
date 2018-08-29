import {css} from 'styled-components'
import * as Tabs from '../../_common/skins/Tabs'
import mediaQuery from '../../_common/utils/mediaQuery'
import downArrow from '../icons/arrow-down.svg';

const setOrder = (tabs) => {
    return tabs.map((tab, ix) => {
        if (tab.selected === true) {
            return `
                li:nth-child(1) {
                    order: 1;
                }
            `
        }
        return `
            li:nth-child(${ix + 1}) {
                order: ${ix + 1};
            }
        `
    })
}

/* eslint-disable quotes */
export const Container = ({ expanded, tabs }) => {
    console.log('expanded: ', expanded)
    return css`${Tabs.Container.getDefaultStyle()}
        float: left;
        clear: both;
        width: 100%;
        display: inline-block;
        margin: 24px 0;
        
        > ul {
            background-color: #e8e8e8;
            font-size: 0;
            width: 100%;
            padding: 0;
            margin: 0;
            
            > li {
                display: inline-block;
                text-align: center;
                border: 0;
                margin: 0;
                
                > a {
                    display: inline-block;
                    text-transform: uppercase;
                    text-decoration: none;
                    font-size: 14px;
                    line-height: 66px;
                    height: 64px;
                    padding: 0 24px;
                    font-weight: 500;
                    margin: 0;
                    color: #777;
                }
                
                > a:hover {
                    background-color: #d8d8d8;
                }
            }
            
            li.selected > a {
                background: #0e5f31;
                color: #FFFFFF;
            }
        }
    
        ${mediaQuery('maxWidthLargePhone', `
            ${expanded ? `
                > ul {
                    display: flex;
                    flex-direction: column;
                    li {
                        display: block;
                        width: 100%;
                        text-align: left;
                    }
                    li:hover {
                        background-color: #d8d8d8;
                    }
                    li.selected {
                        background: #0e5f31;
                        color: #FFFFFF;
                    }
                    ${setOrder(tabs)}
                }
                 &:after {
                    content: '';
                    background-image: url(${downArrow});
                    background-repeat: no-repeat;
                    transform: rotate(180deg);
                    position: absolute;
                    top: 40px;
                    right: 30px;
                    width: 20px;
                    height: 30px;
                    color: #FFFFFF;
                    z-index: 99;
                }
            ` : `
                > ul {
                    border-bottom: 0;
                    overflow: hidden;
                    position: relative;
                    
                }
                &:after {
                    content: '';
                    background-image: url(${downArrow});
                    background-repeat: no-repeat;
                    position: absolute;
                    top: 60px;
                    right: 30px;
                    width: 20px;
                    height: 30px;
                    color: #FFFFFF;
                    z-index: 99;
                }
                li:not(.selected) {
                    display: none;
                }
                li.selected {
                    width: 100%;
                    text-align: left;
                    background: #0e5f31;
                    color: #FFFFFF;
                }
            `}
        `)}
    `
}
/* eslint-enable quotes */
