document.addEventListener("plusready", function () {
    var _BARCODE = 'plugintest',
        B = window.plus.bridge;
    var plugintest =
        {
            BluetoothPairing: function () {
                return B.execSync(_BARCODE, "BluetoothPairing", []);
            },
            ReturnBluetoothDevice: function (successCallback, errorCallback) {
                var success = typeof successCallback !== 'function' ? null : function (args) {
                    successCallback(args);
                },
                    fail = typeof errorCallback !== 'function' ? null : function (code) {
                        errorCallback(code);
                    };
                callbackID = B.callbackId(success, fail);

                return B.exec(_BARCODE, "ReturnBluetoothDevice", [callbackID]);
            },
            Test: function () {
                return B.execSync(_BARCODE, "Test", [callbackID]);
            },
            Print: function (shop_name, paymentQR, data) {
                return B.execSync(_BARCODE, "Print", [shop_name, paymentQR, data]);
            },
            SetBluetooth: function (address) {
                return B.execSync(_BARCODE, "SetBluetooth", [address]);
            },
            IsOk: function () {
                return B.execSync(_BARCODE, "IsOk", []);
            }
        };
    window.plus.plugintest = plugintest;
}, true);