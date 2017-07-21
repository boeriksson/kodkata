import React from 'react';
/*
    This is a dummyComponent inserted during the build by the Webpack NormalModuleReplacementPlugin
    in places where a dynamic path points to a component that do not exist..
    Ex: Entercash deposit has a "BankElements" where the user can select bank, while trustly doesnt.
    In trustly that import will be replaced by this...
 */

const Dummy = () => null;

export default Dummy;
