//----------------------------------------------------------------------------------------------------------------------
// Utility for setting different styling for different devices/media.
//----------------------------------------------------------------------------------------------------------------------

const getWidthQuery = (size) => {
    const mediaQueries = {
        maxWidthTabsCollapse: 'max-width: 767px',
        minWidthTabsCollapse: 'min-width: 767px',
        maxWidthLargePhone: 'max-width: 424px',
        unibetMediaWidth: '566px'
    }
    
    return mediaQueries[size] ? mediaQueries[size] : mediaQueries.unibetMediaWidth
}

export default (sizeName, content) => {
    if (!content) {
        return null
    }
    
    const widthQuery = getWidthQuery(sizeName)
    
    return `@media all and (${widthQuery}) { ${content} }`
}

export const mediaOnly = (mediaType, sizeName, content) => {
    if (!mediaType || !content) {
        return null
    }

    const widthQuery = getWidthQuery(sizeName)

    return `@media only ${mediaType} and (${widthQuery}) { ${content} }`
}
