
module.exports = {
    // Output folder for the build. Overide by defining environment variable 'BUILD_OUTPUT_PATH'.
    BUILD_OUTPUT_PATH: process.env.BUILD_OUTPUT_PATH || 'dist',
    BUILD_PUBLIC_PATH: process.env.BUILD_PROVIDER_PATH || '/ui/'
};