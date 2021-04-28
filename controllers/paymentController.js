
const braintree = require("braintree");


const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "v2c22d9468dwtmsf",
  publicKey: "rsvmhv6k3zt2t57n",
  privateKey: "5e775111b6e1985ea50cea52f8f5339c"
});

exports.getToken = (req,res) => {
	gateway.clientToken.generate({}, (err, response) => {
		if(err) {
			res.status(500).send(err);
		} else {
			res.send(response);
		}
	});
}

exports.processPayment = (req,res) => {
	console.log(res)
	let nonceFromTheClient = req.body.paymentMethodNonce

	let amountFromTheClient = req.body.amountFromTheClient

	gateway.transaction.sale({
	  amount: amountFromTheClient,
	  paymentMethodNonce: nonceFromTheClient,
	  options: {
	    submitForSettlement: true
	  }
	}, (err, result) => {
		if(err) {
			res.status().json(err);
		} else {
			res.json(result);
		}
	});
}