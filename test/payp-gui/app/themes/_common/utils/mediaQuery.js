//----------------------------------------------------------------------------------------------------------------------
// Utility for setting different styling for different devices/media.
//----------------------------------------------------------------------------------------------------------------------

const getMinWidth = (theme, size) => {
    const mediaQueries = {
        small: `max-width: ${theme.layout.breakpoints.small}`,
        medium: `min-width: ${theme.layout.breakpoints.medium}`,
        large: `min-width: ${theme.layout.breakpoints.large}`,
        xlarge: `min-width: ${theme.layout.breakpoints.xlarge}`,
        xxlarge: `min-width: ${theme.layout.breakpoints.xxlarge}`,
        xxxlarge: `min-width: ${theme.layout.breakpoints.xxxlarge}`,
        pageMinWidthHelpcentre: `min-width: ${theme.layout.breakpoints.pageMinWidthHelpcentre}`,
        pageMinWidth: `min-width: ${theme.layout.breakpoints.pageMinWidth}`,
        pageMaxWidth: `max-width: ${theme.layout.breakpoints.pageMaxWidth}`,
        minWidthTablet: `min-width: ${theme.layout.breakpoints.minWidthTablet}`,
        minWidthDesktop: `min-width: ${theme.layout.breakpoints.minWidthDesktop}`,
        minWidthLargeScreen: `min-width: ${theme.layout.breakpoints.minWidthLargeScreen}`,
        maxWidthMobile: `max-width: ${theme.layout.breakpoints.maxWidthMobile}`,
        maxWidthTablet: `max-width: ${theme.layout.breakpoints.maxWidthTablet}`,
        unibetMediaWidth: `min-width: ${theme.layout.breakpoints.unibetMediaWidth}`
    };
    
    return mediaQueries[size] ? mediaQueries[size] : mediaQueries.unibetMediaWidth;
};

export default (theme, sizeName, content) => {
    if (!theme || !content) {
        return null;
    }
    
    const selectedQuery = getMinWidth(theme, sizeName);
    
    return `@media all and (${selectedQuery}) { ${content} }`;
};
