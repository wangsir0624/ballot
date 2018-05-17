module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
    networks: {
        development: {
            host: "127.0.0.1",
            port: 9545,
            network_id: "*" // Match any network id
        },

        live: {
            host: "127.0.0.1",
            port: 8545,
            network_id: 1,
            gas: 5000,
            gasPrice: 10000000000
        }
    }
};
