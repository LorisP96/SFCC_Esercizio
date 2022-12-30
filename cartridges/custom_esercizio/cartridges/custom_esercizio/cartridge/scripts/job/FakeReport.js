"use strict";

var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Logger = require('dw/system/Logger').getLogger('Emailblink', 'subscribe');

var EmailblinkService = require('~/cartridge/scripts/services/emailblink');

function execute() {

    var searchQuery = CustomObjectMgr.queryCustomObjects('Fake_Report', "email = *", null);

    while (searchQuery.hasNext()) {

        reportForm = searchQuery.next();
        // da vedere come passare gli altri parametri del custom obj
        var resp =  EmailblinkService.call(reportForm.custom.email);

        if (resp.statusCode == 200) {
            Logger.info('Subscribed email {0}', reportForm.custom.email);

            try {
              CustomObjectMgr.remove(customObj);
            } catch (e) {
              Logger.error('Error occured during delete email {0}', reportForm.custom.email);
            }

        } else {
           return PIPELET_ERROR;
        }

    }
    searchQuery.close();
    return PIPELET_NEXT;
}

module.exports = {
  execute: execute
};