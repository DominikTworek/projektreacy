import React, {Component} from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

export default class MyApp extends Component {
    render() {
        const onSuccess = (payment) => {
            console.log("The payment was succeeded!", payment);
        };

        const onCancel = (data) => {
            console.log('The payment was cancelled!', data);
        };

        const onError = (err) => {
            console.log("Error!", err);
        };

        let env = 'sandbox';
        let currency = 'PLN';
        let total = 0.01;

        const client = {
            sandbox:    'ARV0_RTSPOeR-6XyErK7XaI6Ta0G-8LPuju2TvSL24v8Y_SK2NXFlVsVnIfX_HzXxsNF1Q46nsPZmz5O',
            production: 'ENebwLeWmi7aR7PFuefplxSP7TRw0unLfd-RxH8Iv6BHaNq8yg8SfBZ5Bq1kzkUbS3y45marz47OUCC1',
        };
       return (
            <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
        );
    }
}