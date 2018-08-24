import {css} from 'styled-components';

export const Container = {
    getDefaultStyle: (theme) => css`
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
    `
};
