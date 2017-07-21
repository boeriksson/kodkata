module.exports = (required, acceptedVersion, notificationVersion, editAccepted) => {
    if (typeof required !== 'boolean' ||
        typeof acceptedVersion !== 'number' ||
        (notificationVersion !== undefined && typeof notificationVersion !== 'number') ||
        typeof editAccepted !== 'boolean') {
        throw Error('Type error.');
    }

    return !required ||
        (required && acceptedVersion === notificationVersion) ||
        (required && editAccepted);
};
