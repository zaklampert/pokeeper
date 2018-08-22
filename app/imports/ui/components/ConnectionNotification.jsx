import React from 'react';
import i18n from 'meteor/universe:i18n';
import Snackbar from 'material-ui/Snackbar';

const T = i18n.createComponent();


const ConnectionNotification = () => (
  <Snackbar
        open={true}
        message="Reconnecting..."
        autoHideDuration={4000}

      />
)

export default ConnectionNotification;
